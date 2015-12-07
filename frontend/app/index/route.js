App.router.route('', function() {
  App.store.getList('users', function(data) {
    var table = '<table>'

    data.data.forEach(function(user) {
      table += `<tr><td>${user.blogname} by ${user.username}`
    })

    App.router.setContent(table + '</table>')
  })
})
