function getSportsFromFirebase(updateCountryData){ 
    
    
var questions=[]; // empty array
       
      //    made up array of sports data
var sportsArray =
           [
               {category: 'Caption',
                items: ['Premier league', 'Primera division', 'Bundesliga', 'Eredivisie', 'Ligue 1','Serie A', 'European championship', 'Champions League'],
                fake1: ['championship' ,'Segunda division' ,'Bundesliga 2' , 'League One', 'Ligue 2', 'Serie B', 'world championship','FA cup'],
                fake2: ['English League one','Spanish first division','Primera liga','Dutch cup1','First league', 'Euro cup' ,'Winners League']},

               {category: 'NumberOfTeams',
                items: ['24','20','32','18'],
                fake1: ['16' ,'12' ,'30', '14', '10', '22', '28'],
                fake2: ['40', '26', '16', '8', '13','34','29']},

               {category: 'Teams',
                items: ['Manchster City', 'Barcelona', 'Juventus', 'Paris saint-germain', 'PSV Eindhoven','Malmö', 'FC porto', 'Zenit', 'FC Bayern München', 'Olympiacos'],
                fake1: ['Manchester United' ,'Valencia' ,'Roma' ,'Olympique Lyonnais', 'VfL Wolfsburg', 'IFK Göteborg', 'SL Benfica', 'CSKA Moskow'],
                fake2: ['Arsenal', 'Real Madrid', 'Milan', 'Galatasaray SK','Shakhtar Donetsk','FC kopenhagen','Bayer Leverkusen','Maccabi Tel Aviv', 'Bor. Mönchengladbach' ,'Sevilla' ,'Dynamo Kiev']},

               {category: 'numberOfGames',
                items: ['51', '380','306'],
                fake1: ['41', '280','206'  ],
                fake2: ['61', '180','404' ]},

               
           ];
    
    
  //    looping the array
  
    for(let i=0; i <= sportsArray.length-1; i++) {
            console.log('for loop ', i)
    let category =sportsArray[i].category;
            
    let game = sportsArray[i].items[Math.floor(Math.random() * sportsArray[i].items.length)];
            
    let fakeGame1= sportsArray[i].fake1[Math.floor(Math.random() * sportsArray[i].fake1.length)];
    let fakeGame2= sportsArray[i].fake2[Math.floor(Math.random() * sportsArray[i].fake2.length)];
    
    //  url  
    let url = "http://api.football-data.org/v1/competitions?key=5524a123b5a54565a7f6d6caf6b6ac4b"; 
 
    
     console.log('before fetch');
    fetch(url)
    .then(function(response){
     response.json().then(function(object){
     console.log('json object', object);
     
    let s ='where can you find ' + category +':"' + object.caption[0] + '"' + '?';
      
    
    questions.push({
      text: s,
      a1: game,
      a2: fakeGame1,
      a3: fakeGame2
    });
         
    updateCountryData(questions);
         
      })
    .catch(function(error){
    console.log("Network error");
      });
        
    });  
        
    
}
  
  console.log('updateCountryData',updateCountryData);
 
}
getSportsFromFirebase();
console.log('last in line')