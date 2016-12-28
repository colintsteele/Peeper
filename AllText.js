window.onload = function() {
  chrome.runtime.sendMessage({hello: "sup"}, function(response) {
    console.log(response);
  });
  console.log('hello from alltext');
}

function AllText(){
  var textBody = ""
 
  function init(){
    pTags = document.getElementsByTagName('p'); 

    for(p in pTags){
      textBody = textBody + (p.innerHTML);
    }
  }

  function sendTextToExtension(){
    
  }
	 
  function giveNamesSpanTags(name){
    alltext.replace(new RegExp(name), "<span>" + name + "</span>");    
  }
}

