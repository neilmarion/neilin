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
          $(".popup").css({"left": e.pageX, "top": e.pageY});
        }else{
          //$(".popup").hide();
        }
      }
      
      $(document).ready(function(){
        $("body").append('<div class="popup">NEIL MARION</div>');
        $(document).bind("mouseup", Kolich.Selector.mouseup);
      });

