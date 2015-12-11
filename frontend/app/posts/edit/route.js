App.router.protectedRoute('/posts/(\\d+)/edit', function() {
  var postID = arguments[0]

  App.store.get('posts', arguments[0], 'category,blog', function(data) {
    var post = data.data
    var user = App.getUser()

    if (post.blogID !== user.blog.id) {
      App.router.noPermission()
      return
    }

    var content = `
    <form id="edit-form">
      <div class="form-group">
        <label for="title">Titel:</label>
        <input type="text" name="title" id="title" class="form-control" value="${post.title}">
      </div>
      <div class="form-group">
        <label for="content">Inhalt:</label>
        <textarea name="content" id="content" class="form-control">${post.content}</textarea>
      </div>
    `
    App.store.getList('categories', null, function(data) {
      var select = ''
      data.data.forEach(function(category) {
        var sel = category.id === post.categoryID ? 'selected' : ''
        select += `<option value="${category.id}" ${sel}>${category.name}</option>`
      })
      content += `
        <div class="form-group">
          <label for="category">Kategorie:</label>
          <select id="category" name="category" class="form-control">
            ${select}
          </select>
        </div>
        <button class="btn btn--primary">Speichern</button>
      </form>`
      App.router.setContent(content)
    })
  })

  App.router.view.on('submit', '#edit-form', function(e) {
    e.preventDefault()

    $.ajax({
      method: 'PUT',
      url: `${config.API_URL}/posts/${postID}`,
      data: {
        title: $('#title').val(),
        content: $('#content').val(),
        categoryID: $('#category').val()
      },
      success: function(data) {
        App.router.transitionTo(`/posts/${data.data.id}`)
        Notify.success('Post erfolgreich gespeichert')
      }
    })
  })
})
