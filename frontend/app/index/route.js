App.router.route('', function() {
  App.store.getList('blogs', null, function(data) {
    var content = '<div class="container"><h1 class="page-title">Blogs</h1><div class="blog-list">'
    data.data.forEach(function(blog) {
      content += `
        <div>
          <a href="/${blog.id}" class="history-link">${blog.name}</a><br>
        </div>
      `
    })

    App.router.setContent(content + '</div></div>')
  })
})
