var App = {
  router: new Router(),
  store:  Store,

  getUser: function() {
    return JSON.parse(localStorage.getItem('user'))
  },

  setUser: function(user) {
    localStorage.setItem('user', JSON.stringify(user))
  },

  removeUser: function() {
    localStorage.removeItem('user')
  }
}
