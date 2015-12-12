App.router.route('/register', function() {
  this.setContent(`
    <div class="login">
      <div>
        <form id="register" class="register-form" autocomplete="off">
          <input name="blogname"  placeholder="Blogname" type="text" class="form-control" />
          <input name="username"  placeholder="Benutzername" type="text" class="form-control" />
          <input name="password"  placeholder="Passwort" type="password" class="form-control" />
          <input name="password2" placeholder="Passwort wiederholen" type="password" class="form-control" />
          <button type="submit" class="btn btn--primary">Registrieren</button>
        </form>
        <a href="/login" class="history-link link-prefix">Zurück zum Login</a>
      </div>
    </div>
  `)

  this.view.on('blur', 'input[name="blogname"]', function(e) {
    validateBlogname($(this))
  })

  this.view.on('blur', 'input[name="password2"]', function(e) {
    var password = App.router.view.find('input[name="password"]')
    validatePasswordRepeat($(this), password.val())
  })

  this.view.on('blur', 'input[name="password"]', function(e) {
    var password2 = App.router.view.find('input[name="password2"]')
    validatePassword($(this))

    if (password2.val()) {
      validatePasswordRepeat(password2, $(this).val())
    }
  })

  this.view.on('blur', 'input[name="username"]', function(e) {
    validateUsername($(this))
  })

  this.view.on('submit', '#register', function(e) {
    e.preventDefault()

    var username  = $(this).find('[name="username"]')
    var blogname  = $(this).find('[name="blogname"]')
    var password  = $(this).find('[name="password"]')
    var password2 = $(this).find('[name="password2"]')

    validateBlogname(blogname)
    validateUsername(username)
    validatePassword(password)
    validatePasswordRepeat(password2, password.val())

    if (!(
      username.hasClass('error') ||
      blogname.hasClass('error') ||
      password.hasClass('error') ||
      password2.hasClass('error')
    )) {
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
