if(!window.Neilin){
  Neilin = {};
}

Neilin.Selector = {};
Neilin.Selector.getSelected = function(){
  var t = '';
  if(window.getSelection){
    t = window.getSelection();
  }else if(document.getSelection){
    t = document.getSelection();
  }else if(document.selection){
    t = document.selection.createRange().text;
  }
  return t;
}

function computeXY(){
  range = Neilin.Selector.getSelected().getRangeAt(0);
  range.collapse(false);
  dummy = document.createElement("span");
  range.insertNode(dummy);
  rect = dummy.getBoundingClientRect();
  endX = rect.left;
  endY = rect.top;
  dummy.parentNode.removeChild(dummy);

  range = Neilin.Selector.getSelected().getRangeAt(0); 
  range.collapse(true);
  rect = range.getClientRects()[0];
  startX = rect.left;
  startY = rect.top;
  
  y = endY > startY ? startY : endY;
  addX = endX > startX ? startX : endX;

  x = Math.abs(endX - startX) / 2;
  return {'x': addX + x, 'y': y}
}

Neilin.Selector.mouseup = function(e){
  window.endX = e.pageX;
  window.endY = e.pageY;


  st = Neilin.Selector.getSelected();
  if(window.startX + window.startY != window.endX + window.endY && st!='') {
    xy = computeXY();
    $(".popup").css({"left": xy['x']-40, "top": xy['y']-65});
    $(".popup").show();
  } else {
    $(".popup").hide();
  }
}

Neilin.Selector.mousedown = function(e){
  window.startX = e.pageX;
  window.startY = e.pageY;
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
  '</div>';

  $("body").append(highlightMenu);
  $(document).bind("mouseup", Neilin.Selector.mouseup);
  $(document).bind("mousedown", Neilin.Selector.mousedown);

  $('.btn-highlight-menu').on("click", function(e){
    action = $(this).data('action')
    switch(action) {
      case 'twitter':
        win = window.open('https://twitter.com/intent/tweet?text=hello','','width=200,height=100');
        win.focus();
        break;
    }
  });
});


