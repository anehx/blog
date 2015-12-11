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

  authorize: function(callback) {
    $.get(`${config.API_URL}/api/v1/login`, function(data) {
      App.setUser(data.data)
      callback()
    }).fail(function() {
      App.removeUser()
      App.router.transitionTo('/login')
    })
  },

  error: function() {
    this.setContent(`
      <div class="page-error">
        <div>
          <h1>404</h1>
          <h2>Seite nicht gefunden!</h2>
          <a href="/" class="history-link">Zurück zur Startseite</a>
        </div>
      </div>
    `)
  },

  noPermission: function() {
    this.setContent(`
      <div class="page-error">
        <div>
          <h1>403</h1>
          <h2>Fehlende Berechtigung!</h2>
          <a href="/" class="history-link">Zurück zur Startseite</a>
        </div>
      </div>
    `)
  },

  apiError: function(err) {
    this.setContent('<h1>The backend returned an error:</h1>' + '<code>' + err + '</code>')
  },

  addRoute: function(re, handler, isProtected) {
    var prefix = '^' + (re.length > 1 && config.HASH ? '/#' : '')
    var suffix = '/?$'

    var regex = new RegExp(prefix + re + suffix)
    this.routes.push({ re: regex, handler: handler, isProtected: isProtected })

    return this
  },

  toggleNavLinks: function() {
    var user = App.getUser()

    if (user) {
      if (user.isAdmin) {
        $('nav a.history-link[href="/admin/"]').parent().show()
      }

      if ($('#my-blog').length === 0) {
        $('ul.nav-side-list').prepend(
          `<li class="nav-side-list-item" id="my-blog"><a class="history-link" href="/${user.blog.id}/"><i class="fa fa-rss"></i> Mein Blog</a></li>`
        )
      }

      $('nav a.history-link[href="/posts/new/"]').parent().show()
      $('nav a.history-link[href="/logout/"]').parent().show()

      $('nav a.history-link[href="/login/"]').parent().hide()
    }
    else {
      $('#my-blog').hide()
      $('nav a.history-link[href="/posts/new/"]').parent().hide()
      $('nav a.history-link[href="/admin/"]').parent().hide()
      $('nav a.history-link[href="/logout/"]').parent().hide()
      $('nav a.history-link[href="/login/"]').parent().show()
    }
  },

  route: function(re, handler) {
    return this.addRoute(re, handler, false)
  },

  protectedRoute: function(re, handler) {
    return this.addRoute(re, handler, true)
  },

  check: function() {
    var fragment = location.pathname + location.hash
    var matched  = false
    var router   = this

    this.routes.forEach(function(route) {
      var match = fragment.match(route.re)
      this.toggleNavLinks()

      if (match) {
        matched = true
        match.shift()
        if (route.isProtected) {
          this.authorize(function() {
            route.handler.apply(router, match)
          })
        }
        else {
          route.handler.apply(router, match)
        }
      }
    }.bind(this))

    if (!matched) this.error()

    return this
  },

  transitionTo: function(path) {
    var url = (config.HASH && path.length > 1 && !/^\/#/.test(path)) ? `/#${path}` : path
    this.view.unbind()

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
