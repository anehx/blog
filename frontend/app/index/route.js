App.router.route('', function() {
  App.store.getList('blogs', function(data) {
    var table = '<table>'

    data.data.forEach(function(blog) {
      table += `<tr><td>${blog.name}`
    })

    App.router.setContent(table + '</table>')
  })
})
