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

  this.view.on('submit', '#login', function(e) {
    e.preventDefault()

    var username = $(this).find('[name="username"]')
    var password = $(this).find('[name="password"]')

    $.post(
      API_URL + '/login',
      { username: username, password: password },
      function(data) {
        if (data.success) {
          localStorage.setItem('user', data.data)
          var token = btoa(`${data.data.username}:${data.data.password}`)

          $.ajaxSetup({
            beforeSend: function(xhr, settings) {
              xhr.setRequestHeader('Authorization', `Basic ${token}`)
            }
          })
        }
        else {
          Notify.error('Wrong credentials')
        }
      }
    )

    this.transitionTo('/')
  })
})
