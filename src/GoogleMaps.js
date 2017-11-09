var map;
var directionsService;
var directionsDisplay;
var myCenter;
var marker;
function initMap() {
    myCenter = new google.maps.LatLng(48.151852, 17.073345);
    var mapProp = {
        center: myCenter,
        zoom: 18,
    };

    map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer;

    directionsDisplay.setMap(map);

    var contentString = myCenter.toString();
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    marker = new google.maps.Marker({position: myCenter, map: map, title: "FEI STUBA", label: "FEI STUBA"});
    marker.addListener('click', function () {
        infowindow.open(map, marker);
    });

    var servicePlaces = new google.maps.places.PlacesService(map);
    servicePlaces.nearbySearch({
        location: myCenter,
        radius: 5000,
        type: ['transit_station']
    }, callbackBus);
}

function calculateAndDisplayRoute(directionsService, directionsDisplay, originKeyword, mode) {
    directionsService.route({
        origin: originKeyword,
        destination: myCenter,
        travelMode: mode
    }, function (response, status) {
        if (status === 'OK') {
            directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}

//calculateAndDisplayRoute(directionsService, directionsDisplay);

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
                document.getElementById("distance").innerHTML = "Vzdialenost trasy: " + distance;
                console.log(distance, duration, from, to);
            }
        }
    }
}

function getDistance(originKeyword) {

    var serviceDistance = new google.maps.DistanceMatrixService();
    serviceDistance.getDistanceMatrix(
        {
            origins: [originKeyword],
            destinations: [myCenter],
            travelMode: 'DRIVING',
        }, callbackDistance);
}

function callbackBus(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
    }
}

function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });
}