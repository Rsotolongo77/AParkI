$(document).ready(function() {
    var map, infoWindow;
    let userLongitude;
    let userLatitude;
    let lat;
    let lng;
    let address;
    let parking = [];
    let stepsArr = [];
    let parkingLotLat;
    let parkingLotLong;

    // Function to initilize the map to the screen
    function initMap() {
        map = new google.maps.Map(document.getElementById('map'),{
            // Initial starting location is University of Central Florida
            center: {
                lat: 30,
                lng: 30
            },
            zoom: 13
        });
        infoWindow = new google.maps.InfoWindow;

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
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

            }, function() {
                handleLocationError(true, infoWindow, map.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }
    }

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ? 'Error: The Geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
    }
    initMap();

    function initParkingMap() {
        map = new google.maps.Map(document.getElementById('map'),{
            center: {
                lat: lat,
                lng: lng
            },
            zoom: 15
        });

        var infoWindow = new google.maps.InfoWindow();

        var marker, i;

        for (i = 0; i < parking.length; i++) {
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(parking[i][1],parking[i][2]),
                map: map
            });

            google.maps.event.addListener(marker, 'click', (function(marker, i) {
                return function() {
                    infoWindow.setContent(parking[i][0]);
                    infoWindow.open(map, marker);
                }
            }
            )(marker, i));
        }
    }

    $("#submitButton").on("click", function(event) {
        event.preventDefault();
        address = $("#address").val().trim();
        console.log(address);

        $("p").remove();

        var queryPlacesURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=AIzaSyAl_dAteSxbSnf4wX8cFpQYhpP9dZN35TE&input=" + address + "&inputtype=textquery&fields=name,geometry,formatted_address,icon";

        $.ajax({
            url: queryPlacesURL,
            method: "GET"
        }).then(function(response) {
            let data = response.candidates[0];
            console.log(data.geometry.location);
            console.log(data.geometry.location.lat);
            console.log(data.geometry.location.lng);
            lat = data.geometry.location.lat;
            lng = data.geometry.location.lng;

            var queryParkingURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + "," + lng + "&key=AIzaSyAl_dAteSxbSnf4wX8cFpQYhpP9dZN35TE&radius=1000&types=parking";

            $.ajax({
                url: queryParkingURL,
                method: "GET"
            }).then(function(response) {
                console.log(response);

                let results = response.results;

                for (let i = 0; i < results.length; i++) {

                    let parkingPush = [results[i].name, results[i].geometry.location.lat, results[i].geometry.location.lng];

                    parking.push(parkingPush);

                    parkingLotLat = parkingPush[1];
                    parkingLotLong = parkingPush[2];

                    console.log(parkingPush[1], parkingPush[2])

                    console.log(parkingLotLat, parkingLotLong);

                    let parkingLotOptions = [results[i].name, results[i]];
                    let parkingOptions = $("<p>");

                    parkingOptions.attr("lat", parkingPush[1]);
                    parkingOptions.attr("lng", parkingPush[2]);
                    parkingOptions.attr("data-name", results[i].name)

                    parkingOptions.append(parkingLotOptions);
                    $(".container1").append(parkingOptions);

                }

                initParkingMap();
            })
            //inside the 1st then

            var queryDirectionsURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/directions/json?origin=" + userLatitude + "," + userLongitude + "&destination=" + address + "&key=AIzaSyAl_dAteSxbSnf4wX8cFpQYhpP9dZN35TE";

            $.ajax({
                url: queryDirectionsURL,
                method: "GET"
            }).then(function(response) {
                //logging directions to the console
                console.log(response);

                //console.log(response.routes[0].legs[0].steps[0].html_instructions);

                let steps = response.routes[0].legs[0].steps

                for (let i = 0; i < steps.length; i++) {

                    let dirDiv = $("<p>");

                    let instr = steps[i].html_instructions;

                    dirDiv.append(instr);
                    dirDiv.append("  then go ");

                    //$(".container1").append(dirDiv)

                    let miles = response.routes[0].legs[0].steps[i].distance.text
                    console.log(miles);

                    dirDiv.append(miles);

                    //$(".container1").append(dirDiv)

                }

            })
            //1st then ending

        });

        $("#address").val("");
    });

    $(document).on("click", "p", function() {

        var parkingName = $(this).attr("data-name");

        console.log(parkingName);

        var queryDirectionsURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/directions/json?origin=" + userLatitude + "," + userLongitude + "&destination=" + parkingName + "&key=AIzaSyAl_dAteSxbSnf4wX8cFpQYhpP9dZN35TE";

        $.ajax({
            url: queryDirectionsURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);

            $(".container1").empty("<p>");

            let steps = response.routes[0].legs[0].steps

            for (let i = 0; i < steps.length; i++) {

                let dirDiv = $("<p>");

                let instr = steps[i].html_instructions;

                dirDiv.append(instr);
                dirDiv.append("  then go ");

                $(".container1").append(dirDiv)

                let miles = response.routes[0].legs[0].steps[i].distance.text
                console.log(miles);

                dirDiv.append(miles);

                $(".container1").append(dirDiv)

            }

        })
    })

});

// Set the lat and long into variables
// take that information and do another ajax call
// Take that info and plug in into another ajax call for api/maps
