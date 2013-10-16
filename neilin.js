if(!window.Neilin){
  Neilin = {};
}

Neilin.Selector = {};
// getSelected() was borrowed from CodeToad at
// http://www.codetoad.com/javascript_get_selected_text.asp
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

function computeXY(startX, startY, endX, endY){


  //console.log(x+", "+y);

  var range = window.getSelection().getRangeAt(0);
  range.collapse(false);
  console.log(range);
  var dummy = document.createElement("span");
  range.insertNode(dummy);
  var rect = dummy.getBoundingClientRect();
  var x = rect.left, y = rect.top;
  dummy.parentNode.removeChild(dummy);

  var endX = x;
  var endY = y;

  var sel = document.selection, range;
  var x = 0, y = 0;
  sel = Neilin.Selector.getSelected(); 
  if (sel.rangeCount) {
      range = sel.getRangeAt(0).cloneRange();
      if (range.getClientRects) {
          range.collapse(true);
          var rect = range.getClientRects()[0];
          x = rect.left;
          y = rect.top;
      }
  }

  var startX = x;
  var startY = y;

  var y; var addX;
  
  if(endY > startY){
    y = startY; 
  }else{
    y = endY;
  }

  if(endX > startX){
    addX = startX; 
  }else{
    addX = endX;
  }


  x = Math.abs(endX - startX) / 2;

  return [addX + x, y];
}

Neilin.Selector.mouseup = function(e){
  var x = 0; var y = 1;
  var xy;
  window.endX = e.pageX;
  window.endY = e.pageY;

  if(window.startX + window.startY != window.endX + window.endY) {
    xy = computeXY(window.startX, window.startY, window.endX, window.endY);

    var st = Neilin.Selector.getSelected();
    if(st!=''){
      $(".popup").css({"left": xy[x]-40, "top": xy[y]-65});
      $(".popup").show();
      // use e.target to get the clicked element
    }else{
      $(".popup").hide();
    }
    window.endX = e.pageX
    window.endY = e.pageY
  }else{
    $(".popup").hide();
  }
}

Neilin.Selector.mousedown = function(e){
  window.startX = e.pageX;
  window.startY = e.pageY;
}

$(document).ready(function(){
  highlightMenu = '<div class="popup highlight-menu highlight-menu-active"><div class="highlight-menu-inner"><ul class="highlight-menu-buttons"><li class="highlight-menu-button highlight-menu-notes"><button class="btn-highlight-menu" data-action="highlight"><span class="icons icon-facebook"></span></button></li><li class="highlight-menu-button highlight-menu-twitter"><button class="btn-highlight-menu" data-action="twitter"><span class="icons icon-twitter"></span></button></li></ul></div></div>';

  $("body").append(highlightMenu);
  $(document).bind("mouseup", Neilin.Selector.mouseup);
  $(document).bind("mousedown", Neilin.Selector.mousedown);

});
