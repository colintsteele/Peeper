$(document).ready(function(){
  getEntitiesFromAlchemyAPI();
});

function getEntitiesFromAlchemyAPI(){
  alchemyUrl = 'https://gateway-a.watsonplatform.net/calls/url/URLGetRankedNamedEntities?apikey='
  alchemyKey = '6c8944b20948847c3923961cac83b128fe1dbd03'
  var response;

  $.ajax({
    url: (alchemyUrl + alchemyKey),
    data: {
      'url': alchemyUrl,
      'outputMode' : 'json',
      'extract' : 'entities',
      'sentiment' : '1',
      'maxRetrieve' : '100',
      'url' : document.URL 
    },
    //cache: false,
    type: 'POST',
    success: function(response){
      getNames(response);
    },
    error: function(xhr){
      response = xhr;
    }
  });
}

function getNames(response){
  var names = []

  response.entities.forEach(function(entity){
    if (entity.type == 'Person'){
        names.push(entity.text)
    }
  });

  tagNames(names);
}

function tagNames(names){
  var allText = document.body.innerHTML;
  var people = [];

  names.forEach(function(name){
    person = new Person(name);
    allText = person.tagName(allText);     
  });

  document.body.innerHTML = allText; 
}

function Person(name){
  this.name = name;  
  this.nameOccuranceCount = 0; 

  this.tagName = function(textBody){
    taggedName = "<span id='"+this.name+this.nameOccuranceCount+"' class='"+this.name+"' style='color: DeepPink'>"+this.name+"</span>"
    textBody = textBody.replace(new RegExp(this.name, 'g'), taggedName);
    this.nameOccuranceCount++;
    return textBody;
  }

  this.getPortrait = function(){
    googleApiKey = 'AIzaSyBh1mbRlS0Mutavt8PuoIytqpn0Bsn_JIM' + '&'
    googleCustomSearchId = 'cx='+ '013039004155227536814:lobto-0zlua'+'&'
    googleUrl = 'https://www.googleapis.com/customsearch/v1?key='
    namesUrls = []; 
  
    $.ajax({ 
      url: (googleUrl + googleApiKey + googleCustomeSearchId),
      data: {
       'q' : this.name,
       'num' : '1',
       'imgSize' : 'medium', 
       'searchType' : 'image',
       'imgType':'face',
      }, 
      type: 'GET',
      success: function(response){
        response.items.forEach(function(item){ 
          namesUrls.push(item); 
        }

      } 
    });  

  }
}

function tagPics(names){ 
  for(var i = 0; i <= names.length; i++) {
    picsNames(names[i]);
  }
}
