class App extends React.Component {
	constructor(props) {
		super(props);
			this.state = {
					selected: '',
					questions: [{
							text: "",
							a1: "",
							a2: "",
							a3: ""
					}],
					loggedIn: false,
					userEmail: "",
					loginClass: "show",
					loggedInClass: "hide",
					highScores: []
			};
				this.changeEntry = this.changeEntry.bind(this);
				this.changeLogin = this.changeLogin.bind(this);
				this.updateMail = this.updateMail.bind(this);
				this.newHighScore = this.newHighScore.bind(this);
			}
			render(){
                if(this.state.loggedIn === true) {
                    if(this.state.selected === '') {
                        return (
                            <div>
                                <Login
																	changeLogin = {this.changeLogin}
																	updateMail = {this.updateMail}
																	loginClass = {this.state.loginClass}
																	loggedInClass = {this.state.loggedInClass}
																	userEmail = {this.state.userEmail}/>

                                <MyList
																	items= {this.state.questions}
																	changeEntry = {this.changeEntry}/>
                            </div>
                            )
                    }// end if: something is selected
                    else {

                        return (
                            <div>
                              <Login
																changeLogin = {this.changeLogin}
																updateMail = {this.updateMail}
																loginClass = {this.state.loginClass}
																loggedInClass = {this.state.loggedInClass}
																userEmail = {this.state.userEmail}/>/>

                                      <div id="flex-container">
                                          <div id="flex-itemX">
                                              <div id="logo">
                                                  <img src="resources/logo_new.png" id="img"></img>
                                              </div>
                                              <h5>Category: {this.state.selected}</h5>
                                                      <Quizz
																												changeLogin = {this.changeLogin}
																												items= {this.state.questions}
																												changeEntry = {this.changeEntry}
																												userEmail = {this.state.userEmail}
																												chosenCategory = {this.state.selected}/>
                                          </div>
                                      </div>

                            </div>
                            )
                    } // end else: nothing selected
                }// end logged in:test
                else {
                    return (
                            <div>
                                <Login
																	changeLogin = {this.changeLogin}
																	updateMail = {this.updateMail}
																	loginClass = {this.state.loginClass}
																	loggedInClass = {this.state.loggedInClass}
																	userEmail = {this.state.userEmail}/>

                                    <div id="flex-container">
                                        <div id="flex-itemX">

                                                <div id="logo">
                                                <img src="resources/logo_new.png" id="img"></img>
                                                </div>

                                            <p>
                                                <br /><br /><br />
                                                The QuiZZaro is designed to be very difficult. <br />
                                                It will test your knowledge of a wide variety of information.<br />
                                                It is a true test of your intelligence and the ultimate quiz to determine who the smartest person is.<br />
                                                Nobody has ever gotten all 10 questions correct.</p>
                                        </div>
                                    </div>
                            </div>

                            )
                }
			}//end render

 /* ------------------Get new set of questions------------------------------------------- */
	changeEntry(x,y) {
		this.setState({
			questions: x,
			selected: y
			});
		}

 /* ------------------Get new set of questions------------------------------------------- */
	changeLogin(x) {
		if (x == true){
			this.setState({
				loggedIn: true,
				loginClass: "hide",
				loggedInClass: "show"
			});
		}
		else {
			this.setState({
				loggedIn: false,
				loginClass: "show",
				loggedInClass: "hide"
			});
		}
	}
	/* ---------------------------------------------------------------------------------------- */

	updateMail(mail){
		this.setState({
			userEmail: mail
		});
	}
	newHighScore(){
		let user = this.state.userEmail.replace(/[^a-z0-9]/gi,'');
		firebase.database().ref('/users/' + user).once('value').then(function(snapshot) {
			var highScores = snapshot.val();
			this.setState({
				highScores: highScores
			});
		});
		console.log("This state: ", this.state);
	}
	componentDidMount(){
		console.log("App mounted");
		console.log("localStorage: ", localStorage.getItem("name"));
		if (localStorage.getItem("name") != "null" && localStorage.getItem("name") != null){
			this.setState({
				loggedIn: true,
				loginClass: "hide",
				loggedInClass: "show",
				userEmail: localStorage.getItem("name")
			});
		}
	}
}

/* ---------------------------------------------------------------------------------------- */
/* -------------------------THE Quiz COMPONENT---------------------------------------------- */
/* ---------------------------------------------------------------------------------------- */
class Quizz extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			rightAnswers: 0,
			questions: []
		}
		this.points = 0;
		this.maxScore = 5;
		this.randomizeAnswers = this.randomizeAnswers.bind(this);
		this.printQuestions = this.printQuestions.bind(this);
		this.getRandomInt = this.getRandomInt.bind(this);
		this.clickAnswer = this.clickAnswer.bind(this);
		this.clickAnswerCorrect = this.clickAnswerCorrect.bind(this);
		this.gameFinished = this.gameFinished.bind(this);
		this.saveDate = this.saveDate.bind(this);
	}
	saveDate(){
		let c = new Date();
		let m = c.getMonth()+1;
		if (Number(m) < 10) m = "0"+m;
		let d = c.getDate();
		if (Number(d) < 10) d = "0"+d;
		return `${c.getFullYear()}-${m}-${d}`
	}
	// Returnerar ett slumpat heltal f.o.m. min till max (kan ej returnera max)
	getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min;
	}
	// Returnerar en array med tre klasser för svarsfrågor
	randomizeAnswers(){
		let first = this.getRandomInt(1, 4);
		let second = this.getRandomInt(1, 4);
		let third = this.getRandomInt(1, 4);
		while(second == first)
			second = this.getRandomInt(1, 4);
		while (third == first || third == second)
			third = this.getRandomInt(1, 4);

		return [`a${first} `,`a${second} `,`a${third} `];
	}
	clickAnswerCorrect(event){
		this.points++;
		this.clickAnswer(event);
	}
	clickAnswer(event){
		// Save all questions and convert from HTML collection to array
		let allQuestions = Array.prototype.slice.call(document.getElementsByClassName("question"));
		let clickedQuestion = event.target.parentNode.parentNode;
		allQuestions.map(question =>{
			if (Number(question.id) === (Number(clickedQuestion.id) + 1))
				question.className = "question show";
			else
				question.className = "question hide";
		});
		// 10 questions, change to variable if want to change nr of questions.
		if (clickedQuestion.id == this.maxScore) {
			this.gameFinished();
		}
	}
	gameFinished(){
		this.setState({
			rightAnswers: this.points
		});
		let allQuestions = Array.prototype.slice.call(document.getElementsByClassName("question"));
		allQuestions.map(question =>{
			question.className = "question hide";
		});
		// SEND HIGHSCORE TO DATABASE
		let editedMail =   this.props.userEmail.replace(/[^a-z0-9]/gi,'');
		let today = this.saveDate();
		firebase.database().ref(`users/${editedMail}/`).push({
	    genre: this.props.chosenCategory,
			score: this.points,
			max: this.maxScore,
			date:	today
	  });

		let hsList = highScore.getHighScores(editedMail);
		console.log("hsList: ", hsList);

		document.getElementById("results").className = "results show";

        var done = this.props.changeEntry('','');

	    setTimeout( done, 5000 );



	}
	// Loopar igenom this.state.questions och gör om varje object till html
	printQuestions(){
		let loopedQuestions = [];
		let key = 0;
		this.props.items.forEach(question =>{
			let qClass = "question hide";
			if (key === 0)
				qClass = "question show";
			let sequence = this.randomizeAnswers();
			let html = (
                  <div key={key++} className={qClass} id={key}>
                      <div className="questionText">{question.text}</div>
                      <div className="answers">
                          <button onClick={this.clickAnswerCorrect} className={sequence[0]}>{question.a1}</button>
                          <button onClick={this.clickAnswer} className={sequence[1]}>{question.a2}</button>
                          <button onClick={this.clickAnswer} className={sequence[2]}>{question.a3}</button>
                      </div>
                  </div>
                	);
			loopedQuestions.push(html);
		});
		return loopedQuestions;

	}
	render(){
		return (
			<div>
				<div className="allquestions">{this.printQuestions()}</div>
				<div id="results" className="results hide">
					<h2>Congratulations!</h2>
					<h3>You answered {this.state.rightAnswers} out of {this.maxScore}</h3>
				</div>
			</div>
		);
	}
}


/* ---------------------------------------------------------------------------------------- */
/* ---------------------------------THE LOGIN COMPONENT------------------------------------ */
/* ---------------------------------------------------------------------------------------- */
var mail;

var divStyle = {
  width: "5px",
};

class Login extends React.Component{
  constructor(props) {
    super(props);
		this.state = {
			width: "200px"
		};
    this.logInGoogle = this.logInGoogle.bind(this);
    this.logOutUser = this.logOutUser.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.Close = this.Close.bind(this);
    this.updateUserData = this.updateUserData.bind(this);
    this.component = this.component.bind(this);
  }
  logOutUser() {
  	firebase.auth().signOut().then(function(result) {
    }).catch(function(error) {
  	// Utloggning misslyckades
  	console.log("Logout Failed")
    });

		this.props.changeLogin(false);
		this.props.updateMail("");
		localStorage.setItem("name", null);
  }
  logInGoogle(updateUserData) {
    let providerG = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(providerG).then(function(result) {
      let user = result.user;
      updateUserData(user.email);
      localStorage.setItem("name", user.email);

      return user.email;
    });
  }

    // New stuff below.
  component() {
      this.logInGoogle(this.updateUserData);
      this.props.changeLogin(true);
	}
  updateUserData(data) {
		this.props.changeLogin(true);
    this.props.updateMail(data);
		}

handleClick() {
    this.setState({
  width: "200px"
})
};

Close() {
    this.setState({
  width: "0px"
})
};

  render(){

    return (
        <div>
<div id="mySidenav" style={{width:this.state.width}} className="sidenav">
  <button className="closebtn" id="close" onClick={this.Close}></button>
    <div id="main">
      <div id="menu">
        <div className={this.props.loginClass} >
            <div id="gSignInWrapper">
            <div id="customBtn" onClick= {this.component} >
              <span className="icon"></span>
              <span className="buttonText">Login</span>
            </div>
          </div>

        </div>

        <div id="menuLoggedIn" className={this.props.loggedInClass}>

        <div id="gSignInWrapper">
            <div id="customBtn1" onClick={this.logOutUser} >
              <span className="icon"></span>
              <span className="buttonText1">Logout</span>
            </div>
          </div>

               <h4>Signed in as:</h4>
                <p id="username">{this.props.userEmail}</p>

               <h3>Your highscore</h3>
							 <span>Date</span>
							 <span>Genre</span>
							 <span>Score</span>
        </div>
</div>
      </div>
</div>
<button id="open" className="closebtn" onClick={this.handleClick}></button>
</div>
    )
  }
}

/* ---------------------------------------------------------------------------------------- */
/* -------------------------THE CATEGORY LIST COMPONENT------------------------------------ */
/* ---------------------------------------------------------------------------------------- */

/*ALL the categories */
const list = ['Culture', 'Sports', 'Movies', 'Celebrities', 'World', 'Language'];



class MyList extends React.Component {

 constructor(props) {
			super(props);

			this.handleChooseCategory = this.handleChooseCategory.bind(this);
			this.updateCountryData = this.updateCountryData.bind(this);

			this.state = {
				selected:'',
				questions: []
			}
		}
/* ---------------------Click event---------------------------------------- */
handleChooseCategory(event) {

		let theOne = event.target.id;

		let x;

		if( this.state.selected ) {
				x = false;


			} else {
				x = true;

                if (event.target.id === 'Culture'){
                   console.log(event.target.id);
                   getDataFromFirebase(this.updateCountryData);
                }

								/*
                else if(event.target.id === 'Movies'){
                    console.log(event.target.id);
                    console.log('returns a bad format!');
                    getMovieFromFirebase(this.updateCountryData);
                }
                else if(event.target.id === 'World'){
                    console.log(event.target.id);
                    console.log('returns a bad format!');
                    getWorldFromFirebase(this.updateCountryData);
                }
								*/

			}
			this.setState({
				selected: theOne
			});

		}

/* ---------------------API event---------------------------------------- */
	updateCountryData(data) {
		let category = this.state.selected;

		this.props.changeEntry(data,category);
		this.setState({
				questions: data
			});
}
 /* --------------------------render----------------------------------- */

	render() {

var partial;


const newlist = list.map(

        x => ( <li onClick={this.handleChooseCategory} id={x} className="flex-item" key={x}>{x}</li> )
    );

        return (
          <div>
            <div id="inner-flex-container">
                <header>
                        <div id="logo">
                            <img src="resources/logo_new.png" id="img"></img>
                        </div>
                </header>
                <h1>Categories</h1>
                <ul className="flex-container">{newlist}</ul>
            </div>
          </div>
        );
      }
	}


/* ------------------------------------------------------------- */
/* -.-.-.-.-.-.-.-.-.-.-.-.-.-. REACT DOM -.-.-.-.-.-.-.-.-.-.-. */
/* ------------------------------------------------------------- */
	ReactDOM.render(
		<App />,
		document.getElementById('root')
	);
