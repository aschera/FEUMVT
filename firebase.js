// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyByJ54zZNLGuowWD7_DQsZ2_ip-5yLgoLw",
  authDomain: "fir-project-aae9d.firebaseapp.com",
  databaseURL: "https://fir-project-aae9d.firebaseio.com",
  projectId: "fir-project-aae9d",
  storageBucket: "fir-project-aae9d.appspot.com",
  messagingSenderId: "742947349969"
});

var highScore = {

  highScores: [],
  getHighScores: function(username){
    console.log(username);
    firebase.database().ref('/users/' + username).once('value').then(function(snapshot) {
      highScore.highScores = snapshot.val();
    });
    console.log(this.highScores);
  }
}