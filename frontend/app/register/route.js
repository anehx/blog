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

    var username = $(this).find('[name="username"]').val()
    var password = $(this).find('[name="password"]').val()

    $.post(
      `${config.API_URL}/register`,
      {
        username: username,
        password: password
      },
      function(data) {
        // TODO
      }
    )
  })
})
