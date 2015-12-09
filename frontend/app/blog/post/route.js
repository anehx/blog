App.router.route('/posts/(\\d+)', function() {
  App.store.get('posts', arguments[0], 'category', function(data) {
    var post = data.data
    var date = new Date(post.created * 1000)
    var dateStr = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`
    var timeStr = `${date.getHours()}:${date.getMinutes()}`

    App.router.setContent(`
      <h1>${post.title}</h1>
      <em>In Kategorie ${post.category.name} am ${dateStr} um ${timeStr}</em>
      <p>${post.content}</p>
      <a href="/blog/${post.blogID}" class="history-link">Zurück</a>
    `)
  })
})
