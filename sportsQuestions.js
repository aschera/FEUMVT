function getQuizData(updateSportsData) {
    var sportsQ = [];
       
   var sports = [
               {sport: 'Baseball',
                abbrev: 'MLB',
                id: 'baseball'},
               {sport: 'footbal',
                abbrev: 'NFL',
                id: 'football'},
               {sport: 'Hockey',
                abbrev: 'NHL',
                id: 'hockey'},
               {sport: 'collage football',
                abbrev: 'NCAAF',
                id: 'collagefb'},
    ];
        
    for(let i=0; i<sports.length-1; i++) {
        //  sport abbrev and id
        let s = sports[i].sport;
        let ab = sports[i].abbrev[Math.floor(Math.random() * allTheGoods[i].abbrev.length)];
        let ids = sports[i].id[Math.floor(Math.random() * allTheGoods[i].id.length)];
        let ids2 = sports[i].id[Math.floor(Math.random() * allTheGoods[i].id.length)];
        
        /*!!!!!!!!!!!!!AJAX!!!!!!!!!!!!!!!!!!!!!!!!!*/
        
        let url='http://api.cbssports.com/fantasy/sports?version=3.0';
        
        let ajax = new XMLHttpRequest();
        ajax.open('get',url);
        ajax.onreadystatechange = function() {
            if (ajax.status == 200 && ajax.readyState == 4) {

                let json = JSON.parse(ajax.responseText);

    // question object#1 to send toreact-main component:
    

        // add to array
        sportsQ.push({
          s1: sports,
          s2: ids,
          s3: ids2
                    });

updateSportsData(sportsQ);

            } else if (ajax.status != 200) {
                console.log('Status:   Error', status)
                status.innerHTML = 'Status:   Error';
            }
        };
        ajax.send();
   console.log('skickas ajax call?', ajax)
        }
    console.log('händer något??')
        }
console.log('tajallalallala'+ getQuizData)
getQuizData();