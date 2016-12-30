function getNames(response){
    var names = []

    response.entities.forEach(function(entity){
        if (entity.type == 'Person'){
            names.push(entity.text)
        }
    });
    return names;
}

function tagNames(names){
    allText = document.body.innerHTML;

    names.forEach(function(name){
       console.log("doing a thing with "+name);
       allText = allText.replace(name, "<span style='color: DeepPink' class='test'>"+name+"</span>"); 
    });
    document.body.innerHTML = allText; 
}

$(document).ready(function(){
  allText = document.body.innerHTML  
  pageUrl = document.URL

  alchemyUrl = 'https://gateway-a.watsonplatform.net/calls/url/URLGetRankedNamedEntities?apikey='
  alchemyKey = '6c8944b20948847c3923961cac83b128fe1dbd03'

  $.ajax({
    url: (alchemyUrl + alchemyKey),
    data: {
      'url': alchemyUrl,
      'outputMode' : 'json',
      'extract' : 'entities',
      'sentiment' : '1',
      'maxRetrieve' : '24',
      'url' : pageUrl
    },
    cache: false,
    type: 'POST',
    success: function(response){
        var names = getNames(response);
        console.dir(names);
        tagNames(names);
    },
    error: function(xhr){
      console.dir(xhr)
    }
  });


});

