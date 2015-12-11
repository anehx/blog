var App = {
  router: new Router(),
  store:  Store,

  getUser: function() {
    var user = localStorage.getItem('user')

    if (user) {
      return JSON.parse(user)
    }
    else {
      return null
    }
  },

  setUser: function(user) {
    localStorage.setItem('user', JSON.stringify(user))
  },

  removeUser: function() {
    localStorage.removeItem('user')
  }
}
