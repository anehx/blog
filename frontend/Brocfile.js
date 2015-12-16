/* global require, module */

var compileSass  = require('broccoli-sass')
var concat       = require('broccoli-concat')
var funnel       = require('broccoli-funnel')
var mergeTrees   = require('broccoli-merge-trees')
var autoprefixer = require('broccoli-autoprefixer')

var appSass  = autoprefixer(compileSass(
  [ 'sass' ],
  'app.sass',
  'css/app.css'
))

var fa = funnel('bower_components/font-awesome/fonts', {
  destDir: 'fonts'
})

var ralewayBold = funnel('bower_components/raleway/fonts/bold', {
  destDir: 'fonts'
})

var ralewayLight = funnel('bower_components/raleway/fonts/light', {
  destDir: 'fonts'
})

var fonts = mergeTrees([ ralewayBold, ralewayLight, fa ])

var vendorCss = concat('bower_components', {
  inputFiles: [
    'font-awesome/css/font-awesome.css'
  ],
  outputFile: '/css/vendor.css'
})

var vendorJs = concat('bower_components', {
  inputFiles: [
    'jquery/dist/jquery.js'
  ],
  outputFile: '/js/vendor.js'
})

var configJs = funnel('config', { destDir: 'js' })

var libJs = concat('lib', {
  inputFiles: [
    'Router.js',
    'Store.js',
    'App.js'
  ],
  outputFile: '/js/lib.js'
})

var appJs = concat('app', {
  inputFiles: [
    'helpers/*.js',
    'validation/*.js',
    'components/**/*.js',
    '**/*.js'
  ],
  outputFile: '/js/app.js'
})

var assets = funnel('public')

module.exports = mergeTrees([ appSass, assets, vendorJs, libJs, configJs, appJs, fonts, vendorCss ])
