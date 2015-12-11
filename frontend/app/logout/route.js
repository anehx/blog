App.router.route('/logout', function() {
  document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
  App.removeUser()

  this.transitionTo('/login')
})
