$(function() {
  'use strict'

  function setContent(title) {

    switch(title) {

      case 'posts':
        $.getJSON('/posts.json', function(data) {
          var html = ''
          data.forEach(function(post) {
            var title   = '<h1>' + post.title + '</h1>'
            var content = '<p>' + post.content + '</p>'
            html += '<section class="post">' + title + content + '</section>'
          })
          $('#index-page').html(html)
        })
        break;

      case 'login':
        $('#index-page').html('<h1>Login please</h2>')
        break;

      default:
        $('#index-page').html('<h1>Welcome</h2>')
    }

  }

  setContent('index')

  $('a.history-link').on('click', function(e) {
    e.preventDefault()

    history.pushState({
      active: $(this).data('active'),
      title:  $(this).data('title')
    }, $(this).data('title'), $(this).data('url'))

    setContent($(this).data('title'))

    $('a.history-link').removeClass('active')
    $('a.history-link[data-title="'+history.state.active+'"]').addClass('active')
  })

  $(window).on('popstate', function(e) {
    setContent(e.originalEvent.state.title)
  })

})
