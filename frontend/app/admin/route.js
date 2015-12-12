App.router.route('/admin', function() {
  var content = `
    <div class="container">
      <h1 class="page-title">Benutzer administrieren</h1>
      <table class="table">
        <thead>
          <tr>
            <th>Benutzername</th>
            <th>Blogname</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
  `

  App.store.getList('blogs', 'user', function(data) {
    data.data.forEach(function(blog) {
      content += `
        <tr id="user-${blog.user.id}">
          <td>${blog.user.username}</td>
          <td>${blog.name}</td>
          <td><a href="#" data-id="${blog.user.id}" class="delete-user" title="Benutzer löschen"><i class="fa fa-trash"></i></td>
        </tr>
      `
    })

    App.router.setContent(content + '</tbody></table></div>')

    App.router.view.on('click', '.delete-user', function(e) {
      e.preventDefault()

      ConfirmDialog(
        'Benutzer löschen',
        'Wollen Sie diesen Benutzer wirklich löschen?',
        'Löschen',
        { id: $(this).data('id') },
        function(params) {
          $.ajax({
            url: `${config.API_URL}/users/${params.id}`,
            method: 'DELETE',
            success: function() {
              $(`#user-${params.id}`).slideUp(function() {
                $(this).remove()
              })

              Notify.success('Benutzer erfolgreich gelöscht')
            },
            error: function(xhr, status, error) {
              if (xhr.responseJSON) {
                Notify.error(`${xhr.status}: ${xhr.responseJSON.detail}`)
              }
            }
          })
        }
      )
    })
  })
})
