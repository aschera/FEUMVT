function getSportsFromFirebase(updateCountryData) {


    var questions = []; // empty array
    var i, category, fakeGame1, fakeGame2;

    //    made up array of sports data
    var sportsArray = [
        {
            category: 'caption',
            correct: ['Premier league', 'Primera division', 'Bundesliga', 'Eredivisie', 'Ligue 1', 'Serie A', 'European championship France 2016', 'Champions League', 'FA cup','Championship'],
            fake1: ['championship League', 'Segunda division', 'Bundesliga 2', 'League One', 'Ligue 2', 'Serie B', 'world championship', 'FC cup'],
            fake2: ['English League one', 'Spanish first division', 'Primera liga', 'Dutch cup1', 'First league', 'Euro cup', 'Winners League']
        },

        {
            category: 'numberOfGames',
            correct: ['51', '380', '306', '306', '380', '380', '156', '380' ],
            fake1: ['41', '280', '206', '225'],
            fake2: ['61', '180', '404', '324']
        },
        
        {
            category: 'numberOfTeams',
            correct: ['20', '24', '18', '32' ],
            fake1: ['41', '280', '206', '225'],
            fake2: ['61', '180', '404', '324']
        },


           ];

    //    looping the array
    category ='';
    for (i = 0; i <= sportsArray.length - 1; i++) {
    
        category = sportsArray[i].category;
        console.log('category ', category);
        game = sportsArray[i].correct[Math.floor(Math.random() * sportsArray[i].correct.length)];
        console.log('game', game)
        fakeGame1 = sportsArray[i].fake1[Math.floor(Math.random() * sportsArray[i].fake1.length)];
        fakeGame2 = sportsArray[i].fake2[Math.floor(Math.random() * sportsArray[i].fake2.length)];

        //  url  
        /*let url = "http://api.football-data.org/v1/competitions?key=8dbb2c34ce7341efb9c4527290a5fe4b";
        
        var myHeaders = new Headers();
        myHeaders.set({'X-Auth-Token': '8dbb2c34ce7341efb9c4527290a5fe4b'});*/
       /*!!!!!!!!!!!!!!!! REQUEST MAKES THE API FETCH WORK CORRECTLEY!!!!!!!!!!!!!*/
        
        
        var request = new Request("http://api.football-data.org/v1/competitions", {
            headers: new Headers({
                'X-Auth-Token': '8dbb2c34ce7341efb9c4527290a5fe4b'
            })
        });
        
        fetch(request)
            .then(function (response) {
                response.json().then(function (data) {
                    for (let object of data) {
                        console.log('object:', object)
                        let s = 'Whats the ' + category + ' in :"' + object.caption + '"' + '?';
                        console.log(s);
                        questions.push({
                            text: s,
                            a1: game,
                            a2: fakeGame1,
                            a3: fakeGame2
                        });

                    }
                    console.log("i:", i, "arraylength: ", sportsArray.length);
                    if (i === sportsArray.length - 1)
                        updateCountryData(questions);
                    console.log('updateCountryData1 ', questions);
                }).catch(function (error) {
                    console.log("Network error", error);
                });
            });

    }

}
getSportsFromFirebase();
