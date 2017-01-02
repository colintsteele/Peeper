$(document).ready(function(){
    var entities = getEntitiesFromAlchemyAPI();
    var people = extractPeopleFromEntities(entities);
    tagOccurancesOnPage(people);
});

function tagOccurancesOnPage(entities){
    console.dir(entities);
    var textBody = document.body.innerHTML;

    entities.forEach(function(entity){
        entity.tagOccurances(textBody);
    }); 
    
    document.body.innerHTML = textBody;
}

function extractPeopleFromEntities(entities){
    people = [];

    entities.forEach(function(entity){
        if(entity.type == 'Person'){
            people.push(new Person(entity.text));
        }
    }); 

    return people;
}

function getEntitiesFromAlchemyAPI(type){
    var alchemyUrl = 'https://gateway-a.watsonplatform.net/calls/url/URLGetRankedNamedEntities?apikey='
    var alchemyKey = '6c8944b20948847c3923961cac83b128fe1dbd03'
    var entities = null; 

    $.ajax({
        async: false,
        url: (alchemyUrl + alchemyKey),
        data: {
            'url': alchemyUrl,
            'outputMode' : 'json',
            'extract' : 'entities',
            'sentiment' : '1',
            'maxRetrieve' : '100',
            'url' : document.URL 
        },
        type: 'POST',
        success: function(response){
            console.dir(response);
            entities = response.entities;
        },
        error: function(xhr){
            response = xhr;
        }
    });
     
    return entities;
}

function getNames(response){
    var names = [];

    response.entities.forEach(function(entity){
        if (entity.type == 'Person'){
            names.push(entity.text);
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
  
    this.tagOccurances = function(textBody){
        taggedName = 
            "<span id='" + this.name + this.nameOccuranceCount +
            "' class='" + this.name +
            "' style='color: DeepPink'>" +
            this.name +
            "</span>"
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
                });
            } 
        });  
    
    }
}

function tagPics(names){ 
  for(var i = 0; i <= names.length; i++) {
    picsNames(names[i]);
  }
}


