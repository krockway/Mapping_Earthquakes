// Add console.log to check to see if our code is working.
console.log("working");

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });

// Alternative tile layer that will be the background of our map.
let satelliteStreets = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/satellite-streets-v11",
    accessToken: API_KEY
  });

// Create a base layer that holds both maps.
let baseMaps = {
  "Streets": streets,
  "Satellite": satelliteStreets
};

// Create the map object with US center, zoom level and default layer.
let map = L.map('mapid', {
  center: [39.5, -98.5],
  zoom: 3,
  layers: [streets]
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Retrieve the earthquake GeoJSON data.
let earthquake7day = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Create a style for the lines.
let myStyle = {
  fillColor: "#ffffa1",
  color: "blue", //stroke color
  weight: 1
}




// Grabbing our GeoJSON data & styling as element
d3.json(earthquake7day).then(function(data) {
  //Create function to contain all style parameters
  function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: "#ffae42",
      color: "#000000",
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data, {
    // Make markers circles
    pointToLayer: function(feature, latlng) {
      console.log(data);
      return L.circleMarker(latlng);
    },
    // Match style to function above
    style: styleInfo
  }).addTo(map);
});

//Create a get radius function to calculate raidus for each earthquake. If radius blank, consider it 1 so that it plots
function getRadius(magnitude) {
  if (magnitude === 0) {
    return 1;
  }
  return magnitude * 4;
}
