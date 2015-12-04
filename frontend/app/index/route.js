App.router.route('', function() {
  App.store.getList('blogs', function(data) {
    data.data.forEach(function(blog) {
      var username = blog.user.username
      var name     = blog.name
    })
  })
})
