
var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 28.589475, lng: -81.199879 },
        zoom: 8
    });
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

    let lat = data.geometry.location.lat;
    let lng = data.geometry.location.lng;

    var queryURL2 = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+ lat + "," + lng + "key=AIzaSyAl_dAteSxbSnf4wX8cFpQYhpP9dZN35TE&radius=1000&types=parking";

    $.ajax ({
        url: queryURL2,
        method: "GET"
    }). then(function(response) {
        console.log(respnose);
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







