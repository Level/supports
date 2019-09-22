'use strict'

var test = require('tape')
var supports = require('..')
var shape = require('./shape')

test('no options', function (t) {
  shape(t, supports())
  t.end()
})

test('falsy options', function (t) {
  ;[null, false, undefined, 0, ''].forEach(function (value) {
    var manifest = supports({
      bufferKeys: value,
      additionalMethods: {
        foo: value
      }
    })

    shape(t, manifest)
    t.is(manifest.bufferKeys, false)
  })

  t.end()
})

test('truthy options', function (t) {
  ;[true, {}, 'yes', 1, []].forEach(function (value) {
    var manifest = supports({
      streams: value,
      additionalMethods: {
        foo: value
      }
    })

    shape(t, manifest)
    t.same(manifest.streams, value)
    t.same(manifest.additionalMethods.foo, value)
  })

  t.end()
})

test('merges input objects without mutating them', function (t) {
  var input1 = { bufferKeys: null, streams: false }
  var input2 = { streams: true }
  var manifest = supports(input1, input2)

  t.same(input1, { bufferKeys: null, streams: false })
  t.same(input2, { streams: true })
  t.is(manifest.bufferKeys, false)
  t.is(manifest.streams, true)
  shape(t, manifest)
  t.end()
})
