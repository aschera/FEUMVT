
class Books extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.apiRequest = this.apiRequest.bind(this);
  }
  apiRequest(){
    let s = "Harry";
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${s}`).then(function(response){
      response.json().then(function(object){
        console.log("Response:", object);
        console.log("First books desc:", object.items[0].volumeInfo.description);

      }).catch(function(error){
          console.log("Network Error:", error);
      });
    });
  }
  render(){
    return (
      <div>
        <p>Rendered by JSX</p>
        <button onClick={this.apiRequest}>Google API</button>
      </div>
    );
  }
}


        this.printQuestions = this.printQuestions.bind(this);


        this.state.questions.forEach(question =>{
          let sequence = this.randomizeAnswers();
          let html = (
            <div>
              <div className="questionText">{question.text}</div>
              <div className="answers">
                <button className={sequence[0]+"correct"}>{question.a1}</button>
                <button className={sequence[1]}>{question.a2}</button>
                <button className={sequence[2]}>{question.a3}</button>
            </div>);
          loopedQuestions.push(html);
        });
        this.state.questions.map(question =>
          <div>
            <div className="questionText">{question.text}</div>
            <div className="answers">
              <button className={sequence[0]+"correct"}>{question.a1}</button>
              <button className={sequence[1]}>{question.a2}</button>
              <button className={sequence[2]}>{question.a3}</button>
          </div>
        );



        while(second == first)
          second = this.getRandomInt(1, 3);
        while (third == first || third == second)
          third = this.getRandomInt(1, 3);
