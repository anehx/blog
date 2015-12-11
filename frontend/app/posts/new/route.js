App.router.protectedRoute('/posts/new', function() {
  var content = `
    <form id="new-form">
      <div class="form-group">
        <label for="title">Titel:</label>
        <input type="text" name="title" id="title" class="form-control">
      </div>
      <div class="form-group">
        <label for="content">Inhalt:</label>
        <textarea name="content" id="content" class="form-control"></textarea>
      </div>
  `
  App.store.getList('categories', null, function(data) {
    var select = ''
    data.data.forEach(function(category) {
      select += `<option value="${category.id}">${category.name}</option>`
    })
    content += `
        <div class="form-group">
          <label for="category">Kategorie:</label>
          <select id="category" name="category" class="form-control">
            ${select}
          </select>
        </div>
        <button class="btn btn--primary">Speichern</button>
      </form>
    `
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
