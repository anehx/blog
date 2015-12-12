App.router.route('/register', function() {
  this.setContent(`
    <div class="login">
      <div>
        <form id="register" class="register-form">
          <input name="username"  placeholder="Benutzername" type="text" class="form-control" />
          <input name="blogname"  placeholder="Blogname" type="text" class="form-control" />
          <input name="password"  placeholder="Passwort" type="password" class="form-control" />
          <input name="password2" placeholder="Passwort wiederholen" type="password" class="form-control" />
          <button type="submit" class="btn btn--primary">Registrieren</button>
        </form>
        <a href="/login" class="history-link link-prefix">Zurück zum Login</a>
      </div>
    </div>
  `)

  this.view.on('submit', '#register', function(e) {
    e.preventDefault()

    var valid = true

    var username  = $(this).find('[name="username"]')
    var blogname  = $(this).find('[name="blogname"]')
    var password  = $(this).find('[name="password"]')
    var password2 = $(this).find('[name="password2"]')

    if (blogname.val().length < 1) {
      blogname.addClass('error')
    }

    if (!/^[A-Za-z0-9]*$/.test(username.val()) || username.val().length < 4) {
      username.addClass('error')
      valid = false
    }

    if (password.val().length < 6) {
      password.addClass('error')
      valid = false
    }

    if (password2.val() !== password.val() || password2.val().length < 6) {
      password2.addClass('error')
      valid = false
    }

    if (valid) {
      $.post(
        `${config.API_URL}/register`,
        {
          username: username.val(),
          password: password.val(),
          blogname: blogname.val()
        },
        function(data, textStatus, jqXhr) {
          if (jqXhr.status === 201) {
            Notify.success('Sie haben sich erfolgreich registriert.<br>Bitte loggen Sie sich ein.')
            App.router.transitionTo('/login')
          }
        }
      ).fail(function(xhr, status, error) {
        if (xhr.responseJSON) {
          Notify.error(`${xhr.status}: ${xhr.responseJSON.detail}`)
        }
      })
    }
  })
})
