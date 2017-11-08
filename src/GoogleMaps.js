function myMap() {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var myCenter = new google.maps.LatLng(48.151852,17.073345)
    var mapProp= {
        center: myCenter,
        zoom:18,
    };
    var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
    directionsDisplay.setMap(map);

    var contentString = myCenter.toString();


    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });


    var marker = new google.maps.Marker({position:myCenter,map: map,title:"FEI STUBA",label:"FEI STUBA"});
    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });

    function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        directionsService.route({
            origin: "Svoradova 13, Bratislava",
            destination: myCenter,
            travelMode: 'DRIVING'
        }, function(response, status) {
            if (status === 'OK') {
                directionsDisplay.setDirections(response);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    }
    calculateAndDisplayRoute(directionsService, directionsDisplay);

    function callbackDistance(response, status) {
        if (status == 'OK') {
            var origins = response.originAddresses;
            var destinations = response.destinationAddresses;

            for (var i = 0; i < origins.length; i++) {
                var results = response.rows[i].elements;
                for (var j = 0; j < results.length; j++) {
                    var element = results[j];
                    var distance = element.distance.text;
                    var duration = element.duration.text;
                    var from = origins[i];
                    var to = destinations[j];
                    console.log(distance, duration, from, to);
                }
            }
        }
    }

    var serviceDistance = new google.maps.DistanceMatrixService();
    serviceDistance.getDistanceMatrix(
        {
            origins: ["Svoradova 13, Bratislava"],
            destinations: [myCenter],
            travelMode: 'DRIVING',
        }, callbackDistance);

    function callbackBus(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                createMarker(results[i]);
            }
        }
    }

    var servicePlaces = new google.maps.places.PlacesService(map);
    servicePlaces.nearbySearch({
        location: myCenter,
        radius: 5000,
        type: ['transit_station']
    }, callbackBus);

    function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
        });
    }

}