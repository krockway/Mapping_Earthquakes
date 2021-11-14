// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with US center and zoom level.
let map = L.map('mapid').setView([40.7, -94.5], 4);

// // Add marker to the map for LA, CA
var marker = L.marker([34.0522, -118.2437]).addTo(map);

// // Add 300 METER radius circle to the map for LA, CA
// var circle = L.circle([34.0522, -118.2437], {
//     radius: 300,
//     color: "#000000",
//     fillColor: "#ffff00",
//     fillOpacity: .2
// }).addTo(map);

// Add 300 PIXEL radius circle to the map for LA, CA
//Note: the size of the circle will change as you zoom
// var circleMarker = L.circleMarker([34.0522, -118.2437], {
//     radius: 300,
//     color: "black",
//     fillColor: "#ffff00",
//     fillOpacity: .2
// }).addTo(map);

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/dark-v10",
    accessToken: API_KEY
  }).addTo(map);

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);

