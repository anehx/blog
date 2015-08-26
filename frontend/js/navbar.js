$(function() {
  'use strict'

  function toggleNav() {
    $('.nav-side').toggleClass('nav-side--expand')
    $('.page-wrapper').toggleClass('page-wrapper--darken')
  }

  $('body').on('click', '.nav-side-toggler',                   toggleNav)
  $('body').on('click', '.nav-side-list-item',                 toggleNav)
  $('body').on('click', '.nav-side-brand a',                   toggleNav)
  $('body').on('click', '.page-wrapper--darken .page-content', toggleNav)
})
