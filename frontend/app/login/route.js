App.router.route('/login', function() {
  this.setContent(`
    <div class="login">
      <div>
        <form id="login" class="login-form">
          <input name="username"  placeholder="Benutzername" type="text" class="form-control" />
          <input name="password"  placeholder="Passwort" type="password" class="form-control" />
          <button type="submit" class="btn btn--primary">Login</button>
        </form>
        <a href="/register" class="history-link">Sie haben noch keinen Account?</a>
      </div>
    </div>
  `)

  this.view.on('blur', 'input[name="password"]', function(e) {
    validatePassword($(this))
  })

  this.view.on('blur', 'input[name="username"]', function(e) {
    validateUsername($(this))
  })

  this.view.on('submit', '#login', function(e) {
    e.preventDefault()

    var username = $(this).find('input[name="username"]')
    var password = $(this).find('input[name="password"]')

    validateUsername(username)
    validatePassword(password)

    if (!(
      username.hasClass('error') ||
      password.hasClass('error')
    )) {
      $.post(
        `${config.API_URL}/login`,
        {
          username: username.val(),
          password: password.val()
        },
        function(data, textStatus, jqXHR) {
          var token = btoa(`${data.data.username}:${password.val()}`)

          App.setUser(data.data)

          var d = new Date()
          d.setTime(d.getTime() + (7*24*60*60*1000)) // expire after 7 days

          document.cookie = `token=${token}; expires=${d.toUTCString()}`

          Notify.success('Erfolgreich eingeloggt')
          App.router.transitionTo('/' + data.data.blog.id)
        }
      ).error(function(xhr) {
        if (xhr.responseJSON) {
          Notify.error(`${xhr.status}: ${xhr.responseJSON.detail}`)
        }
      })
    }
  })
})
