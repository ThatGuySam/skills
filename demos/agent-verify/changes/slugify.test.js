import assert from 'node:assert/strict'
import test from 'node:test'
import { slugify } from './slugify.js'

test('plain titles', () => {
  assert.equal(slugify('Hello World'), 'hello-world')
})

test('accents become ASCII', () => {
  assert.equal(slugify('Café Crème'), 'cafe-creme')
})

test('punctuation collapses to one dash', () => {
  assert.equal(slugify('Ready, set...  go!'), 'ready-set-go')
})
