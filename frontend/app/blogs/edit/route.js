App.router.route('/(\\d+)/edit', function() {
  App.store.get('blogs', arguments[0], null, function(data) {
    var blog = data.data

    if (blog.id === App.getUser().blog.id) {
      App.router.setContent(`
        <div class="login">
          <div>
            <form id="blog-form" class="login-form">
              <input name="blogname" type="text" placeholder="Blogname" class="form-control"  value="${blog.name}" />
              <input type="hidden" name="blogID" value="${blog.id}" />
              <button type="submit" class="btn btn--primary">Speichern</button>
            </form>
          </div>
        </div>
      `)

      App.router.view.on('blur', 'input[name="blogname"]', function(e) {
        validateBlogname($(this))
      })

      App.router.view.on('submit', '#blog-form', function(e) {
        e.preventDefault()

        var valid = true
        var blogname = $('input[name="blogname"]')
        var blogID   = $('input[name="blogID"]').val()

        validateBlogname(blogname)

        if (!blogname.hasClass('error')) {
          $.ajax({
            url: `${config.API_URL}/blogs/${blogID}`,
            method: 'PUT',
            data: { blogname: blogname.val() },
            success: function(data) {
              App.router.transitionTo('/' + blogID)
              Notify.success('Blogname erfolgreich geändert')
            }
          })
        }
      })
    }
    else {
      App.router.noPermission()
    }
  })
})
