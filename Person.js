function Person(name){
    this.name = name;  
    this.nameOccurances = [];
  
    this.tagOccurances = function(){
        this.giveSpans();
        this.givePortraits(); 
    }
    
    this.giveSpans = function(){
        var textBody = document.body.innerHTML;
        taggedName = 
            "<span id='" + this.name + (this.nameOccurances.size) +
            "' class='" + this.name +
            "' style='color: DeepPink'>" +
            this.name +
            "</span>"
        textBody = textBody.replace(new RegExp(this.name, 'g'), taggedName);
        if $("#"this.name, (this.nameOccurances.size))&& this.nameOccurances.push($("#"this.name, (this.nameOccurances.size)))
        document.body.innerHTML = textBody; 
    }
  
    this.givePortraits = function(){
        var frame = document.createElement('div');
        frame.className =  this.name + '_portrait';  
        frame.style.width = '200px';
        frame.style.height = '200px';
        frame.style.top = '0px';
        frame.style.left = '0px';
        frame.style.position = 'absolute';
        frame.style.background = '#fc6';
        frame.style.borderRadius = '3px';
        document.body.appendChild(frame);
        //consider the following instead
        $('<div />', {
            'class' :  
            'css' : {
                'width' : 'lots'; 
            }  
            'mouseover' : function(e){
                console.log(e+'yeah!');
            } 
        }).appendTo('body');
        //add positioning, color, rounded edges, mmaybe even a little pointer to the mouse
        //also figure out where to appendChild

        //this one follows mouse movement
        $(document).on('mousemove', function(e){
            //frame.style.left = e.pageX + 'px';
            //frame.style.top = e.pageY + 'px';
        });

        //this one sits above the name during mouseover on name
        $(this.namespaninstance).on('mousover', function(e){
            $(this).show;
            this.putPortrait(); //if !already_put
        });
        
        $(this.n).on('mouseout', function(e){
            $(this).hide
        });


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
