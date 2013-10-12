if(!window.Kolich){
        Kolich = {};
      }
      
      Kolich.Selector = {};
      // getSelected() was borrowed from CodeToad at
      // http://www.codetoad.com/javascript_get_selected_text.asp
      Kolich.Selector.getSelected = function(){
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
      
      Kolich.Selector.mouseup = function(e){
        var st = Kolich.Selector.getSelected();
        if(st!=''){
          $(".popup").show();
          $(".popup").css({"left": e.pageX-40, "top": e.pageY-40});
        }else{
          $(".popup").hide();
        }
      }
      
      $(document).ready(function(){
        highlightMenu = '<div class="popup highlight-menu highlight-menu-active"><div class="highlight-menu-inner"><ul class="highlight-menu-buttons"><li class="highlight-menu-button highlight-menu-notes"><button class="btn-highlight-menu" data-action="highlight"><span class="icons icon-facebook"></span></button></li><li class="highlight-menu-button highlight-menu-twitter"><button class="btn-highlight-menu" data-action="twitter"><span class="icons icon-twitter"></span></button></li></ul></div></div>';

        $("body").append(highlightMenu);
        $(document).bind("mouseup", Kolich.Selector.mouseup);
      });

