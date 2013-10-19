var TWITTER_SHARE_URL = 'https://twitter.com/intent/tweet?text='
var GOOGLEPLUS_SHARE_URL = 'https://www.facebook.com/sharer/sharer.php?u='
var FACEBOOKSHARE_URL = 'https://plus.google.com/share?url='

if(!window.Neilin){
  Neilin = {}
}
Neilin.Selector = {}
Neilin.Selector.getSelected = function(){
  var t = ''
  if(window.getSelection){
    t = window.getSelection()
  }else if(document.getSelection){
    t = document.getSelection()
  }else if(document.selection){
    t = document.selection.createRange().text
  }
  return t
}

function formatMessage(message){
  if (message.length > 112){
    message = message.substring(0, 112)
    message = '"'+ message  +'..." ' 
  } else {
    message = '"'+ message  +'" ' 
  }
  return message
}

function computeXY(){
  range = Neilin.Selector.getSelected().getRangeAt(0)
  range.collapse(false)
  dummy = document.createElement("span")
  range.insertNode(dummy)
  rect = dummy.getBoundingClientRect()
  endX = rect.left
  endY = rect.top
  dummy.parentNode.removeChild(dummy)

  range = Neilin.Selector.getSelected().getRangeAt(0) 
  range.collapse(true)
  rect = range.getClientRects()[0]
  startX = rect.left
  startY = rect.top
  
  y = endY > startY ? startY : endY
  addX = endX > startX ? startX : endX

  x = Math.abs(endX - startX) / 2
  return {'x': addX + x, 'y': y}
}

Neilin.Selector.mouseup = function(e){
  window.endX = e.pageX
  window.endY = e.pageY

  st = Neilin.Selector.getSelected()
  st = st.toString()
  window.st = st

  if(window.startX + window.startY != window.endX + window.endY && st!='') {
    xy = computeXY()
    $(".popup").css({"left": pageXOffset + xy['x']-40, "top": pageYOffset + xy['y']-45})
    $(".popup").show().animate({ top: pageYOffset + xy['y']-65}, {duration: 500, easing: 'easeOutElastic'})

  } else {
    $(".popup").hide()
  }
}

Neilin.Selector.mousedown = function(e){
  window.startX = e.pageX
  window.startY = e.pageY
}

$(document).ready(function(){
  highlightMenu = '<div class="popup highlight-menu highlight-menu-active">'+
    '<div class="highlight-menu-inner">'+
      '<ul class="highlight-menu-buttons">'+
        '<li class="highlight-menu-button highlight-menu-facebook">'+
          '<button class="btn-highlight-menu" data-action="facebook">'+
            '<span class="icons icon-facebook"></span>'+
          '</button>'+
        '</li>'+
        '<li class="highlight-menu-button highlight-menu-google">'+
          '<button class="btn-highlight-menu" data-action="google">'+
            '<span class="icons icon-google-plus"></span>'+
          '</button>'+
        '</li>'+
        '<li class="highlight-menu-button highlight-menu-twitter">'+
          '<button class="btn-highlight-menu" data-action="twitter">'+
            '<span class="icons icon-twitter"></span>'+
          '</button>'+
        '</li>'+
      '</ul>'+
    '</div>'+
  '</div>'

  $("body").append(highlightMenu)
  $(document).bind("mouseup", Neilin.Selector.mouseup)
  $(document).bind("mousedown", Neilin.Selector.mousedown)

  $('.btn-highlight-menu').on("click", function(e){
    action = $(this).data('action')
    switch(action) {
      case 'twitter':
        win = window.open(TWITTER_SHARE_URL+ formatMessage(window.st) + window.location.href,'','width=200,height=100')
        win.focus()
        break
      case 'facebook':
        win = window.open(FACEBOOK_SHARE_URL+window.location.href,'','width=200,height=100')
        win.elements['input'].value = 'hello'
        break
      case 'google':
        win = window.open(GOOGLEPLUS_SHARE_URL+window.location.href,'','width=200,height=100')
        break
    }
  })
})


