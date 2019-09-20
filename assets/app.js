
let lat;
let lng;
let address;
let parking = [];
var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: lat, lng: lng },
        zoom: 15
    });

    var infoWindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < parking.length; i++) {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(parking[i][1], parking[i][2]),
        map: map
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infoWindow.setContent(parking[i][0]);
          infoWindow.open(map, marker);
        }
      })(marker, i));
    }
}


$("#submitButton").on("click", function (event) {
    event.preventDefault();
    address = $("#address").val().trim();
    console.log(address);


var queryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=AIzaSyAl_dAteSxbSnf4wX8cFpQYhpP9dZN35TE&input=" + address + "&inputtype=textquery&fields=name,geometry,formatted_address,icon";

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    let data = response.candidates[0];
    console.log(data.geometry.location);
    console.log(data.geometry.location.lat);
    console.log(data.geometry.location.lng);
    lat = data.geometry.location.lat;
    lng = data.geometry.location.lng;



    var queryParking = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + "," +lng + "&key=AIzaSyAl_dAteSxbSnf4wX8cFpQYhpP9dZN35TE&radius=1000&types=parking";

    $.ajax({
        url: queryParking,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        let results = response.results;

        for (let i = 0; i < results.length; i++) {
            //console.log(results[i].name, results[i].geometry.location.lat, results[i].geometry.location.lng);

            let parkingPush = [results[i].name, results[i].geometry.location.lat, results[i].geometry.location.lng];

            parking.push(parkingPush);

        }

        console.log(parking);
        initMap();
    })

});

$("#address").val("");
})

            // Take the values from search
            // Throw them into an ajax call api/places/Text
            // Go through response into formated_address and get back...
            // Geometry (lattitude and longitude)
            // Set the lat and long into variables
            // take that information and do another ajax call
            // ajax call for api/places/nearby with a radius of 3000 and a "type: parking"
            // Take that info and plug in into another ajax call for api/maps
            // Find a way to create markers at the location







