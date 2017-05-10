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
  getHighScores: function(username){    // Change to only get the top 10/5 scores
    firebase.database().ref('/users/' + username).once('value').then(function(snapshot) {
      highScore.highScores = snapshot.val();
      highScore.printScores(highScore.highScores);
    });
  },
  printScores: function(list){
    let hsDiv = document.getElementById("highscores");
    hsDiv.innerHTML = "";
    let table = document.createElement("td");
    let hrow = document.createElement("tr");
    let date = document.createElement("th");
    let genre = document.createElement("th");
    let score = document.createElement("th");

    date.addEventListener("click", highScore.sortTable(0));
    genre.onclick = highScore.sortTable(1);
    score.onclick = highScore.sortTable(2);

    date.innerHTML = "Date";
    genre.innerHTML = "Genre";
    score.innerHTML = "Score";

    hrow.appendChild(date);
    hrow.appendChild(genre);
    hrow.appendChild(score);
    table.appendChild(hrow);

    for ( let hs in list){
      let row = document.createElement("tr");
      let td1 = document.createElement("td");
      let td2 = document.createElement("td");
      let td3 = document.createElement("td");

      td1.innerHTML = list[hs].date;
      td2.innerHTML = list[hs].genre;
      td3.innerHTML = `${list[hs].score}/${list[hs].max}`;

      row.appendChild(td1);
      row.appendChild(td2);
      row.appendChild(td3);
      table.appendChild(row);
    }
    hsDiv.appendChild(table);
  },
  sortTable: function(column){
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("highscores");
    switching = true;
    dir = "asc";
    while (switching) {
      switching = false;
      rows = table.getElementsByTagName("TR");
      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            shouldSwitch= true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            shouldSwitch= true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        switchcount ++;
      } else {
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }
}
