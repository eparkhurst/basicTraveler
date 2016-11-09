var locationsArray = []

function run(){
  hitBackEnd()
}

$(".addLocationButton").click(()=>{
  getLocation()
})

function hitBackEnd(){
  $.get("http://localhost:3000/", (data)=>{
    console.log(data);
    locationsArray = data
  }).then(function(){
    initMap()
  })
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.")
    }
}

function showPosition(position) {
  loc = {lat:position.coords.latitude, lng:position.coords.longitude}
  console.log(loc);
  locationsArray.push(loc)
  addLocation(loc)
  initMap()
}

function addLocation(loc){
  $.post("http://localhost:3000/locations", loc)
    .done((response)=>{
    console.log(response);
  })
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
