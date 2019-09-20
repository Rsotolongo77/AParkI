var map, infoWindow;
let userLongitude;
let userLatitude;
// Function to initilize the map to the screen
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        // Initial starting location is University of Central Florida
        center: { lat: 30, lng: 30 },
        zoom: 13
    });
    infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude

            };
            userLatitude = pos.lat
            userLongitude = pos.lng
            console.log(userLatitude)
            console.log(userLongitude)

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}
initMap();

let address;

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
        let lat = data.geometry.location.lat;
        let lng = data.geometry.location.lng;

        var queryParking = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + "," + lng + "&key=AIzaSyAl_dAteSxbSnf4wX8cFpQYhpP9dZN35TE&radius=1000&types=parking";

        $.ajax({
            url: queryParking,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            let results = response.results

            for (let i = 0; i < results.length; i++) {
                console.log(results[i].name, results[i].geometry.location);
            }
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







