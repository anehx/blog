Router.route('/posts/?$', function() {
  Store.getList('posts', function(data) {
    var html = ''
    data.data.forEach(function(post) {
      var title   = '<h1>' + post.title + '</h1>'
      var content = '<p>' + post.content + '</p>'
      html += '<section class="post">' + title + content + '</section>'
    })
    Router.setContent(html)
  })
})
