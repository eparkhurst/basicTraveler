var locationsArray = [{lat:39.7392, lng:-104.9903},{lat:33.4484,lng: -112.0740},{lat:32.7157, lng:-117.1611}]
getLocation()
createWaypoints(locationsArray)
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.")
    }
}
function showPosition(position) {
  locationsArray.push({lat:position.coords.latitude, lng:position.coords.longitude})
  initMap()
}

function createWaypoints(array){
  var newArray = array.concat([])
  newArray.shift()
  newArray.pop()
  return newArray.map((e)=>{
    return {location:e,stopover:true}
  })
}

function initMap() {
  var directionsDisplay;
  var directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer({ suppressMarkers: true});
  var uluru = {lat:33.4484,lng: -112.0740};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 6,
    center: uluru,
    mapTypeId: 'hybrid',
    mapTypeControl: false,
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
    origin: locationsArray[0],
    destination:  locationsArray[locationsArray.length -1] ,
    waypoints:createWaypoints(locationsArray),
    travelMode: 'DRIVING'
  };
  directionsService.route(request, function(result, status) {
    console.log(result);
    if (status == 'OK') {
      directionsDisplay.setDirections(result);
    }
  });
}
