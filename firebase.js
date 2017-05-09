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
    firebase.database().ref('/users/' + username).once('value').then(function(snapshot) {
      highScore.highScores = snapshot.val();
      highScore.printScores(highScore.highScores);
    });
  },
  printScores: function(list){
    let hsDiv = document.getElementById("highscores");
    let table = document.createElement("div");
    for ( let hs in list){
      let row = document.createElement("p");
      row.innerHTML = `${list[hs].date} ${list[hs].genre} ${list[hs].score}/${list[hs].maxScore}`;
      table.appendChild(row);
    }
    hsDiv.appendChild(table);
  }
}
