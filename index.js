'use strict';

var fs = require('fs')
  , path = require('path')
  , debug = require('debug')('load-dir')

// Recursively walk through the given `directory`, applying 
// each filepath found against the given `iterator`
module.exports = function(dir, iterator) {
  var obj = {}
  if (!dir) throw new Error('Missing dir')
  if (!iterator) throw new Error('Missing iterator')

  if (!fs.existsSync(dir)) {
    debug('invalid dir: `%s`', dir)
    return null
  }

  debug('walking dir: `%s`', dir)

  fs.readdirSync(dir).forEach(function(file) {
    var fpath = path.join(dir, file)
      , ext = path.extname(file)
      , name = path.basename(file, ext)

    // Check for sub-directories
    if (fs.lstatSync(fpath).isDirectory()) {
      return obj[file] = module.exports(fpath, iterator)
    }
    
    // Never load `index` 
    if (name === 'index') return

    // Run iterator on filepath, allow opt-out, skip empty modules
    var mod = iterator(fpath)
    if (mod) obj[name] = mod
  })
  return obj
}

// Shortcut to recursively `require` a directory
module.exports.require = function(dir) {
  return module.exports(dir, require)
}

// Shortcut to recursively load a directory file contents
module.exports.fs = function(dir) {
  return module.exports(dir, function(fpath) {
    return fs.readFileSync(fpath, 'utf8')
  })
}
