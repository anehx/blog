var Notify = {
  timeout: 10000,

  raise: function(type, message) {
    var id = btoa(new Date())

    $('#notifications').append(`
      <div class="notify notify--${type}" id="notify-${id}">
        ${message}
      </div>
    `).fadeIn(300)

    $('#notifications').on('click', `#notify-${id}`, function() {
      $(this).fadeOut(300, function() { $(this).remove() })
    })

    setTimeout(function() {
      $(`#notify-${id}`).fadeOut(300, function() { $(this).remove() })
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
