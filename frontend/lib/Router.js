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
    var prefix = '^' + (re.length > 1 && config.hash ? '#' : '')
    var suffix = '/?$'

    var regex = new RegExp(prefix + re + suffix)
    this.routes.push({ re: regex, handler: handler })

    return this
  },

  check: function() {
    var fragment = location.hash
    var matched = false
    var router = this

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

