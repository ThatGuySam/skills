import assert from 'node:assert/strict'
import test from 'node:test'
import { slugify } from './slugify.js'

test('plain titles', () => {
  assert.equal(slugify('Hello World'), 'hello-world')
})
