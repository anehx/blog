function Router() {
  this.routes = []
  this.view   = $('#view')
}

Router.prototype = {
  setContent: function(content, transitionDuration) {
    var duration = transitionDuration ? transitionDuration : 400
    this.view.fadeOut(duration, function() {
      this.view.html(content).fadeIn(duration)
    }.bind(this))
  },

  error: function() {
    this.setContent('<h1>404 Not Found</h1>')
  },

  apiError: function(err) {
    this.setContent('<h1>The backend returned an error:</h1>' + '<code>' + err + '</code>')
  },

  route: function(re, handler) {
    var prefix = '^' + (re.length > 1 && config.HASH ? '/#' : '')
    var suffix = '/?$'

    var regex = new RegExp(prefix + re + suffix)
    this.routes.push({ re: regex, handler: handler })

    return this
  },

  check: function() {
    var fragment = location.pathname + location.hash
    var matched  = false
    var router   = this

    this.routes.forEach(function(route) {
      var match = fragment.match(route.re)

      if (match) {
        matched = true
        match.shift()
        route.handler.apply(router, match)
      }
    })

    if (!matched) this.error()

    return this
  },

  transitionTo: function(path) {
    var url = (config.HASH && path.length > 1 && !/^\/#/.test(path)) ? `/#${path}` : path

    history.pushState({}, null, url)

    this.check()

    $('a.history-link').removeClass('active')
    $(`a.history-link[href="${path}"]`).addClass('active')

    return this
  }

}

function Route(router, regex, handler, isPublic) {
  this.router   = router
  this.regex    = regex
  this.handler  = handler
  this.isPublic = isPublic
}

Route.prototype.handle = function() {
  return
}

Route.prototype.enforceLogin = function() {
  if (!/token=(.*);?/.test(document.cookie)) {
    this.router.transitionTo('/login')
  }
}
