var Store = {
  ajax: function(method, url, data, callback) {
    $.ajax({
      method: method,
      url: config.API_URL + '/' + url,
      data: data,
      dataType: 'json',
      success: function(data, textStatus, jqXHR) {
        callback(data, jqXHR.status)
      }
    })
  },

  ajaxPost: function(url, data, callback) {
    this.ajax('POST', url, data, callback)
  },

  ajaxGet: function(url, callback) {
    this.ajax('GET', url, {}, callback)
  },

  getList: function(item, include, callback) {
    var inc = include ? `?include=${include}` : ''
    this.ajaxGet(item + inc, callback)
  },

  get: function(item, id, include, callback) {
    var inc = include ? `?include=${include}` : ''
    var url = `${item}/${id}${inc}`

    this.ajaxGet(url, callback)
  },

  query: function(item, queryParams, include, callback) {
    var url = Object.keys(queryParams).reduce(function(url, key, i) {
      if (i) url += '&'

      return `${url}queryParams[${key}]=${queryParams[key]}`
    }, item + '?')

    if (include) url += `&include=${include}`

    this.ajaxGet(url, callback)
  }
}
