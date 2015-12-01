var Router = {
  routes: [],
  view: $('#view'),

  error: function() {
    this.setContent('<h1>404 Not Found</h1>')
  },

  apiError: function(err) {
    this.setContent('<h1>The backend returned an error:</h1>' + '<code>' + err + '</code>')
  },

  setContent(content, transitionDuration) {
    var duration = transitionDuration ? transitionDuration : 400
    this.view.fadeOut(duration, function() {
      this.view.html(content).fadeIn(duration)
    }.bind(this))
  },

  route: function(re, handler) {
    var regex = new RegExp((re.length > 1 ? '/#' : '') + re)
    this.routes.push({ re, handler })

    return this
  },

  check: function() {
    var fragment = location.hash
    var matched = false

    this.routes.forEach(function(route) {
      var match = fragment.match(route.re)

      if (match) {
        matched = true
        match.shift()
        route.handler.apply({}, match)
      }
    })

    if (!matched) this.error()

    return this
  },

  transitionTo: function(path, options) {
    var o = options ? options : { title: null, active: null }

    history.pushState(o, o.title, path)

    $('a.history-link').removeClass('active')

    if (o.active) {
      $('a.history-link[data-title="' + o.active + '"]').addClass('active')
    }
    else {
      $('a.history-link[href="/' + location.hash + '"]').addClass('active')
    }

    this.check()

    return this
  }
}


$(function() {
  'use strict'

  $('body').on('click', 'a.history-link', function(e) {
    e.preventDefault()
    Router.transitionTo($(this).attr('href'), $(this).data())
  })

  $(window).on('popstate', function(e) {
    Router.check()
  })

  Router.transitionTo(location.hash)
})
