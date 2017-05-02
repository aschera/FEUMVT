
class CountryComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        currentCountry: '',
        currentCountryPopulation: 0
    }
      
      this. getCountry = this.getCountry.bind(this);
      this.getCountryPopulation = this.getCountryPopulation.bind(this);
  }



var country = 'inget land än';
var countrypopulation = 0;

function getCountry (){
    let url = 'http://api.population.io/1.0/countries'
    fetch(url)
.then(function(response) {
	return response.json();  // Promise som kommer returnera JSON
})
.then(function(json) {// objekt
    let randomNumber = Math.floor(Math.random() * 236) + 1;
	this.setState({currentCountry: json.countries[randomNumber]})
});
}

getCountry();
setTimeout(function(){
  getPopulationOfCountry()  
    
}, 500)



function getPopulationOfCountry(){

let url = 'http://api.population.io:80/1.0/population/' + country +  '/2015-12-24'
fetch(url)
.then(function(response) {
	return response.json();  // Promise som kommer returnera JSON
})
.then(function(json) {  // objekt

    countrypopulation=json['total_population'].population;
});

}


setTimeout(function(){
       console.log('The country is ' + country + ' which has a population of ' + countrypopulation)
    }, 1000)

render(){
return(


)

}
};


