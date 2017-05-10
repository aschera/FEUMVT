// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyByJ54zZNLGuowWD7_DQsZ2_ip-5yLgoLw",
  authDomain: "fir-project-aae9d.firebaseapp.com",
  databaseURL: "https://fir-project-aae9d.firebaseio.com",
  projectId: "fir-project-aae9d",
  storageBucket: "fir-project-aae9d.appspot.com",
  messagingSenderId: "742947349969"
});

var hs = {
  filter: "all",
  user: "",
  saveDate: function(){
    let c = new Date();
    let m = c.getMonth()+1;
    if (Number(m) < 10) m = "0"+m;
    let d = c.getDate();
    if (Number(d) < 10) d = "0"+d;
    return `${c.getFullYear()}-${m}-${d}`
  },
  newHighScore: function(u, g, s, m){
    firebase.database().ref(`users/${hs.convertName(u)}/`).push({
      genre: g,
      score: s,
      max: m,
      date:	hs.saveDate()
    });
  },
  convertName: function(mail){
    return mail.replace(/[^a-z0-9]/gi,'')
  },
  getHighScores: function(username){    // Change to only get the top 10/5 scores
    firebase.database().ref('/users/' + hs.convertName(username)).once('value').then(function(snapshot) {
      hs.printScores(snapshot.val());
    });
  },
  showAll: function(){
    console.log(hs.user);
    hs.filter = "all";
    hs.getHighScores(hs.convertName(hs.user));
  },
  showCulture: function(){
    hs.filter = "culture";
    hs.getHighScores(hs.convertName(hs.user));
  },
  showMovies: function(){
    hs.filter = "movies";
    hs.getHighScores(hs.convertName(hs.user));
  },
  filterList: function(list){
    let array = [];
    for ( let hi in list){
      array.push(list[hi]);
    }
    let sortedList = array.sort(function(a, b) {
      return a - b;
    });
    sortedList.reverse();
    let topList = sortedList.slice(0, 9);
    if (hs.filter == "culture"){
      return topList.filter(function(highscore){
        return highscore.genre == "Culture";
      });
    }
    else if (hs.filter == "sports"){
      return topList.filter(function(highscore){
        return highscore.genre == "Sports";
      });
    }
    else if (hs.filter == "movies"){
      return topList.filter(function(highscore){
        return highscore.genre == "Movies";
      });
    }
    else return topList;
  },
  printScores: function(list){
    let hsDiv = document.getElementById("highscores");
    hsDiv.innerHTML = "";
    let table = document.createElement("td");
    let hrow = document.createElement("tr");
    let date = document.createElement("th");
    let genre = document.createElement("th");
    let score = document.createElement("th");

    date.innerHTML = "Date";
    genre.innerHTML = "Genre";
    score.innerHTML = "Score";

    date.addEventListener("click", function(){hs.sortTable(0);});
    genre.addEventListener("click", function(){hs.sortTable(1);});
    score.addEventListener("click", function(){hs.sortTable(2);});

    hrow.appendChild(date);
    hrow.appendChild(genre);
    hrow.appendChild(score);
    table.appendChild(hrow);

    let filteredList = hs.filterList(list);
    filteredList.forEach(hi =>{
      let row = document.createElement("tr");
      let td1 = document.createElement("td");
      let td2 = document.createElement("td");
      let td3 = document.createElement("td");

      td1.innerHTML = hi.date;
      td2.innerHTML = hi.genre;
      td3.innerHTML = `${hi.score}/${hi.max}`;

      row.appendChild(td1);
      row.appendChild(td2);
      row.appendChild(td3);
      table.appendChild(row);
    });
    hsDiv.appendChild(table);
  },
  sortTable: function(n){
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
