'use strict'

const FIFO = require('fast-fifo')

module.exports = class TTLSet {
  constructor (ttl) {
    this._ttl = ttl
    this._list = new FIFO()
    this._index = new Set()
    this._timer = null
  }

  add (value) {
    this._index.add(value)
    this._list.push([Date.now(), value])
    if (this._timer === null) {
      this._timer = setTimeout(this._prune.bind(this), this._ttl).unref()
    }
  }

  clear () {
    this._list.clear()
    this._index.clear()
    clearTimeout(this._timer)
    this._timer = null
  }

  has (value) {
    return this._index.has(value)
  }

  get size () {
    return this._index.size
  }

  _prune () {
    while (true) {
      const val = this._list.peek()
      if (val === undefined) {
        this._timer = null
        return
      }
      if (val[0] > Date.now() - this._ttl) break
      const evicted = this._list.shift()
      this._index.delete(evicted[1])
    }
    this._timer = setTimeout(this._prune.bind(this), Date.now() - this._list.peek()[0]).unref()
  }
}
