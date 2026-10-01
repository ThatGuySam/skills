#!/usr/bin/env python3
"""Copy an explicitly reviewed GPT capture to a new private folder; never upload it."""
import argparse
from datetime import datetime
import hashlib
import json
import os
from pathlib import Path, PurePosixPath
import re
import shutil
import sys

SOURCE_FIELDS = {
    'name', 'description', 'url', 'captured_at', 'capture_method', 'version',
    'owner_confirmation', 'owner', 'model', 'capabilities', 'sharing',
    'conversation_starters', 'context_notes',
}
KINDS = {'instructions', 'knowledge', 'action_schema', 'example', 'configuration', 'image'}
STATUSES = {'captured', 'missing', 'excluded', 'not_applicable'}


def require(condition, message):
    if not condition:
        raise ValueError(message)


def safe_path(value):
    require(isinstance(value, str) and value, 'artifact path must be nonempty')
    path = PurePosixPath(value)
    require(not path.is_absolute() and '\\' not in value and ':' not in value,
            'artifact paths must be relative POSIX paths')
    require(all(p not in {'', '.', '..', '.git'} for p in value.split('/')),
            'artifact path contains unsafe component')
    return path


def checked_file(root, value):
    path = safe_path(value)
    current = root
    for part in path.parts:
        current = current / part
        require(not current.is_symlink(), 'symlink artifact or parent is not allowed')
    require(current.is_file(), f'captured artifact is missing: {value}')
    require(current.resolve().is_relative_to(root.resolve()), 'artifact escapes root')
    return current


def validate(data, sealed=False):
    require(isinstance(data, dict), 'manifest must be an object')
    require(set(data) == {'schema_version', 'secrets_reviewed', 'source', 'artifacts'},
            'unexpected or missing manifest field')
    require(type(data['schema_version']) is int and data['schema_version'] == 1,
            'unsupported schema_version')
    require(data['secrets_reviewed'] is True, 'review and remove credentials before backup')
    source = data['source']
    require(isinstance(source, dict) and set(source) == SOURCE_FIELDS,
            'source must contain every documented field, with null for unknown values')
    require(source['owner_confirmation'] is True, 'creator/owner authorization must be confirmed')
    for key in SOURCE_FIELDS - {'owner_confirmation', 'capabilities', 'conversation_starters'}:
        require(source[key] is None or isinstance(source[key], str), f'source.{key} must be text or null')
    require(isinstance(source['name'], str) and source['name'].strip(), 'source.name is required')
    timestamp = source['captured_at']
    require(isinstance(timestamp, str) and re.fullmatch(
        r'\d{4}-\d{2}-\d{2}[Tt]\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:[Zz]|[+-]\d{2}:\d{2})', timestamp),
        'source.captured_at must be a timezone-bearing RFC3339 timestamp')
    try:
        datetime.fromisoformat(timestamp.upper().replace('Z', '+00:00'))
    except ValueError as error:
        raise ValueError('source.captured_at has an invalid date, time, or offset') from error
    caps = source['capabilities']
    require(caps is None or (isinstance(caps, dict) and all(
        isinstance(k, str) and (v is None or type(v) is bool) for k, v in caps.items())),
        'capabilities must be a boolean/null map or null')
    starters = source['conversation_starters']
    require(starters is None or (isinstance(starters, list) and all(isinstance(x, str) for x in starters)),
            'conversation_starters must be a text array or null')
    artifacts = data['artifacts']
    require(isinstance(artifacts, list) and artifacts, 'artifacts must be a nonempty array')
    ids, paths = set(), set()
    for item in artifacts:
        require(isinstance(item, dict), 'artifact must be an object')
        keys = {'id', 'kind', 'status', 'path', 'note'}
        require(keys <= set(item) <= keys | {'sha256', 'size_bytes'}, 'unexpected or missing artifact field')
        require(isinstance(item['id'], str) and item['id'] and item['id'] not in ids, 'artifact IDs must be unique')
        ids.add(item['id'])
        require(item['kind'] in KINDS and item['status'] in STATUSES, 'invalid artifact kind/status')
        require(isinstance(item['note'], str), 'artifact note must be text')
        if item['status'] == 'captured':
            safe_path(item['path'])
            require(item['path'] not in paths, 'artifact paths must be unique')
            paths.add(item['path'])
            if sealed:
                digest = item.get('sha256')
                require(isinstance(digest, str) and len(digest) == 64 and all(c in '0123456789abcdef' for c in digest), 'invalid sha256')
                require(type(item.get('size_bytes')) is int and item['size_bytes'] >= 0, 'invalid size_bytes')
            else:
                require(not {'sha256', 'size_bytes'} & set(item), 'capture input must not contain computed integrity fields')
        else:
            require(item['path'] is None and not {'sha256', 'size_bytes'} & set(item), 'unavailable artifacts must not claim files or hashes')
            require(bool(item['note'].strip()), 'unavailable artifacts need a reason')
    require(any(a['kind'] == 'instructions' for a in artifacts), 'inventory must account for instructions')


def fingerprint(path):
    digest = hashlib.sha256()
    size = 0
    with path.open('rb') as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b''):
            digest.update(chunk)
            size += len(chunk)
    return digest.hexdigest(), size


def read_manifest(path):
    def unique_pairs(pairs):
        result = {}
        for key, value in pairs:
            require(key not in result, f'duplicate JSON key: {key}')
            result[key] = value
        return result
    return json.loads(path.read_text(encoding='utf-8'), object_pairs_hook=unique_pairs)


def verify(root):
    require(not root.is_symlink(), 'backup directory must not be a symlink')
    data = read_manifest(checked_file(root, 'backup-manifest.json'))
    validate(data, sealed=True)
    expected = {'backup-manifest.json'}
    for item in data['artifacts']:
        if item['status'] == 'captured':
            path = checked_file(root, item['path'])
            require(fingerprint(path) == (item['sha256'], item['size_bytes']), f'integrity mismatch: {item["id"]}')
            expected.add(item['path'])
    actual = set()
    for path in root.rglob('*'):
        require(not path.is_symlink(), 'backup contains symlink')
        if path.is_file():
            actual.add(path.relative_to(root).as_posix())
    require(actual == expected, 'backup has unexpected or unaccounted files')
    return data


def create(manifest, source, output):
    require(not manifest.is_symlink() and not source.is_symlink(), 'source/manifest symlinks are not allowed')
    data = read_manifest(manifest)
    validate(data)
    source = source.resolve(strict=True)
    require(source.is_dir(), 'source must be a directory')
    output = output.absolute()
    require(output.parent.is_dir(), 'output parent must already exist')
    # A default backup must never land in a working tree, including a Git worktree.
    for parent in [output.parent, *output.parent.parents]:
        require(not parent.is_symlink(), 'output ancestor must not be a symlink')
        marker = parent / '.git'
        require(not (marker.is_file() or (marker / 'HEAD').is_file()),
                'choose a private output outside a Git checkout')
    require(not output.exists() and not output.is_symlink(), 'output already exists; choose a new snapshot directory')
    files = [(item, checked_file(source, item['path'])) for item in data['artifacts'] if item['status'] == 'captured']
    output.mkdir(mode=0o700)
    try:
        for item, original in files:
            target = output / 'files' / item['path']
            target.parent.mkdir(mode=0o700, parents=True, exist_ok=True)
            with original.open('rb') as incoming, target.open('xb') as outgoing:
                os.chmod(target, 0o600)
                shutil.copyfileobj(incoming, outgoing)
            item['path'] = target.relative_to(output).as_posix()
            item['sha256'], item['size_bytes'] = fingerprint(target)
            require(fingerprint(original) == (item['sha256'], item['size_bytes']), 'source changed while copying')
        destination = output / 'backup-manifest.json'
        with destination.open('x', encoding='utf-8') as stream:
            os.chmod(destination, 0o600)
            json.dump(data, stream, indent=2, ensure_ascii=False)
            stream.write('\n')
        verify(output)
    except BaseException:
        shutil.rmtree(output)
        raise
    return data


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    sub = parser.add_subparsers(dest='command', required=True)
    capture = sub.add_parser('create')
    capture.add_argument('manifest', type=Path)
    capture.add_argument('source', type=Path)
    capture.add_argument('output', type=Path)
    check = sub.add_parser('verify')
    check.add_argument('backup', type=Path)
    args = parser.parse_args()
    try:
        data = create(args.manifest, args.source, args.output) if args.command == 'create' else verify(args.backup)
    except (OSError, ValueError, TypeError) as error:
        parser.exit(1, f'ERROR: {error}\n')
    missing = sum(item['status'] == 'missing' for item in data['artifacts'])
    print(f'PASS: captured bytes verified; {missing} missing artifact(s). Completeness and secret review are human checks.')


if __name__ == '__main__':
    main()
