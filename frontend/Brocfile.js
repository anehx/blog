/* global require, module */

var compileSass  = require('broccoli-sass')
var concat       = require('broccoli-concat')
var funnel       = require('broccoli-funnel')
var mergeTrees   = require('broccoli-merge-trees')
var autoprefixer = require('broccoli-autoprefixer')

var appSass  = autoprefixer(compileSass([ 'sass' ], 'app.sass', 'app.css'))

var vendorJs = concat('bower_components', {
  inputFiles: [
    'jquery/dist/jquery.js'
  ],
  outputFile: '/vendor.js'
})

var config = 'config'

var libJs = concat('lib', {
  inputFiles: [
    'Router.js',
    'Store.js',
    'App.js'
  ],
  outputFile: '/lib.js'
})

var appJs = concat('app', {
  inputFiles: [
    '**/*.js'
  ],
  outputFile: '/app.js'
})

var assets = funnel('public')

var js = concat(mergeTrees([ config, libJs, appJs ]), {
  inputFiles: [
    'environment.js',
    'lib.js',
    'app.js'
  ],
  outputFile: '/app.js'
})

module.exports = mergeTrees([ appSass, vendorJs, js, assets ])
