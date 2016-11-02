

function initMap() {
  var directionsDisplay;
  var directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer({ suppressMarkers: true});
  var uluru = {lat:33.4484,lng: -112.0740};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 6,
    center: uluru,
    mapTypeId: 'hybrid'
  });
  var image = new google.maps.MarkerImage(
    './logos/facebookLogo.png',
    null,
    null,
    new google.maps.Point(15, 40),
    new google.maps.Size(30, 30)
  )
  var marker = new google.maps.Marker({
    position: uluru,
    icon: image,
    map: map,
    title:"Click to view"
  });
  var infowindow = new google.maps.InfoWindow({
    content: '<h1>Hey</h1>'
  });
  marker.addListener('click', function() {
    infowindow.open(map,marker)
  })
  directionsDisplay.setMap(map);
  var request = {
    origin: {lat:39.7392, lng:-104.9903},
    destination: {lat:32.7157, lng:-117.1611},
    waypoints:[{location:{
      lat:33.4484,
      lng: -112.0740
    },
    stopover:true
    } ],
    travelMode: 'DRIVING'
  };
  directionsService.route(request, function(result, status) {
    console.log(result);
    if (status == 'OK') {
      directionsDisplay.setDirections(result);
    }
  });
}
