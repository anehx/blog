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
    },
    error: function(jqXHR) {
      if (jqXHR.responseJSON) {
        Notify.error(jqXHR.responseJSON.detail)
      }
      else if (jqXHR.status === 404) {
        App.router.apiError('404: Route not found')
      }
      else {
        App.router.apiError(`${jqXHR.status}: Ajax call failed`)
      }
    }
  })

  var url = location.pathname + location.hash
  App.router.transitionTo(url.replace('/#', ''))

})
