
class CountryComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        currentCountry: 'No Country',
        currentCountryPopulation: 0
    }

      this.getCountry = this.getCountry.bind(this);
      this.getCountryPopulation = this.getCountryPopulation.bind(this);
      this.getCountryAndPopulation = this.getCountryAndPopulation.bind(this);
      this.setCurrentCountry = this.setCurrentCountry.bind(this);
      this.setCurrentCountryPopulation = this.setCurrentCountryPopulation.bind(this);
  }

getCountry(){
    let country;
    let url = 'http://api.population.io/1.0/countries'
    console.log('1');
    fetch(url)
    .then( response => {
        console.log('2', this)
        return response.json();  // Promise som kommer returnera JSON
    })
    .then(json => {// objekt
        console.log('3', country)
        let randomNumber = Math.floor(Math.random() * 236) + 1;
        country = json.countries[randomNumber];
        console.log(country)
        this.setCurrentCountry(country)
        this.getCountryPopulation()
    })
}

setCurrentCountry(country){
    this.setState({currentCountry: country})
}
    
setCurrentCountryPopulation(population){
    this.setState({currentCountryPopulation: population})
}
      
getCountryPopulation(){
    console.log(this.state.currentPopulation)
    let population;
    let url = 'http://api.population.io:80/1.0/population/' + this.state.currentCountry +  '/2015-12-24'
    fetch(url)
    .then(response => {
        return response.json();  // Promise som kommer returnera JSON
    })
    .then(json => {  // objekt
        console.log(json)
        population = json['total_population'].population;
        this.setCurrentCountryPopulation(population);
    });
}
    
getCountryAndPopulation(){     
this.getCountry();        
}
      
render(){
return(

<div>
<div>{this.state.currentCountry}</div>
<div>{this.state.currentCountryPopulation}</div>
   <button onClick={this.getCountry}></button>
   <button onClick={this.getCountryPopulation}></button>
   <button onClick={this.getCountryAndPopulation}></button>
    
</div>
)

}
}


ReactDOM.render(

    <CountryComponent />, document.getElementById('app')

);



