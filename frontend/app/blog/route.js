App.router.route('/blog/(\\d+)', function() {
  App.store.query('posts', { blogID: arguments[0] }, function(data) {})
})
