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

var appJs = concat('js', {
  inputFiles: [
    '**/*.js'
  ],
  outputFile: '/app.js'
})

var assets = funnel('assets')

var fixtures = funnel('fixtures')

module.exports = mergeTrees([ appSass, vendorJs, appJs, assets, fixtures ])
