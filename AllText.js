window.onload = function() {
  AllText.init(); 
}

class AllText {

  var textBody = "";
  
  static init(){
    var pTags = document.getElementsByTagName('p');
    for(var p in pTags){
      textBody = textBody + (p.innerHTML);
    }
  }
 
  static sendTextToExtension(){
    
  }
  
  static giveNamesSpanTag(name){
	   
  }

}
