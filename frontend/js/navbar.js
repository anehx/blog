$(function() {
  'use strict'

  function toggleNav() {
    $('.nav-side').toggleClass('nav-side--expand')
    $('.page-wrapper').toggleClass('page-wrapper--darken')
  }

  $('.nav-side-toggler').on('click', toggleNav)
  $('.nav-side-list-item').on('click', toggleNav)
  $('.nav-side-brand').on('click', toggleNav)
})
