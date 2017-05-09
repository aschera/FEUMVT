var sportQuestions=[];

var SportsArray =
           [
               {category: 'caption',
                items: ['Premier league', 'Primera division', 'Bundesliga', 'Eredivisie', 'Ligue 1','Serie A', 'European championship', 'Champions League'],
                fake1: ['championship' ,'Segunda division' ,'Bundesliga 2' , 'League One', 'Ligue 2', 'Serie B', 'world championship','FA cup'],
                fake2: ['English League one','Spanish first division','Primera liga','Dutch cup1','First league', 'Euro cup' ,'Winners League']},

               {category: 'Year',
                items: ['2016','2015'],
                fake1: ['2002' ,'1999' ,'2010', '2008', '1992', '1986', '2005'],
                fake2: ['2000', '1998', '2011', '2009', '1993','1987','2005']},

               {category: 'Teams',
                items: ['Manchster City', 'Barcelona', 'Juventus', 'Paris saint-germain', 'PSV Eindhoven','Malmö', 'FC porto', 'Zenit', 'FC Bayern München', 'Olympiacos'],
                fake1: ['Manchester United' ,'Valencia' ,'Roma' ,'Olympique Lyonnais', 'VfL Wolfsburg', 'IFK Göteborg', 'SL Benfica', 'CSKA Moskow'],
                fake2: ['Arsenal', 'Real Madrid', 'Milan', 'Galatasaray SK','Shakhtar Donetsk','FC kopenhagen','Bayer Leverkusen','Maccabi Tel Aviv', 'Bor. Mönchengladbach' ,'Sevilla' ,'Dynamo Kiev']},

               {category: 'Fixtures',
                items: ['Portugal VS France', 'Real Madrid VS Club Atlético de Madrid'],
                fake1: ['Germany VS France', 'Juventus VS Barcelona'  ],
                fake2: ['Portugal VS Spain', 'Real Madrid VS Byern Munich' ]},

               
           ];

var sports = {

    request: function() {
    let url = "http://api.football-data.org/v1/competitions/?key=5524a123b5a54565a7f6d6caf6b6ac4b"; 
    let key ="5524a123b5a54565a7f6d6caf6b6ac4b";
    fetch(url).then(function(response){
      response.json().then(function(object){
          console.log(object);
      }).catch(function(error){
          console.log("Network error");
      });
    });
}
    
}
sports.request();