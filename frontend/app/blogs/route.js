App.router.route('/(\\d+)', function() {
  App.store.query('posts', { blogID: arguments[0] }, 'category,blog', function(data) {
    if (data.data.length === 0) {
      App.router.setContent('<h1 class="page-title">Keine Posts gefunden!</h1>')
      return
    }
    else {
      var content = `<h1 class="page-title">${data.data[0].blog.name}</h1><div class="post-list">`
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
      App.router.setContent(content + '</div>')
    }
  })
})
