class Login extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      userEmail: "n/a",
      loginText: "Not logged in"
    }
    this.logInGoogle = this.logInGoogle.bind(this);
    this.logOutUser = this.logOutUser.bind(this);
  }
  logOutUser() {
  	firebase.auth().signOut().then(function(result) {
      Login.setState({
        loginText: "Succesfully logged OUT"
      });
    }).catch(function(error) {
  	// Utloggning misslyckades
  	console.log("something went wrong!")
    });
    }
  logInGoogle() {
  	let providerG = new firebase.auth.GoogleAuthProvider();
  	firebase.auth().signInWithPopup(providerG).then(function(result) {
  	       //showUser.innerHTML=firebase.auth().currentUser.providerData[0].email;
       Login.setState({
         userEmail: firebase.auth().currentUser.providerData[0].email,
         loginText: "Succesfully logged in"
       });
       console.log(Login.state);
       console.log(firebase.auth().currentUser.providerData[0].email);
     });
  }
  render(){
    return (
      <div>
        <div id="show-container" className="main-container">
          <div className="row" id="leftDiv">
             <button  onClick={this.logInGoogle}>Login with Google</button>
          </div>
          <div className="row" id="rightDiv">
              <h2>Quizzaro</h2>
              <p>Answer a fun question or two while making number two!</p>
              <p>{this.state.loginText}</p>
          </div>
        </div>

        <div id="hide-container" className="main-container move">
           <div className="row" id="hide-left">
               <h4>Signed in as</h4>
               <p>{this.state.userEmail}</p>
               <button onClick={this.logOutUser}>Sign out</button>
               <h3>Your highscore</h3>

           </div>
           <div className="row" id="hide-right"></div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <Login />,
  document.getElementById('menu')
);
