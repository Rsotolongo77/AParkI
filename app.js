    
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
        

        
