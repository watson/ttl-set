'use strict'

const test = require('node:test')
const assert = require('node:assert/strict')
const { scheduler } = require('node:timers/promises')

const TTLSet = require('./')

test('replicate standard Set API', async (t) => {
  await t.test('set.add()/has()', (t) => {
    const set = new TTLSet(0)
    set.add('foo')
    assert.equal(set.has('foo'), true)
    assert.equal(set.has('bar'), false)
  })

  await t.test('set.clear()', (t) => {
    const set = new TTLSet(0)
    set.add('foo')
    assert.equal(set.has('foo'), true)
    set.clear()
    assert.equal(set.has('bar'), false)
  })

  await t.test('set.size', (t) => {
    const set = new TTLSet(0)
    assert.equal(set.size, 0)
    set.add('foo')
    assert.equal(set.size, 1)
    set.add('bar')
    assert.equal(set.size, 2)
    set.clear()
    assert.equal(set.size, 0)
  })
})

test('evict items after TTL', async (t) => {
  const set = new TTLSet(200)
  set.add('foo')
  assert.equal(set.size, 1)
  await scheduler.wait(100)
  set.add('bar')
  assert.equal(set.size, 2)
  await scheduler.wait(150)
  assert.equal(set.size, 1)
  assert.equal(set.has('foo'), false)
  assert.equal(set.has('bar'), true)
  await scheduler.wait(100)
  assert.equal(set.size, 0)
})
