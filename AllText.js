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
      people.push(new Person(name));
    });

    people.forEach(function(person){
      console.dir(person);
      allText = person.tagName(allText);
    });

    document.body.innerHTML = allText;
}

function Person(name){
  this.name = name;
  this.nameOccuranceCount = 0;

  this.tagName = function(textBody){
    taggedName = "<span id="+this.name+this.nameOccuranceCount+" class='"+this.name+"' style='color: DeepPink'>"+this.name+"</span>"
    textBody = textBody.replace(new RegExp(this.name, 'g'), taggedName);
    this.nameOccuranceCount++;
    return textBody;
  }

  function getPortrait(){

  }
}

var namesUrls = []

function picsNames(names){

googleApiKey = 'AIzaSyBh1mbRlS0Mutavt8PuoIytqpn0Bsn_JIM' + '&'
googleCustomSearchId = 'cx='+ '013039004155227536814:lobto-0zlua'+'&'
googleUrl = 'https://www.googleapis.com/customsearch/v1?key='

$.ajax({
//API key and search engine id are embedded in url
//Process returns URL of first image result equal to face
 url: (gUrl + gApiKey + gCustomSearchId),
   data: {
       'q' : names ,
       'num' : '1',
       'imgSize' : 'medium', //not needed if renderer can scale image
       'searchType' : 'image',
       'imgType':'face',
   },
   type: "GET",
 success: function(response){
 //  console.dir(response)

 //  response.items[0].link.forEach(function(link){
    namesUrls.push(response.items[0].link)
   }
 //}
//}
});

//Sends name to PicsNames which then adds a link to the picture to namesUrls. Should match on index.
function tagPics(names){
 for (var i = 0; i <= names.length; i++) {
    picsNames(names[i])
 }
};
