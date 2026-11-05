#!/usr/bin/env python3
"""Check evidence-file integrity and paired accounting, not behavioral quality."""
import hashlib
import json
import sys
from collections import Counter
from pathlib import Path


def require(condition, message):
    if not condition:
        raise ValueError(message)


def text(value, label):
    require(isinstance(value, str) and bool(value.strip()), f'{label} must be a nonempty string')
    return value


def indexed(rows, label):
    require(isinstance(rows, list) and bool(rows), f'{label} must be a nonempty list')
    result = {}
    for row in rows:
        require(isinstance(row, dict), f'{label} entries must be objects')
        key = text(row.get('id'), f'{label}.id')
        require(key not in result, f'duplicate {label} id: {key}')
        result[key] = row
    return result


def unique_object(pairs):
    result = {}
    for key, value in pairs:
        require(key not in result, f'duplicate JSON key: {key}')
        result[key] = value
    return result


def check(path):
    path = Path(path).resolve()
    data = json.loads(path.read_text(), object_pairs_hook=unique_object)
    require(isinstance(data, dict), 'receipt must be an object')
    require(type(data.get('version')) is int and data['version'] == 1, 'version must be 1')
    require(data.get('mode') in {'verify', 'compare', 'progressive'}, 'invalid mode')
    criteria = indexed(data.get('criteria'), 'criteria')
    for key, row in criteria.items():
        require(type(row.get('critical')) is bool, f'criterion {key} needs boolean critical')
    artifacts = indexed(data.get('artifacts'), 'artifacts')
    for key, row in artifacts.items():
        rel = Path(text(row.get('path'), f'artifact {key} path'))
        target = (path.parent / rel).resolve()
        require(not rel.is_absolute() and target.is_relative_to(path.parent), f'artifact {key} escapes run directory')
        require(target.is_file(), f'artifact {key} is missing')
        expected = text(row.get('sha256'), f'artifact {key} sha256')
        require(hashlib.sha256(target.read_bytes()).hexdigest() == expected, f'artifact {key} hash mismatch')
    trials = indexed(data.get('trials'), 'trials')
    nonpassing = []
    groups = {}
    for key, row in trials.items():
        for field in ('case', 'variant', 'input_id', 'config_id'):
            text(row.get(field), f'trial {key} {field}')
        ids = row.get('artifact_ids')
        require(isinstance(ids, list) and bool(ids), f'trial {key} needs artifact_ids')
        require(all(isinstance(i, str) and i in artifacts for i in ids), f'trial {key} unknown artifact')
        results = row.get('results')
        require(isinstance(results, list), f'trial {key} needs results')
        seen = set()
        for item in results:
            require(isinstance(item, dict), f'trial {key} result must be object')
            criterion = text(item.get('criterion'), f'trial {key} result criterion')
            require(criterion in criteria and criterion not in seen, f'trial {key} unknown or duplicate criterion')
            seen.add(criterion)
            status = item.get('status')
            require(status in {'pass', 'fail', 'unknown'}, f'trial {key} invalid status')
            evidence = item.get('evidence_ids')
            require(isinstance(evidence, list), f'trial {key} needs evidence_ids')
            require(all(isinstance(i, str) and i in artifacts for i in evidence), f'trial {key} unknown evidence')
            require(status == 'unknown' or bool(evidence), f'trial {key} {status} lacks evidence')
            if status != 'pass':
                nonpassing.append({'trial': key, 'criterion': criterion, 'status': status, 'critical': criteria[criterion]['critical']})
        require(seen == set(criteria), f'trial {key} missing criteria')
        groups.setdefault(row['case'], []).append(row)
    if data['mode'] == 'compare':
        variants = data.get('pair_variants')
        require(isinstance(variants, list) and len(variants) == 2, 'compare needs two pair_variants')
        for variant in variants:
            text(variant, 'pair variant')
        require(len(set(variants)) == 2, 'pair_variants must differ')
        for case, rows in groups.items():
            counts = Counter(row['variant'] for row in rows)
            require(set(counts) == set(variants) and len(set(counts.values())) == 1, f'case {case} is not equally paired')
            require(len({row['input_id'] for row in rows}) == 1, f'case {case} input mismatch')
            require(len({row['config_id'] for row in rows}) == 1, f'case {case} configuration mismatch')
    return {'receipt_valid': True, 'trials': len(trials), 'artifacts': len(artifacts), 'nonpassing_checks': nonpassing,
            'critical_nonpassing': [item for item in nonpassing if item['critical']],
            'behavioral_verdict': 'not_determined_by_this_checker'}


def main():
    if len(sys.argv) != 2:
        print('Usage: python3 check_receipt.py RUN/receipt.json', file=sys.stderr)
        return 1
    try:
        result = check(sys.argv[1])
    except (ValueError, OSError, TypeError, KeyError) as exc:
        print(json.dumps({'receipt_valid': False, 'error': str(exc), 'behavioral_verdict': 'not_determined_by_this_checker'}))
        return 1
    print(json.dumps(result, indent=2))
    return 0


if __name__ == '__main__':
    sys.exit(main())
