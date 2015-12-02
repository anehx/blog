App.router.route('/login', function() {
  if (localStorage.getItem('user')) {
    this.setContent('<h1>You are logged in</h1>')
  }
  else {
    this.setContent(
      '<div class="login">'+
      '  <form id="login" class="login-form">'+
      '    <input name="username" type="text" class="form-control" />'+
      '    <input name="password" type="password" class="form-control" />'+
      '    <input type="submit" value="Login" class="btn" />'+
      '  </form>'+
      '</div>'
    )
  }

  $('#view').on('submit', '#login', function(e) {
    e.preventDefault()

    var username = $(this).find('[name="username"]')
    var password = $(this).find('[name="password"]')

    $.post(
      API_URL + '/login',
      { username: username, password: password },
      function(data) {
        if (data.success) {
          localStorage.setItem('user', data.data)
        }
        else {
        }
      }
    )

    Router.check()
  })
})
