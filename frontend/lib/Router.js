/**
 * The router
 *
 * @public
 * @class
 */
function Router() {
  /**
   * The routes of this router
   *
   * @public
   * @property {object[]} routes
   */
  this.routes = []

  /**
   * The view element
   *
   * @public
   * @property {jQuery} view
   */
  this.view   = $('#view')
}

/**
 * The prototype of the router
 *
 * @public
 * @lends Router
 */
Router.prototype = {

  /**
   * Set the content of the page
   *
   * @public
   * @param {String} content the content
   * @param {Number} [transitionDuration] the duration of the fade
   * @return {void}
   */
  setContent: function(content, transitionDuration) {
    var duration = transitionDuration ? transitionDuration : 400
    this.view.fadeOut(duration, function() {
      this.view.html(content).fadeIn(duration)
    }.bind(this))
  },

  /**
   * Authorize the user
   *
   * @public
   * @param {Function} callback the callback
   * @return {void}
   */
  authorize: function(callback) {
    $.get(`${config.API_URL}/api/v1/login`, function(data) {
      App.setUser(data.data)
      callback()
    }).fail(function() {
      App.removeUser()
      App.router.transitionTo('/login')
    })
  },

  /**
   * Output an error page
   *
   * @public
   * @return {void}
   */
  error: function() {
    this.setContent(`
      <div class="page-error">
        <div>
          <h1>404</h1>
          <h2>Seite nicht gefunden</h2>
          <a href="/" class="history-link link-prefix">Zurück zur Startseite</a>
        </div>
      </div>
    `)
  },

  /**
   * Output a no permission page
   *
   * @public
   * @return {void}
   */
  noPermission: function() {
    this.setContent(`
      <div class="page-error">
        <div>
          <h1>403</h1>
          <h2>Fehlende Berechtigung</h2>
          <a href="/" class="history-link link-prefix">Zurück zur Startseite</a>
        </div>
      </div>
    `)
  },

  /**
   * Add a new route
   *
   * @public
   * @param {String} re the pattern
   * @param {Function} handler the handle callback
   * @param {Boolean} isProtected does this route need to be authorized?
   * @return {Router}
   */
  addRoute: function(re, handler, isProtected) {
    var prefix = '^' + (re.length > 1 && config.HASH ? '/#' : '')
    var suffix = '/?$'

    var regex = new RegExp(prefix + re + suffix)
    this.routes.push({ re: regex, handler: handler, isProtected: isProtected })

    return this
  },

  /**
   * Add a public route
   *
   * @public
   * @param {String} re the pattern
   * @param {Function} handler the handle callback
   * @return {Router}
   */
  route: function(re, handler) {
    return this.addRoute(re, handler, false)
  },

  /**
   * Add a protected route
   *
   * @public
   * @param {String} re the pattern
   * @param {Function} handler the handle callback
   * @return {Router}
   */
  protectedRoute: function(re, handler) {
    return this.addRoute(re, handler, true)
  },

  /**
   * Toggle all nav links according to the applications status
   *
   * @public
   * @return {void}
   */
  toggleNavLinks: function() {
    var user = App.getUser()

    if (user) {
      if (user.isAdmin) {
        $('nav a.history-link[href="/admin"]').parent().show()
      }

      if ($('#my-blog').length === 0) {
        $('ul.nav-side-list').prepend(
          `<li class="nav-side-list-item" id="my-blog"><a class="history-link" href="/${user.blog.id}"><i class="fa fa-rss"></i><span>Mein Blog</span></a></li>`
        )
      }

      $('#my-blog').show()
      $('nav a.history-link[href="/posts/new"]').parent().show()
      $('nav a.history-link[href="/logout"]').parent().show()

      $('nav a.history-link[href="/login"]').parent().hide()
    }
    else {
      $('#my-blog').hide()
      $('nav a.history-link[href="/posts/new"]').parent().hide()
      $('nav a.history-link[href="/admin"]').parent().hide()
      $('nav a.history-link[href="/logout"]').parent().hide()
      $('nav a.history-link[href="/login"]').parent().show()
    }
  },

  /**
   * Checks the current url to match a route
   *
   * @public
   * @return {Router}
   */
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

  /**
   * Transitions the application to a given URL
   *
   * @public
   * @param {String} path the path to transition to
   * @return {Router}
   */
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
