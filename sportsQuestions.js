function getSportsFromFirebase(updateCountryData){ 
    
    
var questions=[]; // empty array
var i, category, fakeGame1, fakeGame2;
       
      //    made up array of sports data
var sportsArray =
           [
               {category: 'Caption',
                items: ['Premier league', 'Primera division', 'Bundesliga', 'Eredivisie', 'Ligue 1','Serie A', 'European championship', 'Champions League','FA cup'],
                fake1: ['championship' ,'Segunda division' ,'Bundesliga 2' , 'League One', 'Ligue 2', 'Serie B', 'world championship','FC cup'],
                fake2: ['English League one','Spanish first division','Primera liga','Dutch cup1','First league', 'Euro cup' ,'Winners League']},

               {category: 'NumberOfTeams',
                items: ['24','20','32','18'],
                fake1: ['16' ,'12' ,'30', '14', '10', '22', '28'],
                fake2: ['40', '26', '16', '8', '13','34','29']},

               {category: 'NumberOfMatchDays',
                items: ['38', '38', '38', '38', '34','46', '62', '38'],
                fake1: ['28' ,'44' ,'36', '52'],
                fake2: ['18', '40', '26', '42','50','22','24']},

               {category: 'numberOfGames',
                items: ['51', '380','306','124'],
                fake1: ['41', '280','206','225'  ],
                fake2: ['61', '180','404', '324' ]},

               
           ];
    
    
  //    looping the array
  
    for(i=0; i <= sportsArray.length-1; i++) {
            console.log('for loop ', i)
    category = sportsArray[i].category;
            
    game = sportsArray[i].items[Math.floor(Math.random() * sportsArray[i].items.length)];
            
    fakeGame1 = sportsArray[i].fake1[Math.floor(Math.random() * sportsArray[i].fake1.length)];
    fakeGame2 = sportsArray[i].fake2[Math.floor(Math.random() * sportsArray[i].fake2.length)];
    
    //  url  
    let url = "http://api.football-data.org/v1/competitions?key=5524a123b5a54565a7f6d6caf6b6ac4b"; 
 
    
    
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
         console.log("i:", i, "arraylength: ", sportsArray.length);
        if (i === sportsArray.length-1)
            updateCountryData(questions); 
            console.log('updateCountryData1 ',updateCountryData);
    }).catch(function(error){
    console.log("Network error");
      });
    });  
          
}
  
}
getSportsFromFirebase();