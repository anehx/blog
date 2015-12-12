App.router.route('/posts/(\\d+)', function() {
  App.store.get('posts', arguments[0], 'category,blog', function(data) {
    var post = data.data
    var icons = ''

    var user = App.getUser()

    if (user && user.blog.id == post.blog.id) {
      icons += `
        <a href="/posts/${post.id}/edit" class="history-link" title="Post bearbeiten">
          <i class="fa fa-pencil"></i>
        </a>
        <a href="#" id="delete-post" data-blogID="${post.blogID}" data-id="${post.id}" title="Post löschen">
          <i class="fa fa-trash"></i>
        </a>
      `
    }

    var paragraphs = post.content.split('\n').join('</p><p>')

    var content = `
      <div class="container">
        <div class="post">
          <h1>${post.title}</h1>
          <div class="icons">${icons}</div>
          <em>In Kategorie ${post.category.name} am ${timestampToDatestring(post.created)}</em>
          <p>${paragraphs}</p>
          <a href="/${post.blogID}" class="history-link link-prefix">Zurück zum Blog</a><br>
          <hr>
        </div>
        <div class="comments">
    `

    App.store.query('comments', { postID: post.id }, 'user', function(comments) {
      var header = `${comments.data.length} Kommentar` + (comments.data.length === 1 ? '' : 'e')
      var form   = App.getUser() ? `
        <div class="comments-form">
          <form id="comment-form">
            <input type="hidden" name="postID" value="${post.id}">
            <textarea
             class="form-control"
             name="comment-text"
             placeholder="Kommentar als ${App.getUser().username} hinzufügen"
            ></textarea>
            <div class="buttons">
              <button class="btn btn--primary" type="submit">Speichern</button>
            </div>
          </form>
        </div>
      ` : ''
      content += `
        <div class="comments-header">${header}</div>
        ${form}
        <div class="comments-list">
      `
      comments.data.forEach(function(comment) {
        var admin = comment.user.isAdmin ? ' (Administrator)' : ''
        var icons = comment.user.id === App.getUser().id ? `
          <a href="#" class="delete-comment" title="Kommentar löschen" data-id="${comment.id}">
            <i class="fa fa-trash"></i>
          </a>
        ` : ''

        content += `
          <div class="comment" id="comment-${comment.id}">
            <strong>${comment.user.username}${admin}</strong>
            <em> am ${timestampToDatestring(comment.created)}</em>
            ${icons}
            <p>${comment.text.split('\n').join('</p><p>')}</p>
          </div>
        `
      })

      App.router.setContent(content + '</div></div></div>')
    })

    App.router.view.on('submit', '#comment-form', function(e) {
      e.preventDefault()
      var valid = true
      var text  = $('textarea[name="comment-text"]')

      if (text.val().length < 1) {
        text.addClass('error')
        valid = false
      }

      if (valid) {
        $.post(
          `${config.API_URL}/comments?include=user`,
          {
            text:   text.val(),
            postID: $('input[name="postID"]').val()
          },
          function(data, textStatus, jqXhr) {
            if (jqXhr.status === 201) {
              Notify.success('Kommentar erfolgreich hinzugefügt')
              var comment = data.data
              var admin = comment.user.isAdmin ? ' (Administrator)' : ''

              $('.comments-list').prepend(`
                <div class="comment" id="comment-${comment.id}" style="display:none">
                  <strong>${comment.user.username}${admin}</strong>
                  <em> am ${timestampToDatestring(comment.created)}</em>
                  <a href="#" class="delete-comment" title="Kommentar löschen" data-id="${comment.id}"><i class="fa fa-trash"></i></a>
                  <p>${comment.text.split('\n').join('</p><p>')}</p>
                </div>
              `)
              $('textarea[name="comment-text"]').val('')
              $('.comments-list .comment:first-child').slideDown()
              var count  = $('.comments-list .comment').length
              var header = `${count} Kommentar` + (count === 1 ? '' : 'e')
              $('.comments-header').text(header)
            }
            else {
              Notify.error(data.detail)
            }
          }
        )
      }
    })

    App.router.view.on('click', '.delete-comment', function(e) {
      e.preventDefault()

      ConfirmDialog(
        'Kommentar löschen',
        'Wollen Sie diesen Kommentar wirklich löschen?',
        'Löschen',
        { id: $(this).data('id') },
        function(params) {
          $.ajax({
            url: `${config.API_URL}/comments/${params.id}`,
            method: 'DELETE',
            success: function() {
              $(`#comment-${params.id}`).slideUp(function() {
                $(this).remove()
                var count  = $('.comments-list .comment').length
                var header = `${count} Kommentar` + (count === 1 ? '' : 'e')
                $('.comments-header').text(header)
              })

              Notify.success('Kommentar erfolgreich gelöscht')
            }
          })
        }
      )
    })

    App.router.view.on('click', '#delete-post', function(e) {
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
              App.router.transitionTo('/' + App.getUser().blog.id)
              Notify.success('Post erfolgreich gelöscht')
            }
          })
        }
      )
    })
  })
})
