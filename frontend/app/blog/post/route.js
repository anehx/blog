App.router.route('/posts/(\d+)', function() {
  App.store.get('posts', arguments[0], function(data) {
    console.log(data)
  })
})
