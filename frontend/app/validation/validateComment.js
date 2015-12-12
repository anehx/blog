function validateComment(el) {
  el.removeClass('error')

  if (el.val().length === 0) {
    el.addClass('error')
  }
}
