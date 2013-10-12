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
      
      Kolich.Selector.mouseup = function(){
        var st = Kolich.Selector.getSelected();
        if(st!=''){
          alert("You selected:\n"+st);
        }
      }
      
      $(document).ready(function(){
        $(document).bind("mouseup", Kolich.Selector.mouseup);
      });



$("body").click(function(){
  console.log("ready");
});
