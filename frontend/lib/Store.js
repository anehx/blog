$.ajaxSetup({
     beforeSend: function(xhr, settings) {
       //TODO
     },
     error: function() {
       console.log('error')
       Router.apiError('AJAX call failed.')
     }
})

var Store = {
  getList(item, callback) {
    $.ajax({
      method: 'GET',
      url: config.API_URL + '/' + item,
      success: function(data) {
        if (!data.success) {
          Router.apiError(data.message)
        }
        else {
          callback(data)
        }
      }
    })
  }
}
