function getQuizData(updateSportsData) {
    var sportsQ = [];
       
   var sports =[
         {
            "name" : "Baseball",
            "pro_abbrev" : "MLB",
            "id" : "baseball"
         },
         {
            "name" : "Football",
            "pro_abbrev" : "NFL",
            "id" : "football"
         },
         {
            "name" : "Hockey",
            "pro_abbrev" : "NHL",
            "id" : "hockey"
         },
         {
            "name" : "Basketball",
            "pro_abbrev" : "NBA",
            "id" : "basketball"
         },
         {
            "name" : "College Football",
            "pro_abbrev" : "NCAAF",
            "id" : "collegefb"
         }
      ]
        
    for( let i=0; i <= sports.length-1; i++ ) {
        //  sport abbrev and id
        let s = sports[i].sport;
        let ab = sports[i].pro_abbrev[Math.floor(Math.random() * sports[i].pro_abbrev.length)];
        let ids = sports[i].id[Math.floor(Math.random() * sports[i].id.length)];
        let ids2 = sports[i].id[Math.floor(Math.random() * sports[i].id.length)];
        
        /*!!!!!!!!!!!!!AJAX!!!!!!!!!!!!!!!!!!!!!!!!!*/
        
        let url='http://api.cbssports.com/fantasy/sports?version=3.0';
        
        let ajax = new XMLHttpRequest();
        ajax.open('get',url);
        ajax.onreadystatechange = function() {
            if (ajax.status == 200 && ajax.readyState == 4) {

                let json =JSON.parse(ajax.responseText);

        console.log('json', json.response);
        sportsQ.push({
          s1: sports,
          s2: ab,
          s3: ids
                    });

updateSportsData(sportsQ);

            } else if (ajax.status != 200) {
                console.log('Status:   Error', status)
               
            }
        };
        ajax.send();
   console.log('skickas ajax call?', ajax)
        }
    console.log('händer något??')
        }
getQuizData();
