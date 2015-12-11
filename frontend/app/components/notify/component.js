var Notify = {
  timeout: 5000,

  raise: function(type, message) {
    var id = btoa(new Date())

    $('#notifications').append(`
      <div class="notify notify--${type}" id="notify-${id}">
        ${message}
      </div>
    `).fadeIn(300)

    $('#notifications').on('click', `#notify-${id}`, function() {
      wipeOut(this)
    })

    setTimeout(function() {
      wipeOut($(`#notify-${id}`))
    }, this.timeout)
  },

  error: function(message) {
    this.raise('error', message)
  },

  success: function(message) {
    this.raise('success', message)
  },

  info: function(message) {
    this.raise('info', message)
  }
}

function wipeOut(el) {
  $(el).animate({'margin-left': '-50px', 'margin-right': '70px'}, 'normal', function() {
    $(this).animate({'margin-left': '300px', 'margin-right': '-300px'}, 'fast', function() {
      $(this).remove()
    })
  })
}
