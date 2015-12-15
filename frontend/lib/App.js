/**
 * The main application object
 *
 */
var App = {
  /**
   * The main router
   *
   * @property {Router} router The Router
   */
  router: new Router(),

  /**
   * The main router
   *
   * @property {Router} router The Router
   */
  store: new Store(),

  /**
   * Returns the current user
   *
   * @public
   * @return {object|null} The current user
   */
  getUser: function() {
    var user = localStorage.getItem('user')

    if (user) {
      return JSON.parse(user)
    }
    else {
      return null
    }
  },

  /**
   * Sets the current user
   *
   * @public
   * @param {object} user The user to set
   * @return {void}
   */
  setUser: function(user) {
    localStorage.setItem('user', JSON.stringify(user))
  },

  /**
   * Removes the current user
   *
   * @public
   * @return {void}
   */
  removeUser: function() {
    localStorage.removeItem('user')
  }
}
