App.router.route('/login', function() {
  this.setContent(`
    <div class="login">
      <form id="login" class="login-form">
        <input name="username" type="text"     placeholder="Username" class="form-control" />
        <input name="password" type="password" placeholder="Password" class="form-control" />
        <button type="submit" class="btn btn--default">Login</button>
      </form>
    </div>
  `)

  this.view.on('submit', '#login', function(e) {
    e.preventDefault()

    var username = $(this).find('[name="username"]').val()
    var password = $(this).find('[name="password"]').val()

    $.post(
      `${config.API_URL}/login`,
      { username: username, password: password },
      function(data, textStatus, jqXHR) {
        var token = btoa(`${data.data.username}:${password}`)

        App.setUser(data.data)

        var d = new Date()
        d.setTime(d.getTime() + (7*24*60*60*1000)) // expire after 7 days

        document.cookie = `token=${token}; expires=${d.toUTCString()}`

        Notify.success('Erfolgreich eingeloggt')
        App.router.transitionTo('/' + data.data.blog.id)
      }
    )
  })
})
