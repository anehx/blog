$(function() {
  'use strict'

  $('body').on('click', 'a.history-link', function(e) {
    e.preventDefault()
    var href = $(this).attr('href')

    App.router.transitionTo((config.HASH && href.length > 1 ? '/#' : '') + href)
  })

  $(window).on('popstate', function(e) {
    App.router.check()
  })

  $.ajaxSetup({
    error: function() {
      App.router.apiError('AJAX call failed.')
    }
  })

  App.router.transitionTo(location.hash)

})
