var sports = {

    request: function() {
    let url = "http://api.football-data.org/v1/competitions/"; 
    //url +="5524a123b5a54565a7f6d6caf6b6ac4b";
    fetch(url).then(function(response){
      response.json().then(function(object){
          console.log(object);
      }).catch(function(error){
          console.log("Network error");
      });
    });
}
    
}
sports.request();