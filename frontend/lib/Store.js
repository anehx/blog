var Store = {
  success: function(data, callback) {
    if (data.status === 200) {
      callback(data)
    }
    else {
      App.router.apiError(`${data.status}: ${data.detail}`)
    }
  },

  ajax: function(method, url, data, callback) {
    $.ajax({
      method: method,
      url: config.API_URL + '/' + url,
      data: data,
      success: function(data) {
        Store.success(data, callback)
      }
    })
  },

  ajaxPost: function(url, data, callback) {
    this.ajax('POST', url, data, callback)
  },

  ajaxGet: function(url, callback) {
    this.ajax('GET', url, {}, callback)
  },

  getList: function(item, callback) {
    this.ajaxGet(item, callback)
  },

  get: function(item, id, callback) {
    var url = item + '/' + id

    this.ajaxGet(url, callback)
  },

  query: function(item, queryParams, callback) {
    var url = Object.keys(queryParams).reduce(function(url, key, i) {
      if (i) url += '&'

      return url + key + '=' + queryParams[key]
    }, item + '?')

    this.ajaxGet(url, callback)
  }
}
