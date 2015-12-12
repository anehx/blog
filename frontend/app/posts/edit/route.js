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
    <div class="container">
      <h1 class="page-title">Post "${post.title}" bearbeiten</h1>
      <div class="post">
        <form id="edit-form">
          <table>
            <tr>
              <td>
                <label for="title">Titel:</label>
              </td>
              <td>
                <input type="text" name="title" id="title" class="form-control" value="${post.title}">
              </td>
            </tr>
    `
    App.store.getList('categories', null, function(data) {
      var select = ''
      data.data.forEach(function(category) {
        var sel = category.id === post.categoryID ? 'selected' : ''
        select += `<option value="${category.id}" ${sel}>${category.name}</option>`
      })
      content += `
            <tr>
              <td>
                <label for="category">Kategorie:</label>
              </td>
              <td>
                <select id="category" name="category" class="form-control">
                  ${select}
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <label for="content">Inhalt:</label>
              </td>
              <td>
                <textarea name="content" id="content" class="form-control">${post.content}</textarea>
              </td>
            </tr>
          </table>
          <div class="buttons">
            <a href="/posts/${post.id}" class="history-link"><button class="btn btn--default">Abbrechen</button></a>
            <button class="btn btn--primary">Speichern</button>
          </div>
        </form>
      </div></div>`
      App.router.setContent(content)
    })
  })

  App.router.view.on('blur', 'input[name="title"]', function(e) {
    validateTitle($(this))
  })

  App.router.view.on('blur', 'textarea[name="content"]', function(e) {
    validateContent($(this))
  })

  App.router.view.on('blur', 'select[name="category"]', function(e) {
    validateCategory($(this))
  })


  App.router.view.on('submit', '#edit-form', function(e) {
    e.preventDefault()

    var title    = $('input[name="title"]')
    var content  = $('textarea[name="content"]')
    var category = $('select[name="category"]')

    validateTitle(title)
    validateContent(content)
    validateCategory(category)

    if (!(
      title.hasClass('error') ||
      content.hasClass('error') ||
      category.hasClass('error')
    )) {
      $.ajax({
        method: 'PUT',
        url: `${config.API_URL}/posts/${postID}`,
        data: {
          title:      title.val(),
          content:    content.val(),
          categoryID: category.val()
        },
        success: function(data) {
          App.router.transitionTo(`/posts/${data.data.id}`)
          Notify.success('Post erfolgreich gespeichert')
        }
      })
    }
  })
})
