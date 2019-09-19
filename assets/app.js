
var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 28.589475, lng: -81.199879 },
        zoom: 8
    });
}

initMap();

let address;
let state;
let city;
let zipCode;

$("#submitButton").on("click", function (event) {
    event.preventDefault();
    address = $("#address").val().trim();
    state = $("#state").val().trim();
    city = $("#city").val().trim();
    zipCode = $("#zip_code").val().trim();
    console.log(address);
    console.log(state);
    console.log(city);
    console.log(zipCode);
    $("#address").val("");
    $("#state").val("");
    $("#city").val("");
    $("#zip_code").val("");
})

var queryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=AIzaSyAl_dAteSxbSnf4wX8cFpQYhpP9dZN35TE&input=Amway&inputtype=textquery&fields=name,geometry,formatted_address,icon";
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
});

            // Take the values from search 
            // Throw them into an ajax call api/places/Text
            // Go through response into formated_address and get back...
            // Geometry (lattitude and longitude)
            // Set the lat and long into variables
            // take that information and do another ajax call
            // ajax call for api/places/nearby with a radius of 3000 and a "type: parking"
            // Take that info and plug in into another ajax call for api/maps
            // Find a way to create markers at the location







