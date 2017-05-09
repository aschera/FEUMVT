function getMovieFromFirebase(updateCountryData) {

var movies = {
  apiKey: "8f9cb0455f3b5cefb95acc1c35525622",
  popularMovies: [],
  getPopularMovies: function(){
    fetch(`https://api.themoviedb.org/3/movie/popular?page=1&language=en-US&api_key=${this.apiKey}`).then(function(response){
      response.json().then(function(object){
          movies.popularMovies = object.results;
      }).catch(function(error){
          console.log("Network error");
      });
    });
  }
  getMovieDetails: function(movieId){
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${this.apiKey}&language=en-US`).then(function(response){
      response.json().then(function(object){

      }).catch(function(error){
          console.log("Network error");
      });
    });
  }
}

movies.request();

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
