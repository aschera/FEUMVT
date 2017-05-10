function getMovieFromApi(updateCountryData) {

var movieApi = {
  apiKey: "8f9cb0455f3b5cefb95acc1c35525622",
  popularMovies: [],
  movieAndCompanyList: [],
  movieQuestions: [],
  companiesList: [
    "Walt Disney Pictures",
    "Warner Bros.",
    "Marvel",
    "DC Comics",
    "21st Century Fox"
  ],
  getPopularMovies: function(){
    // Later save to localStorage once per day and dont run if already requested today.
    fetch(`https://api.themoviedb.org/3/movie/popular?page=1&language=en-US&api_key=${this.apiKey}`).then(function(response){
      response.json().then(function(object){
          movieApi.popularMovies = object.results;
          console.log("Popular movies response: ",movieApi.popularMovies)
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
    console.log("Movie list: ",movieApi.movieAndCompanyList);
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

/*
REPSONE POPULAR MOVIES
{
  "page": 1,
  "results": [
    {
      "poster_path": "/tWqifoYuwLETmmasnGHO7xBjEtt.jpg",
      "adult": false,
      "overview": "A live-action adaptation of Disney's version of the classic 'Beauty and the Beast' tale of a cursed prince and a beautiful young woman who helps him break the spell.",
      "release_date": "2017-03-16",
      "genre_ids": [
        14,
        10749
      ],
      "id": 321612,
      "original_title": "Beauty and the Beast",
      "original_language": "en",
      "title": "Beauty and the Beast",
      "backdrop_path": "/6aUWe0GSl69wMTSWWexsorMIvwU.jpg",
      "popularity": 118.900517,
      "vote_count": 2194,
      "video": false,
      "vote_average": 6.8
    },

REPSONE MOVIE DETAIL
 {
  "adult": false,
  "backdrop_path": "/6aUWe0GSl69wMTSWWexsorMIvwU.jpg",
  "belongs_to_collection": null,
  "budget": 160000000,
  "genres": [
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 10749,
      "name": "Romance"
    }
  ],
  "homepage": "http://movies.disney.com/beauty-and-the-beast-2017",
  "id": 321612,
  "imdb_id": "tt2771200",
  "original_language": "en",
  "original_title": "Beauty and the Beast",
  "overview": "A live-action adaptation of Disney's version of the classic 'Beauty and the Beast' tale of a cursed prince and a beautiful young woman who helps him break the spell.",
  "popularity": 117.900517,
  "poster_path": "/tWqifoYuwLETmmasnGHO7xBjEtt.jpg",
  "production_companies": [
    {
      "name": "Walt Disney Pictures",
      "id": 2
    },
    {
      "name": "Mandeville Films",
      "id": 10227
    }
  ],
  "production_countries": [
    {
      "iso_3166_1": "GB",
      "name": "United Kingdom"
    },
    {
      "iso_3166_1": "US",
      "name": "United States of America"
    }
  ],
  "release_date": "2017-03-16",
  "revenue": 1048233200,
  "runtime": 129,
  "spoken_languages": [
    {
      "iso_639_1": "en",
      "name": "English"
    }
  ],
  "status": "Released",
  "tagline": "Be our guest.",
  "title": "Beauty and the Beast",
  "video": false,
  "vote_average": 6.8,
  "vote_count": 2212
}
*/

}

// end getDataFromFirebase function.
