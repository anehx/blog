function Store()

Store.prototype = {
  success: function(data, callback) {
    if (!data.success) {
      Router.apiError(data.message)
    }
    else {
      callback(data)
    }
  },

  ajax: function(method, url, data, callback) {
    $.ajax({
      method: method,
      url: config.API_URL + '/' + url,
      data: data,
      success: function(data) {
        this.success(data, callback)
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
