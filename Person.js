function Person(name){
    this.name = name;  
    this.nameOccuranceCount = 0; 
  
    this.tagOccurances = function(){
        this.giveSpans();
        this.givePortraits(); 
    }
    
    this.giveSpans = function(){
        var textBody = document.body.innerHTML;
        taggedName = 
            "<span id='" + this.name + this.nameOccuranceCount +
            "' class='" + this.name +
            "' style='color: DeepPink'>" +
            this.name +
            "</span>"
        textBody = textBody.replace(new RegExp(this.name, 'g'), taggedName);
        this.nameOccuranceCount++;
        document.body.innerHTML = textBody; 
    }
  
    this.givePortrats = function(){
        var frame = document.createElement('div');
        frame.style.width = '200px';
        frame.style.height = '200px';
        frame.style.background = 'white';
        frame.className = this.name; 
        //add positioning, color, rounded edges, mmaybe even a little pointer to the mouse
        //also figure out where to appendChild
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
