App.router.protectedRoute('/posts/new', function() {
  var content = `
  <div class="container">
  <h1 class="page-title">Neuer Post</h1>
  <div class="post">
    <form id="new-form">
      <table>
        <tr>
          <td>
            <label for="title">Titel:</label>
          </td>
          <td>
            <input type="text" name="title" id="title" class="form-control">
          </td>
        </tr>
  `
  App.store.getList('categories', null, function(data) {
    var select = ''
    data.data.forEach(function(category) {
      select += `<option value="${category.id}">${category.name}</option>`
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
              <textarea name="content" id="content" class="form-control"></textarea>
            </td>
          </tr>
        </table>
        <div class="buttons">
          <a href="/${App.getUser().blog.id}" class="history-link"><button class="btn btn--default">Abbrechen</button></a>
          <button class="btn btn--primary">Speichern</button>
        </div>
      </form>
    </div></div>`
    App.router.setContent(content)
  })

  App.router.view.on('submit', '#new-form', function(e) {
    e.preventDefault()

    $.post(
      `${config.API_URL}/posts`,
      {
        title:      $('#title').val(),
        content:    $('#content').val(),
        categoryID: $('#category').val()
      },
      function(data) {
        App.router.transitionTo(`/posts/${data.data.id}`)
        Notify.success('Post erfolgreich gespeichert')
      }
    )
  })
})
