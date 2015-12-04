App.router.route('/blog/(\w+)', function() {
  App.store.query('posts', { blogname: arguments[0] }, function(data) {
  })
})
