var Store = {
  success: function(data, callback, status) {
    if (status === 404) {
      App.router.apiError('404: Route not found')
    }
    else {
      callback(data, status)
    }
  },

  ajax: function(method, url, data, callback) {
    $.ajax({
      method: method,
      url: config.API_URL + '/' + url,
      data: data,
      dataType: 'jsonp',
      success: function(data, textStatus, jqXHR) {
        Store.success(data, callback, jqXHR.status)
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

      return `${url}queryParams[${key}]=${queryParams[key]}`
    }, item + '?')

    this.ajaxGet(url, callback)
  }
}
