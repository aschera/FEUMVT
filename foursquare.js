function getDataFromFirebase(updateCountryData) {

var questions = [];

       var allTheGoods =
           [
               {category: 'Opera house',
                items: ['Venice', 'London', 'Rome', 'Tallinn', 'São Paulo','Mexico City' ,'New York City', 'Ankara', 'Los Angeles'],
                fake1: ['Dhaka' ,'Delhi' ,'Lagos' ,'Istanbul' ,'Shanghai', 'Amsterdam', 'London', 'Stockholm', 'Buenos Aires','Jakarta'],
                fake2: ['Tokyo','Guangzhou','Mumbai','Moscow','Lahore', 'Karachi' ,'Beijing']},

               {category: 'University',
                items: ['Amsterdam','Bern','Frankfurt','Guangzhou','Florence','Malmö','Tokyo'],
                fake1: ['Lagos' ,'Istanbul' ,'Shanghai','London', 'Stockholm', 'Buenos Aires'],
                fake2: ['Mumbai', 'Florence', 'Malmö','Moscow','Lahore', 'Karachi' ,'Beijing' ,'Dhaka' ,'Delhi']},

               {category: 'Museum',
                items: ['London', 'New York', 'Tallinn', 'Venice', 'Stockholm','Malmö', 'Frankfurt', 'Florence', 'Lisbon', 'Brussels'],
                fake1: ['Delhi' ,'Lagos' ,'Istanbul' ,'Shanghai', 'Amsterdam', 'London', 'Stockholm', 'Buenos Aires'],
                fake2: ['Cairo', 'Mumbai','Tokyo','Guangzhou','Moscow','Lahore', 'Karachi' ,'Beijing' ,'Dhaka']},

               {category: 'Historic Site',
                items: ['Rome', 'Stockholm','New York', 'Washington','Brussels','Shanghai','Istanbul' ],
                fake1: ['Mumbai', 'Frankfurt', 'Berlin', 'Copenhagen','Cairo' ],
                fake2: ['Lisbon', 'Brussels', 'Malmo', 'Florence', 'Delhi']},

               {category: 'Theatre',
                items: ['London', 'New York', 'Stockholm', 'Amsterdam','Rome', 'Brussels', 'Cairo', 'Washington', 'Venice','Istanbul','Lagos','Shanghai'],
                fake1: ['Lisbon','São Paulo','Mexico City','Buenos Aires','Florence'],
                fake2: ['Tallin', 'Los Angeles','Ankara', 'Frankfurt','Malmö']},
               
               {category: 'Cathedral',
                items: ['Stockholm','New York','Florence','Brussels','Frankfurt','Lisbon','Tallinn','Guangzhou','Moscow','Beijing','Cairo'],
                fake1: ['Paris','London','Istanbul','Rome','Shanghai','Mexico City', 'Mumbai','Amsterdam'],
                fake2: ['Malmö','Venice','Washington','São Paulo','Buenos Aires','Karachi','Dhaka','Tokyo' ]},
               
               {category: 'Memorial',
                items: ['Stockholm','Tallinn','New York','Beijing','London','Los Angeles','São Paulo'],
                fake1: ['Florence','Brussels','Cairo','Guangzhou','Rome'],
                fake2: ['Lisbon','Frankfurt','Moscow','Ankara','Venice']},
               
               {category: 'Arena',
                items: ['Brussels', 'Washington','Venice', 'Oslo'],
                fake1: ['Shanghai','Cairo','Amsterdam'],
                fake2: ['London','Lagos','Istanbul','Stockholm']},
               
               {category: 'Church',
                items: ['Tallinn','Los Angeles','London','Venice','New York City','Delhi','Istanbul','London','Lagos','Amsterdam','Stockholm','Shanghai','Mumbai','Beijing','Moscow','Florence','Bern','Brussels','Copenhagen'],
                fake1: ['São Paulo','Rome','Dhaka','Buenos Aires','Karachi','Frankfurt','Malmö'],
                fake2: ['Mexico City','Ankara','Jakarta','Lahore','Tokyo','Guangzhou','Berlin']},
               
               {category: 'Statue',
                items: ['Copenhagen','Berlin','London','Tallinn','Los Angeles','New York City','Venice','Stockholm','Amsterdam','Jakarta','Shanghai','Paris','Florence'],
                fake1: ['Ankara','Mexico City','Dhaka','Istanbul','Delhi','Rio de Janeiro' ],
                fake2: ['Rome','São Paulo','Lagos','Buenos Aires','Volgograd']},
 
           ];

/* --------------------------------------Data to change every cycle-------------------------------------------- */

        for (let i=0; i <= allTheGoods.length-1; i++){


            // category
            let category = allTheGoods[i].category;

            // city
            let city = allTheGoods[i].items[Math.floor(Math.random() * allTheGoods[i].items.length)];

            // fake
            let fakecity1 = allTheGoods[i].fake1[Math.floor(Math.random() * allTheGoods[i].fake1.length)];
            let fakecity2 = allTheGoods[i].fake2[Math.floor(Math.random() * allTheGoods[i].fake2.length)];

/* --------------------------------Ajax URL------------------------------------------------------- */

        let url = 'https://api.foursquare.com/v2/venues/search?';

        //swarm
        url +=  'm=swarm&';

        //date
        url += 'v=' + '20170429&';

        //limit 5
        url += 'limit=' + 20 + '&';

        // near city
        url += 'near=' + city + '&';
        // #1London, Stockholm, New York,Amsterdam,Rome,Tallinn,Venice (opera)
        // Amsterdam, (university)
        // Bucharest(theme park)

        //radius
        let radius = 1000;
        url += 'radius=' + radius + '&';

        //what
        let categoryId = category + '&'; // coffe,game,museum works.
        url += 'query=' + categoryId;

        //identification
        url += 'client_id=RHPTHZQRVD1O3M0AX3SREE4QJWLPPAEIFJAOGZHTTWT12A4W&client_secret=U4SDRN4NDPX3EZSXSIK44ZZCWIT01FGS54PE3EGF2VSYD53X';

/* ----------------------------------AJAX call------------------------------------------------------ */

        // AJAX request Foursquare
        let ajax = new XMLHttpRequest();
        ajax.open('get', url);
        ajax.onreadystatechange = function() {

            if (ajax.status == 200 && ajax.readyState == 4) {

                // AJAX success
                let json = JSON.parse(ajax.responseText);

    // question object#1 to send toreact-main component:
    let n = 'Where can you find the ' + category + ': "' + json.response.venues[0].name + '"' + '?';
 
        // add to array
        questions.push({
          text: n,
          a1: city,
          a2: fakecity1,
          a3: fakecity2
                    });

updateCountryData(questions);

            } else if (ajax.status != 200) {
                status.innerHTML = 'Status:   Error';
            }
        };
        ajax.send();


} // end for-loop



} // end function call
