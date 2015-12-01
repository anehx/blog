Router.route('/?$', function() {
  Store.getList('', function(data) {
    Router.setContent(data.message)
  })
})
