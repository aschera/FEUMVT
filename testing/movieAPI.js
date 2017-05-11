function getMovieFromApi(updateCountryData) {

var movieApi = {
  apiKey: "8f9cb0455f3b5cefb95acc1c35525622",
  popularMovies: [],
  movieAndCompanyList: [],
  movieQuestions: [],
  companiesList: [
    "Walt Disney Pictures",
    "Universal Pictures",
    "Marvel Studios",
    "Twentieth Century Fox Film Corporation",
    "Paramount Pictures",
    "Blumhouse Productions",
    "Warner Bros.",
    "Heyday films",
    "Studio Babelsberg",
    "Village Roadshow Pictures",
    "Lucasfilm"
  ],
  getPopularMovies: function(){
    // Later save to localStorage once per day and dont run if already requested today.
    fetch(`https://api.themoviedb.org/3/movie/popular?page=1&language=en-US&api_key=${this.apiKey}`).then(function(response){
      response.json().then(function(object){
          movieApi.popularMovies = object.results;
          movieApi.getMovieDetails();
      }).catch(function(error){
          console.log("Network error");
      });
    });
  },
  getMovieDetails: function(){
    movieApi.popularMovies.forEach(movie => {
      fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${this.apiKey}&language=en-US`).then(function(response){
        response.json().then(function(movieDetails){
          movieApi.mapQuestions(movieDetails);
          // Check if it's the last movie
          if(movieApi.popularMovies[movieApi.popularMovies.length-1] == movie){
            updateCountryData(movieApi.randomizeQuestions());
          }
        }).catch(function(error){
            console.log("Network error");
        }); // error
      }); // fetch
    }); // forEach

  },
  mapQuestions: function(movie){
    let name = movie.original_title;
    let company = movie.production_companies[0].name;
    let fakeCompanies = movieApi.companiesList.filter(function(name){
      return name != company;
    });
    let fake1 = fakeCompanies[movieApi.getRandom(0, fakeCompanies.length)];
    let fake2 = fakeCompanies[movieApi.getRandom(0, fakeCompanies.length)];
    while (fake2 == fake1)
      fake2 = fakeCompanies[movieApi.getRandom(0, fakeCompanies.length)];
    let question = {
      text: `What production company made the movie: ${name}?`,
      a1: `${company}`,
      a2: `${fake1}`,
      a3: `${fake2}`
    };
    movieApi.movieQuestions.push(question);
  },
  getRandom: function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  },
  randomizeQuestions: function(){
    /* Stolen from StackOverFlow */
    let array = movieApi.movieQuestions;
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
}
movieApi.getPopularMovies();
} // end getDataFromFirebase function.