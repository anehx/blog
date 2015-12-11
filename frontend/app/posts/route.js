App.router.route('/posts/(\\d+)', function() {
  App.store.get('posts', arguments[0], 'category,blog', function(data) {
    var post = data.data
    var date = new Date(post.created * 1000)
    var dateStr = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`
    var timeStr = `${date.getHours()}:${date.getMinutes()}`

    var content = `
      <h1>${post.title}</h1>
      <em>In Kategorie ${post.category.name} am ${dateStr} um ${timeStr}</em>
      <p>${post.content}</p>
      <a href="/${post.blogID}" class="history-link">Zurück zum Blog</a><br>
    `

    var user = App.getUser()

    if (user && user.id == post.blog.userID) {
      content += `
        <a href="/posts/${post.id}/edit" class="history-link" title="Post bearbeiten">
          <i class="fa fa-pencil"></i>
        </a>
        <a href="#" id="delete-post" data-blogID="${post.blogID}" data-id="${post.id}" title="Post löschen">
          <i class="fa fa-trash"></i>
        </a>
      `
    }

    $('body').on('click', '#delete-post', function(e) {
      e.preventDefault()

      ConfirmDialog(
        'Post löschen',
        'Wollen Sie diesen Post wirklich löschen?',
        'Löschen',
        { id: $(this).data('id') },
        function(params) {
          $.ajax({
            url: `${config.API_URL}/posts/${params.id}`,
            method: 'DELETE',
            success: function(data) {
              App.router.transitionTo('/')
              Notify.success('Post erfolgreich gelöscht')
            }
          })
        }
      )
    })

    App.router.setContent(content)
  })
})
