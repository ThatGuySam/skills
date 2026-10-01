"""Synthetic source only. Tests run with Python's standard library."""
import importlib.util
import json
import os
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[2]
SCRIPT = ROOT / 'skills/migrate-cgpt/scripts/backup.py'
EXAMPLE = ROOT / 'skills/migrate-cgpt/assets/backup-manifest.example.json'
sys.dont_write_bytecode = True
spec = importlib.util.spec_from_file_location('backup', SCRIPT)
backup = importlib.util.module_from_spec(spec)
spec.loader.exec_module(backup)


class BackupTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(dir="/tmp")
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.source = self.root / 'source'
        self.source.mkdir()
        self.raw = b'SYNTHETIC instructions\r\nPreserve UTF-8: \xc3\xa9\n'
        (self.source / 'instructions.md').write_bytes(self.raw)
        self.data = json.loads(EXAMPLE.read_text())
        self.manifest = self.root / 'capture.json'
        self.output = self.root / 'backup'
        self.write_manifest()

    def write_manifest(self):
        self.manifest.write_text(json.dumps(self.data))

    def create(self):
        return backup.create(self.manifest, self.source, self.output)

    def test_roundtrip_bytes_missing_and_permissions(self):
        self.create()
        result = backup.verify(self.output)
        self.assertEqual((self.output / 'files/instructions.md').read_bytes(), self.raw)
        self.assertEqual(result['source'], self.data['source'])
        self.assertEqual(result['artifacts'][1]['status'], 'missing')
        self.assertFalse((self.output / 'files/knowledge-not-provided').exists())
        if os.name == 'posix':
            self.assertEqual(self.output.stat().st_mode & 0o777, 0o700)
            self.assertEqual((self.output / 'files/instructions.md').stat().st_mode & 0o777, 0o600)

    def test_timestamp_requires_valid_date_and_timezone(self):
        for value in ['not-a-date', '2026-10-01', '2026-10-01T12:00:00',
                      '2026-02-30T12:00:00Z', '2026-10-01T25:00:00Z',
                      '2026-10-01T12:00:00+99:00', None]:
            with self.subTest(timestamp=value):
                self.data['source']['captured_at'] = value
                self.write_manifest()
                with self.assertRaisesRegex(ValueError, 'captured_at'):
                    self.create()
                self.assertFalse(self.output.exists())
        self.data['source']['captured_at'] = '2026-10-01T12:00:00.123+01:30'
        self.write_manifest()
        self.create()
        backup.verify(self.output)

    def test_refuse_existing_output(self):
        self.create()
        with self.assertRaisesRegex(ValueError, 'already exists'):
            self.create()
        backup.verify(self.output)

    def test_paths_reject_traversal_absolute_and_symlinks(self):
        for path in ['../instructions.md', '/instructions.md', 'a/../instructions.md', '.git/config', 'a\\b', 'C:/file']:
            with self.subTest(path=path), self.assertRaises(ValueError):
                backup.safe_path(path)
        (self.source / 'link').symlink_to(self.source, target_is_directory=True)
        self.data['artifacts'][0]['path'] = 'link/instructions.md'
        self.write_manifest()
        with self.assertRaisesRegex(ValueError, 'symlink'):
            self.create()
        self.assertFalse(self.output.exists())

    def test_missing_capture_fails_without_output(self):
        (self.source / 'instructions.md').unlink()
        with self.assertRaisesRegex(ValueError, 'missing'):
            self.create()
        self.assertFalse(self.output.exists())

    def test_refuse_git_checkout_output(self):
        (self.root / '.git').write_text('gitdir: synthetic-worktree')
        with self.assertRaisesRegex(ValueError, 'outside a Git'):
            self.create()
        self.assertFalse(self.output.exists())

    def test_requires_review_and_ownership(self):
        for field in ['secrets_reviewed', 'owner_confirmation']:
            original = json.loads(json.dumps(self.data))
            target = self.data if field == 'secrets_reviewed' else self.data['source']
            target[field] = False
            self.write_manifest()
            with self.assertRaises(ValueError):
                self.create()
            self.assertFalse(self.output.exists())
            self.data = original

    def test_reject_unaccounted_file(self):
        self.create()
        (self.output / 'unexpected').write_text('synthetic')
        with self.assertRaisesRegex(ValueError, 'unaccounted'):
            backup.verify(self.output)

    def test_corruption_fails_normal_and_optimized(self):
        self.create()
        (self.output / 'files/instructions.md').write_bytes(b'changed')
        for flags in [[], ['-O']]:
            result = subprocess.run([sys.executable, *flags, str(SCRIPT), 'verify', str(self.output)], capture_output=True, text=True)
            self.assertNotEqual(result.returncode, 0)
            self.assertIn('integrity mismatch', result.stderr)
            self.assertNotIn('PASS', result.stdout)

    def test_duplicate_keys_and_ids_rejected(self):
        self.manifest.write_text('{"schema_version":1,"schema_version":1}')
        with self.assertRaisesRegex(ValueError, 'duplicate JSON'):
            self.create()
        self.data['artifacts'][1]['id'] = 'instructions'
        self.write_manifest()
        with self.assertRaisesRegex(ValueError, 'unique'):
            self.create()


if __name__ == '__main__':
    unittest.main()
