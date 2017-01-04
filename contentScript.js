$(document).ready(function(){
    var entities = getEntitiesFromAlchemyAPI();
    var people = extractPeopleFromEntities(entities);
    tagOccurancesOnPage(people);
});

function tagOccurancesOnPage(entities){
    entities.forEach(function(entity){
        entity.tagOccurances();
    }); 
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

