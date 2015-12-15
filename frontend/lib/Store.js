/**
 * A store to fetch data
 *
 * @public
 * @class
 */
function Store()

/**
 * The prototype of the store
 *
 * @public
 * @lends Store
 */
Store.prototype = {

  /**
   * Perform an ajax call
   *
   * @public
   * @param {String} method the HTTP method
   * @param {String} url the url to send it to
   * @param {Object} data the data to send
   * @param {Function} callback the callback
   * @return {void}
   */
  ajax: function(method, url, data, callback) {
    $.ajax({
      method: method,
      url: config.API_URL + '/' + url,
      data: data,
      dataType: 'json',
      success: function(data, textStatus, jqXHR) {
        callback(data, jqXHR.status)
      },
      error: function(jqXHR) {
        if (jqXHR.responseJSON) {
          Notify.error(jqXHR.responseJSON.detail)
        }
        else if (jqXHR.status === 404) {
          App.router.error()
        }
      }
    })
  },

  /**
   * Perform an ajax post
   *
   * @public
   * @param {String} url the url to send it to
   * @param {Object} data the data to send
   * @param {Function} callback the callback
   * @return {void}
   */
  ajaxPost: function(url, data, callback) {
    this.ajax('POST', url, data, callback)
  },

  /**
   * Perform an ajax get
   *
   * @public
   * @param {String} url the url to send it to
   * @param {Function} callback the callback
   * @return {void}
   */
  ajaxGet: function(url, callback) {
    this.ajax('GET', url, {}, callback)
  },

  /**
   * Get all objects of a type
   *
   * @public
   * @param {String} item the item type
   * @param {String} include the referred objects to include
   * @param {Function} callback the callback
   * @return {void}
   */
  getList: function(item, include, callback) {
    var inc = include ? `?include=${include}` : ''
    this.ajaxGet(item + inc, callback)
  },

  /**
   * Get an object of a type
   *
   * @public
   * @param {String} item the item type
   * @param {Number} id the item id
   * @param {String} include the referred objects to include
   * @param {Function} callback the callback
   * @return {void}
   */
  get: function(item, id, include, callback) {
    var inc = include ? `?include=${include}` : ''
    var url = `${item}/${id}${inc}`

    this.ajaxGet(url, callback)
  },

  /**
   * Query the backend for a type
   *
   * @public
   * @param {String} item the item type
   * @param {Object} queryParams the query params
   * @param {String} include the referred objects to include
   * @param {Function} callback the callback
   * @return {void}
   */
  query: function(item, queryParams, include, callback) {
    var url = Object.keys(queryParams).reduce(function(url, key, i) {
      if (i) url += '&'

      return `${url}queryParams[${key}]=${queryParams[key]}`
    }, item + '?')

    if (include) url += `&include=${include}`

    this.ajaxGet(url, callback)
  }

}
