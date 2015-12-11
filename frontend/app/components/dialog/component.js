/**
 *
 * This function raises a dialog
 *
 * @param {String}   title   title in the dialog header
 * @param {String}   content content in the dialog body
 * @param {String}   footer  footer content
 * @return {void}
 *
 */
function Dialog(title, content, footer) {
  this.id = btoa(new Date())
  this.html = `
    <div class="dialog-overlay" id="dialog-${this.id}">
      <div class="dialog">
        <div class="dialog-header">
          ${title}
          <i class="fa fa-times close-dialog"></i>
        </div>
        <div class="dialog-content">
          ${content}
        </div>
        <div class="dialog-footer">
          ${footer}
        </div>
      </div>
    </div>
  `

  this.show()
}

Dialog.prototype = {
  show: function() {
    $('body').append(this.html)
    $(`#dialog-${this.id}`).animate({opacity: 1})

    $(`#dialog-${this.id}`).on('click', '.close-dialog', function() {
      $(this).closest('.dialog-overlay').animate(
        { opacity: 0 },
        function() {
          $(this).unbind().remove()
        }
      )
    })

  },

  hide: function() {
    $(`#dialog-${this.id}`).animate({opacity: 0}, function() { $(this).remove() }).unbind()
  }
}


/**
 *
 * This function raises a dialog with a confirm and a cancel button
 *
 * If the user clicks the confirm button it calls the delivered callback function
 *
 * @param {String}   title      title in the dialog header
 * @param {String}   content    content in the dialog body
 * @param {String}   btnContent text of the confirm button
 * @param {Function} callback   callback function if dialog confirms
 * @return {void}
 *
 */
function ConfirmDialog(title, content, btnContent, params, callback) {
  var buttons = `
    <button class="btn btn--default close-dialog" type="button">Abbrechen</button>
    <button class="btn btn--primary confirm"      type="button">${btnContent}</button>
  `

  var dialog = new Dialog(title, content, buttons)

  $(`#dialog-${dialog.id}`).on('click', `.confirm`, { params: params }, function(e) {
    dialog.hide()
    callback(e.data.params)
  })
}
