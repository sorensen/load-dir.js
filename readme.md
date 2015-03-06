load-dir
========

Recursively iterate through a directory and apply an iterator to the filepath. 
Includes shortcut methods for requiring or file reading.

Install
-------

With [npm](https://npmjs.org)

```
npm install load-dir
```

Usage
-----

Node.js

```js
var loadDir = require('load-dir')

// Require all .js files
var lib = loadDir(__dirname + '/lib/', function(fpath) {
  if (!!~fpath.indexOf('.js')) return require(fpath)
  return false
})

// Run require on all files, will break if non js files
var lib = loadDir.require(__dirname + '/lib/')
 
 // Load all .jade files 
var templates = loadDir(__dirname + '/templates/', function(fpath) {
  if (!!~fpath.indexOf('.jade')) return fs.readFileSync(fpath, 'utf8')
  return false
})

// Load every file found
var templates = loadDir.fs(__dirname + '/templates/')
```