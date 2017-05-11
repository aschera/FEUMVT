function getSportsFromFirebase(updateCountryData) {


    var questions = []; // empty array
    var i, category, game, fake1, fake2;

    //    made up array of sports data
    var sportsArray = [
        {
            category: 'numberOfTeams',
            correct: [ '24', '18', '20', '20', '20', '18', '32'],
            fake1: [ '22', '16', '28', '34', '25'],
            fake2: [ '19', '31', '26', '17', '']
        },


           ];

    //    looping the array
    
    for (i = 0; i <= sportsArray.length - 1; i++) {
        category = sportsArray[i].category;
        
        game = sportsArray[i].correct[Math.floor(Math.random() * sportsArray[i].correct.length)];
        
        fake1 = sportsArray[i].fake1[Math.floor(Math.random() * sportsArray[i].fake1.length)];
        fake2 = sportsArray[i].fake2[Math.floor(Math.random() * sportsArray[i].fake2.length)];

        
        
       /*!!!!!!!!!!!!!!!! REQUEST MAKES THE API FETCH WORK CORRECTLEY!!!!!!!!!!!!!*/
        var url ="http://api.football-data.org/v1";
        url +='/competitions/';
        
        /*let categoryId= category;
        url += categoryId;*/
        
        var request = new Request(url, {
            headers: new Headers({
                'X-Auth-Token': '8dbb2c34ce7341efb9c4527290a5fe4b'
            })
        });
        
        fetch(request)
            .then(function (response) {
                response.json().then(function (data) {
                    for (let object of data) {
                       console.log(object)
                        let s = 'Whats the ' + category + ' of :"' + object.caption + '"' + '?';
                        console.log(s);
                        questions.push({
                            text: s,
                            a1: game,
                            a2: fake1,
                            a3: fake2
                        });
                      
                        
                    }
                        console.log("i:", i, "arraylength: ", sportsArray.length);
                     if( i === sportsArray.length ) {
                        updateCountryData(questions);
                        console.log('updateCountryData1 ', questions);
                     }
                }).catch(function (error) {
                    console.log("Network error", error);
                });
            });

    }

}
getSportsFromFirebase();
