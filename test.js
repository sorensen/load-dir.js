'use strict';

var assert = require('assert')
  , ade = assert.deepEqual
  , path = require('path')
 
describe('load-dir', function() {
  var loadDir = require('./index')
    , dir = path.join(__dirname, '/test/')

  it('default', function() {
    var count = 0

    var loaded = loadDir(dir, function(fpath) {
      count++
      return fpath
    })

    ade(loaded, { 
      js: { 
        a: dir + 'js/a.js',
        b: dir + 'js/b.js',
        c: dir + 'js/c.js' 
      },
      txt: { 
        d: dir + 'txt/d.txt',
        e: dir + 'txt/e.txt',
        f: dir + 'txt/f.txt' 
      }
   })
  })

  it('require', function() {
    var jsDir = path.join(dir, '/js/')
    var loaded = loadDir.require(jsDir)

    ade(loaded, {
      a: 'a'
    , b: 'b'
    , c: 'c'
    })
  })

  it('fs', function() {
    var txtDir = path.join(dir, '/txt/')
    var loaded = loadDir.fs(txtDir)

    ade(loaded, {
      d: 'd'
    , e: 'e'
    , f: 'f'
    })
  })
})
