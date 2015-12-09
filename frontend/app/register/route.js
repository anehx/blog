App.router.route('/register', function() {
  this.setContent(
    '<div class="login">'+
    '  <form id="register" class="login-form">'+
    '    <input name="username" type="text" class="form-control" />'+
    '    <input name="password" type="password" class="form-control" />'+
    '    <input name="password2" type="password" class="form-control" />'+
    '    <input type="submit" value="Registrieren" class="btn" />'+
    '  </form>'+
    '</div>'
  )

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
        // do stuff
      }
    )
  })
})
