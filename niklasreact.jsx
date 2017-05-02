
class CountryComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        questions: [
        {
          text: "Questions 1",
          a1: "Correct answer",
          a2: "Wrong answer",
          a3: "Also Wrong answer"
        },{
          text: "Question 2",
          a1: "Correct answer",
          a2: "Wrong answer",
          a3: "Also Wrong answer"
        }
        ],
        
        currentCountry: 'No Country',
        currentCountryPopulation: 3
    }

      this.getCountry = this.getCountry.bind(this);
      this.getCountryPopulation = this.getCountryPopulation.bind(this);
      this.setCurrentCountry = this.setCurrentCountry.bind(this);
      this.setCurrentCountryPopulation = this.setCurrentCountryPopulation.bind(this);
      this.returnQuestionAndAnswers = this.returnQuestionAndAnswers.bind(this);
      this.simulateQuestions=this.simulateQuestions.bind(this);
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
        console.log(country);
        this.setCurrentCountry(country);
        this.getCountryPopulation();
        
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
        this.returnQuestionAndAnswers();
    });
}
    
simulateQuestions(){
    for(let i=1; i<=10; i++){
        this.getCountry();  
    };
}
    
returnQuestionAndAnswers(){
    
    let randomNumber = Math.floor(Math.random() * this.state.currentCountryPopulation/2) + this.state.currentCountryPopulation/3;
    let num = this.state.currentCountryPopulation - randomNumber;
    let numberToString = num.toString().split('');

    let questionObject = {
        text: "What's the population of " + this.state.currentCountry + '?',
        a1: this.state.currentCountryPopulation, numberToString,
        a2: this.state.currentCountryPopulation - randomNumber,
        a3: this.state.currentCountryPopulation + randomNumber   
    }
    
    let allQuestions = this.state.questions;
    allQuestions.push(questionObject);
    
    this.setState({questions: allQuestions});
    console.log(this.state.questions)
}
      
render(){
return(

<div>
    <div>{this.state.currentCountry}</div>
    <div>{this.state.currentCountryPopulation}</div>
    <button onClick={this.simulateQuestions}></button>
    
</div>
)

}
}


ReactDOM.render(

<CountryComponent />, document.getElementById('app');

);



