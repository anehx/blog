function validatePassword(el) {
  el.removeClass('error')

  if (!/^.{6,24}$/.test(el.val())) {
    el.addClass('error')
  }
}

function validatePasswordRepeat(el, password) {
  el.removeClass('error')
  validatePassword(el)

  if (el.val() !== password) {
    el.addClass('error')
  }
}

function validateUsername(el) {
  el.removeClass('error')

  if (!/^[a-zA-Z0-9_]{5,16}$/.test(el.val())) {
    el.addClass('error')
  }
}
