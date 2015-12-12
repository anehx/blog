App.router.route('/(\\d+)', function() {
  var blogID = arguments[0]

  App.store.get('blogs', blogID, null, function(blog) {
    var edit  = App.getUser().blog.id === blog.data.id ? `
      <a class="history-link" href="/${blog.data.id}/edit"><i class="fa fa-pencil"></i></a>
    ` : ''

    var title = `<h1 class="page-title">${blog.data.name}${edit}</h1>`

    App.store.query('posts', { blogID: blog.data.id }, 'category,blog', function(data) {
      var content = `<div class="container">${title}<div class="post-list">`

      if (data.data.length < 1) {
        content += '<h2 class="empty">Keine Posts gefunden...</h2>'
      }
      else {
        data.data.forEach(function(post) {
          var date = new Date(post.created * 1000)
          var dateStr = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`
          var timeStr = `${date.getHours()}:${date.getMinutes()}`
          content += `
            <section class="post" id="post-${post.id}">
              <h1>
                <a href="/posts/${post.id}" class="history-link">${post.title}</a>
              </h1>
              <em>In Kategorie ${post.category.name} am ${dateStr} um ${timeStr}</em>
              <p>${truncate(post.content, 200)}</p>
              <a href="/posts/${post.id}" class="history-link link-postfix">Weiterlesen</a>
            </section>
          `
        })
      }
      App.router.setContent(content + '</div></div>')
    })
  })
})
