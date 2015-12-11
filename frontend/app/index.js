$(function() {
  'use strict'

  $(window).on('hashchange', function(e) {
    e.preventDefault()
    var url = location.pathname + location.hash

    App.router.transitionTo(url.replace('/#', ''))
  })

  $('body').on('click', 'a.history-link', function(e) {
    e.preventDefault()
    var href = $(this).attr('href')

    App.router.transitionTo(href)
  })

  $.ajaxSetup({
    beforeSend: function(xhr, settings) {
      var token = document.cookie.match(/(?:^|\s)token=([\w\d]+);?/)

      if (token) {
        xhr.setRequestHeader('Authorization', `Basic ${token[1]}`)
      }
    }
  })

  var url = location.pathname + location.hash
  App.router.transitionTo(url.replace('/#', ''))

})
