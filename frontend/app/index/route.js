App.router.route('', function() {
  App.store.getList('blogs', null, function(data) {
    var content = ''
    data.data.forEach(function(blog) {
      content += `<a href="/blog/${blog.id}" class="history-link">${blog.name}</a><br>`
    })

    App.router.setContent(content)
  })
})
