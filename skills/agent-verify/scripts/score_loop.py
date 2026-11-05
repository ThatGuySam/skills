#!/usr/bin/env python3
"""Score a red-green-refactor improvement-loop ledger from recorded QA statuses.

This does arithmetic on criterion statuses that fresh QA already recorded. It does
not grade outputs, verify evidence files, or decide the final behavioral verdict.
"""
import json
import math
import statistics
import sys

DEFAULTS = {'critical_cap': 4, 'red_threshold': 6, 'trials_per_case': 3, 'plateau_gain': 1.0,
            'plateau_rounds': 2, 'max_rounds': 5, 'done_score': 9}
STATUSES = {'pass', 'fail', 'unknown'}


def require(condition, message):
    if not condition:
        raise ValueError(message)


def unique_object(pairs):
    result = {}
    for key, value in pairs:
        require(key not in result, f'duplicate JSON key: {key}')
        result[key] = value
    return result


def trial_score(results, criteria, cap):
    passed = sum(1 for c in criteria if results[c['id']] == 'pass')
    raw = round(passed / len(criteria) * 10, 1)
    critical_fail = [c['id'] for c in criteria if c['critical'] and results[c['id']] == 'fail']
    return (float(min(raw, cap)) if critical_fail else raw), raw, critical_fail


def score_version(version, criteria, policy):
    cases = {}
    for trial in version['trials']:
        score, raw, critical_fail = trial_score(trial['results'], criteria, policy['critical_cap'])
        row = cases.setdefault(trial['case'], {'split': trial['split'], 'trials': []})
        require(row['split'] == trial['split'], f"case {trial['case']} changes split in {version['id']}")
        row['trials'].append({'score': score, 'raw': raw, 'critical_fail': critical_fail,
                              'fails': [c['id'] for c in criteria if trial['results'][c['id']] != 'pass']})
    for row in cases.values():
        row['median'] = round(statistics.median(t['score'] for t in row['trials']), 1)
        row['raw_median'] = round(statistics.median(t['raw'] for t in row['trials']), 1)
        row['majority_fails'] = sorted({c for t in row['trials'] for c in t['fails']
                                        if sum(c in u['fails'] for u in row['trials']) >= len(row['trials']) // 2 + 1})
        majority = len(row['trials']) // 2 + 1
        row['critical_majority'] = sorted({c for t in row['trials'] for c in t['critical_fail']
                                           if sum(c in u['critical_fail'] for u in row['trials']) >= majority})
    return cases


def dev_mean(cases, key='median'):
    dev = [row[key] for row in cases.values() if row['split'] == 'dev']
    return round(sum(dev) / len(dev), 2) if dev else None


def red_proof(cases, policy):
    red = []
    for case, row in sorted(cases.items()):
        trials = row['trials']
        poor = [t for t in trials if t['score'] <= policy['red_threshold']]
        needed = math.ceil(len(trials) * 2 / 3)
        if len(trials) >= policy['trials_per_case'] and len(poor) >= needed:
            counts = {}
            for t in poor:
                for c in t['fails']:
                    counts[c] = counts.get(c, 0) + 1
            failing = sorted(c for c, n in counts.items() if n >= needed)
            red.append({'case': case, 'split': row['split'], 'poor_trials': len(poor), 'trials': len(trials),
                        'failing_criteria': failing})
    short = sorted(c for c, row in cases.items() if len(row['trials']) < policy['trials_per_case'])
    proven = any(r['failing_criteria'] and r['split'] == 'dev' for r in red)
    return {'proven': proven, 'red_cases': red, 'cases_with_too_few_trials': short}


def progress(candidate, parent):
    """Larger of the capped and uncapped dev-mean changes, so partial critical fixes still count."""
    return round(max(dev_mean(candidate) - dev_mean(parent),
                     dev_mean(candidate, 'raw_median') - dev_mean(parent, 'raw_median')), 2)


def compare(candidate, parent, kind):
    regressions, new_critical, broken = [], [], []
    for case, row in parent.items():
        if row['split'] != 'dev':
            continue
        require(case in candidate, f'candidate is missing dev case {case}')
        if candidate[case]['raw_median'] < row['raw_median']:
            regressions.append({'case': case, 'raw_from': row['raw_median'], 'raw_to': candidate[case]['raw_median']})
        lost = sorted(set(candidate[case]['majority_fails']) - set(row['majority_fails']))
        if lost:
            broken.append({'case': case, 'criteria': lost})
        added = sorted(set(candidate[case]['critical_majority']) - set(row['critical_majority']))
        if added:
            new_critical.append({'case': case, 'criteria': added})
    gain = progress(candidate, parent)
    improved = gain > 0 if kind == 'green' else gain >= 0
    return {'gain': gain, 'regressions': regressions, 'new_critical': new_critical, 'broken_criteria': broken,
            'kept': improved and not regressions and not new_critical and not broken}


def check(path):
    with open(path) as handle:
        data = json.load(handle, object_pairs_hook=unique_object)
    require(isinstance(data, dict) and data.get('version') == 1, 'ledger version must be 1')
    policy = {**DEFAULTS, **data.get('policy', {})}
    criteria = data.get('criteria')
    require(isinstance(criteria, list) and 1 <= len(criteria) <= 10, 'criteria must list 1 to 10 checks')
    ids = [c.get('id') for c in criteria]
    require(all(isinstance(i, str) and i for i in ids) and len(set(ids)) == len(ids), 'criteria ids must be unique strings')
    require(all(type(c.get('critical')) is bool for c in criteria), 'each criterion needs boolean critical')
    versions = data.get('versions')
    require(isinstance(versions, list) and versions, 'versions must be a nonempty list')
    require(versions[0].get('kind') == 'baseline' and versions[0].get('parent') is None, 'first version must be the baseline')
    unfixable = data.get('not_prompt_fixable', [])
    require(isinstance(unfixable, list) and all(c in ids for c in unfixable), 'not_prompt_fixable must list criterion ids')
    scored, report = {}, []
    for version in versions:
        vid = version.get('id')
        require(isinstance(vid, str) and vid and vid not in scored, f'invalid or duplicate version id: {vid}')
        require(version.get('kind') in {'baseline', 'green', 'refactor'}, f'{vid} kind must be baseline, green, or refactor')
        require(version['kind'] == 'baseline' or version.get('parent') in scored, f'{vid} parent must be an earlier version')
        require(version['kind'] != 'baseline' or vid == versions[0]['id'], 'only the first version can be the baseline')
        require(type(version.get('round')) is int and version['round'] >= 0, f'{vid} needs integer round')
        targets = version.get('targets', [])
        require(isinstance(targets, list) and all(t in ids for t in targets), f'{vid} targets must be criterion ids')
        require(version['kind'] != 'green' or targets, f'{vid} green version must name its target criteria')
        trials = version.get('trials')
        require(isinstance(trials, list) and trials, f'{vid} needs trials')
        for trial in trials:
            require(isinstance(trial.get('case'), str) and trial['case'], f'{vid} trial needs case')
            require(trial.get('split') in {'dev', 'holdout'}, f'{vid} trial split must be dev or holdout')
            results = trial.get('results')
            require(isinstance(results, dict) and set(results) == set(ids), f'{vid} trial must record every criterion')
            require(all(s in STATUSES for s in results.values()), f'{vid} trial has invalid status')
        scored[vid] = score_version(version, criteria, policy)
    base = versions[0]
    red = red_proof(scored[base['id']], policy)
    best, round_gains, rounds = base['id'], {}, sorted({v['round'] for v in versions[1:]})
    require(all(r >= 1 for r in rounds), 'only the baseline can use round 0')
    for version in versions[1:]:
        vid = version['id']
        outcome = compare(scored[vid], scored[version['parent']], version['kind'])
        outcome['parent_is_current_best'] = version['parent'] == best
        previous = best
        if outcome['kept'] and outcome['parent_is_current_best']:
            best = vid
        round_gains[version['round']] = round(round_gains.get(version['round'], 0) + progress(scored[best], scored[previous]), 2)
        report.append({'id': vid, 'round': version['round'], 'kind': version['kind'], 'parent': version['parent'],
                       'targets': version.get('targets', []), 'dev_mean': dev_mean(scored[vid]),
                       'raw_dev_mean': dev_mean(scored[vid], 'raw_median'), **outcome})
    best_cases = scored[best]
    done = all(r['median'] >= policy['done_score'] and not r['critical_majority']
               for r in best_cases.values() if r['split'] == 'dev')
    gains = [round_gains[r] for r in rounds]
    recent = gains[-policy['plateau_rounds']:]
    targeted = {t for v in versions[1:] for t in v.get('targets', [])}
    still_failing = sorted({c for r in best_cases.values() if r['split'] == 'dev' for c in r['majority_fails']})
    untargeted = [c for c in still_failing if c not in targeted and c not in unfixable]
    require(red['proven'] or not rounds, 'rounds recorded without a proven red baseline on a dev case')
    if not red['proven']:
        stop = 'no-headroom: red not proven on a dev case; do not refactor'
    elif done:
        stop = f"target: every dev case >= {policy['done_score']} with no critical failure"
    elif len(rounds) >= policy['max_rounds']:
        stop = f"cap: {policy['max_rounds']} rounds used"
    elif len(recent) == policy['plateau_rounds'] and all(g < policy['plateau_gain'] for g in recent) and not untargeted:
        stop = f"plateau: last {policy['plateau_rounds']} rounds each gained < {policy['plateau_gain']}"
    elif untargeted:
        stop = f"continue: target an untried failing criterion {untargeted}"
    else:
        stop = None
    holdout = {}
    for case, row in scored[base['id']].items():
        if row['split'] == 'holdout' and best != base['id'] and case in best_cases:
            holdout[case] = {'baseline': row['median'], 'best': best_cases[case]['median'],
                             'change': round(best_cases[case]['median'] - row['median'], 1)}
    return {'ledger_valid': True, 'policy': policy, 'red': red,
            'versions': {vid: {'dev_mean': dev_mean(c), 'raw_dev_mean': dev_mean(c, 'raw_median'),
                         'cases': {k: {'split': r['split'], 'median': r['median'], 'raw_median': r['raw_median'],
                         'trial_scores': [t['score'] for t in r['trials']], 'critical_majority': r['critical_majority']}
                         for k, r in sorted(c.items())}} for vid, c in scored.items()},
            'attempts': report, 'round_gains': {str(r): round_gains[r] for r in rounds}, 'current_best': best,
            'still_failing': still_failing, 'untargeted_failing': untargeted, 'not_prompt_fixable': unfixable,
            'stop': stop or 'continue: next green round', 'holdout_baseline_vs_best': holdout,
            'behavioral_verdict': 'not_determined_by_this_helper'}


def main():
    if len(sys.argv) != 2:
        print('Usage: python3 score_loop.py RUN/loop-ledger.json', file=sys.stderr)
        return 1
    try:
        result = check(sys.argv[1])
    except (ValueError, OSError, TypeError, KeyError, statistics.StatisticsError) as exc:
        print(json.dumps({'ledger_valid': False, 'error': str(exc), 'behavioral_verdict': 'not_determined_by_this_helper'}))
        return 1
    print(json.dumps(result, indent=2))
    return 0


if __name__ == '__main__':
    sys.exit(main())
