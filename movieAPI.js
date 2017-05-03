var movies = {
  request: function(){
    /*
    let data = "{}";
    let xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        console.log(this.responseText);
      }
    });
    xhr.open("GET", "https://api.themoviedb.org/3/movie/popular?page=1&language=en-US&api_key=8f9cb0455f3b5cefb95acc1c35525622");
    xhr.send(data);
    console.log("Request sent");
*/
    fetch("https://api.themoviedb.org/3/movie/popular?page=1&language=en-US&api_key=8f9cb0455f3b5cefb95acc1c35525622").then(function(response){
      response.json().then(function(object){
          console.log(object);
      }).catch(function(error){
          console.log("Network error");
      });
    });
  }
  
}

movies.request();
