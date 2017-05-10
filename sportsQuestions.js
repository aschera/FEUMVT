function getSportsdata() { 
var sportQuestions=[];

var SportsArray =
           [
               {category: 'Caption',
                items: ['Premier league', 'Primera division', 'Bundesliga', 'Eredivisie', 'Ligue 1','Serie A', 'European championship', 'Champions League'],
                fake1: ['championship' ,'Segunda division' ,'Bundesliga 2' , 'League One', 'Ligue 2', 'Serie B', 'world championship','FA cup'],
                fake2: ['English League one','Spanish first division','Primera liga','Dutch cup1','First league', 'Euro cup' ,'Winners League']},

               {category: 'Number of teams',
                items: ['24','20','32'],
                fake1: ['16' ,'12' ,'30', '14', '10', '22', '28'],
                fake2: ['40', '26', '16', '8', '13','34','29']},

               {category: 'Teams',
                items: ['Manchster City', 'Barcelona', 'Juventus', 'Paris saint-germain', 'PSV Eindhoven','Malmö', 'FC porto', 'Zenit', 'FC Bayern München', 'Olympiacos'],
                fake1: ['Manchester United' ,'Valencia' ,'Roma' ,'Olympique Lyonnais', 'VfL Wolfsburg', 'IFK Göteborg', 'SL Benfica', 'CSKA Moskow'],
                fake2: ['Arsenal', 'Real Madrid', 'Milan', 'Galatasaray SK','Shakhtar Donetsk','FC kopenhagen','Bayer Leverkusen','Maccabi Tel Aviv', 'Bor. Mönchengladbach' ,'Sevilla' ,'Dynamo Kiev']},

               {category: 'Fixtures',
                items: ['Portugal VS France', 'Real Madrid VS Club Atlético de Madrid'],
                fake1: ['Germany VS France', 'Juventus VS Barcelona'  ],
                fake2: ['Portugal VS Spain', 'Real Madrid VS Byern Munich' ]},

               
           ];

    for(let i=0; i <= SportsArray-1; i++) {
        let category =SportsArray[i].category;
        let game =SportsArray[i].items[Math.floor(Math.random() * SportsArray[i].items.length)];
        let fakeGame1=SportsArray[i].fake1[Math.floor(Math.random() * SportsArray[i].fake1.length)];
        let fakeGame2=SportsArray[i].fake2[Math.floor(Math.random() * SportsArray[i].fake2.length)];
    }

var sports = {

    request: function() {
    let competitions = "http://api.football-data.org/v1/competitions/?season=2016"; 
    let teams ="http://api.football-data.org/v1/competitions/405/teams/";
    let fix ="http://api.football-data.org/v1/fixtures";
    var myHeaders = new Headers();
    myHeaders.append("X-Auth-Token", "5524a123b5a54565a7f6d6caf6b6ac4b")
    fetch(competitions)
    .then(function(response){
     response.json().then(function(object){
     console.log(object);
     console.log('valid key ?', myHeaders);
     return response.json();   
      })
    .catch(function(error){
    console.log("Network error");
      });
    });
}
    
}
sports.request();
    
}