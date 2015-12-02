$(function() {
  'use strict'

  $('body').on('click', 'a.history-link', function(e) {
    e.preventDefault()
    App.router.transitionTo($(this).attr('href'), $(this).data())
  })

  $(window).on('popstate', function(e) {
    App.router.check()
  })

  $.ajaxSetup({
       beforeSend: function(xhr, settings) {
         //TODO add auth header
       },
       error: function() {
         App.router.apiError('AJAX call failed.')
       }
  })

  App.router.transitionTo(location.hash)

})
