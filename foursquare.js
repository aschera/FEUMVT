function getDataFromFirebase(updateCountryData) {

var questions = [];

       var allTheGoods =
           [
               {category: 'Opera house',
                items: ['Venice', 'London', 'Rome', 'Tallinn', 'São Paulo','Mexico City' ,'New York City', 'Ankara', 'Los Angeles'],
                fake1: ['Dhaka' ,'Delhi' ,'Lagos' ,'Istanbul' ,'Shanghai', 'Amsterdam', 'London', 'Stockholm', 'Buenos Aires','Jakarta'],
                fake2: ['Tokyo','Guangzhou','Mumbai','Moscow','Lahore', 'Karachi' ,'Beijing']},

               {category: 'University',
                items: ['Amsterdam','Bern'],
                fake1: ['Lagos' ,'Istanbul' ,'Shanghai', 'Amsterdam', 'London', 'Stockholm', 'Buenos Aires'],
                fake2: ['Mumbai', 'Florence', 'Malmö', 'Frankfurt', 'Tokyo','Guangzhou','Moscow','Lahore', 'Karachi' ,'Beijing' ,'Dhaka' ,'Delhi']},

               {category: 'Museum',
                items: ['London', 'New York', 'Tallinn', 'Venice', 'Stockholm','Malmö', 'Frankfurt', 'Florence', 'Lisbon', 'Brussels'],
                fake1: ['Delhi' ,'Lagos' ,'Istanbul' ,'Shanghai', 'Amsterdam', 'London', 'Stockholm', 'Buenos Aires'],
                fake2: ['Amsterdam', 'Cairo', 'Buenos aires', 'Mumbai','Tokyo','Guangzhou','Moscow','Lahore', 'Karachi' ,'Beijing' ,'Dhaka']},

               {category: 'Historic Site',
                items: ['Rome', 'Stockholm'],
                fake1: ['Mumbai', 'Frankfurt', 'Berlin', 'Copenhagen' ],
                fake2: ['Lisbon', 'Brussels', 'Malmo', 'Florence']},

               {category: 'Theatre',
                items: ['London', 'New York', 'Stockholm', 'Amsterdam','Rome', 'Brussels', 'Cairo', 'Washington'],
                fake1: ['Lisbon'],
                fake2: ['Tallin']},

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
