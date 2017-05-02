var mail;
class Login extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      userEmail: "n/a",
      loginText: "Not logged in",
      loginClass: "show",
      loggedInClass: "hide"
    }
    this.logInGoogle = this.logInGoogle.bind(this);
    this.logOutUser = this.logOutUser.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
  }
  updateEmail(mail){
    console.log("Mail", mail);
    this.setState({
      userEmail: mail,
      loginText: "Succesfully logged in"
      loginClass: "hide",
      loggedInClass: "show",
    });
  }
  logOutUser() {
  	firebase.auth().signOut().then(function(result) {
    }).catch(function(error) {
  	// Utloggning misslyckades
  	console.log("something went wrong!")
    });
    this.setState({
      loginClass: "show",
      loggedInClass: "hide",
      loginText: "Succesfully logged OUT"
    });
  }
  logInGoogle() {
    let providerG = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(providerG).then(function(result) {
      return firebase.auth().currentUser.providerData[0].email;
    }).then(this.updateEmail(mail)); // Funkar ej, mail = undefined
  }          // CHRISTNA (COMPONANT DID MOUNT)
  render(){
    return (
      <div>
        <div id="menuLogin" className={this.state.loginClass}>
          <button onClick={this.logInGoogle}>Login with Google</button>
          <p>{this.state.loginText}</p>
        </div>

        <div id="menuLoggedIn" className={this.state.loggedInClass}>
               <h4>Signed in as:</h4>
               <p>{this.state.userEmail}</p>
               <button onClick={this.logOutUser}>Sign out</button>
               <h3>Your highscore</h3>
        </div>

      </div>
    )
  }
}

ReactDOM.render(
  <Login />,
  document.getElementById('menu')
);
