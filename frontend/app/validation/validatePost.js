function validateTitle(el) {
  el.removeClass('error')

  if (el.val().length === 0) {
    el.addClass('error')
  }
}

function validateContent(el) {
  el.removeClass('error')

  if (el.val().length === 0) {
    el.addClass('error')
  }
}

function validateCategory(el) {
  el.removeClass('error')

  if (el.val().length === 0) {
    el.addClass('error')
  }
}
