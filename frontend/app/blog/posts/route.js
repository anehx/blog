App.router.route('/blog/(\\w+)', function() {
  this.setContent('<h1>Welcome to ' + arguments[0] + '\'s blog!</h1>')

  App.store.query('posts', { username: arguments[0] }, function(data) {
    alert()
  })
})
