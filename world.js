function getWorldFromFirebase(updateCountryData) {

//getCountry(){
    
    let country;
    let url = 'http://api.population.io/1.0/countries'
    fetch(url)
    .then( response => {
        return response.json();  // Promise som kommer returnera JSON
    })
    .then(json => {// objekt
        let randomNumber = Math.floor(Math.random() * 236) + 1;
        country = json.countries[randomNumber];
        console.log(country);
        //this.setCurrentCountry(country);
        //this.getCountryPopulation();
    })
    
//}
    
} //end getWorldFromFirebase