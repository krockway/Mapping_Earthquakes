// Add console.log to check to see if our code is working.
console.log("working");

// Retrieve the earthquake GeoJSON data.
let earthquake7day = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

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

// Create the map object with US center, zoom level and default layer.
let map = L.map('mapid', {
  center: [39.5, -98.5],
  zoom: 3,
  layers: [streets]
});  

// Create a base layer that holds both maps.
let baseMaps = {
  "Streets": streets,
  "Satellite": satelliteStreets
};

// Create the earthquake layer for our map (has to be below baseMaps)
let earthquakes = new L.layerGroup();

// We define an object that contains the overlays. This overlay will be visible all the time.
let overlays = {
  "Earthquakes": earthquakes
};

// Then we add a control to the map that will allow the user to change which layers are visible.
L.control.layers(baseMaps, overlays).addTo(map);

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
      fillColor: getColor(feature.properties.mag),
      color: "#000000",
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }
  //Create a get radius function to calculate radius for each earthquake. If radius blank, consider it 1 so that it plots
  function getRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }
    return magnitude * 4;
  }

  //Color code fill based on earthquake radius
  function getColor(magnitude) {
    if (magnitude > 5) {
      return "#ea2c2c";
    }
    if (magnitude > 4) {
      return "#ea822c";
    }
    if (magnitude > 3) {
      return "#ee9c00";
    }
    if (magnitude > 2) {
      return "#eecc00";
    }
    if (magnitude > 1) {
      return "#d4ee00";
    }
    return "#98ee00";
  }

  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data, {
    // Make markers circles
    pointToLayer: function(feature, latlng) {
      console.log(data);
      return L.circleMarker(latlng);
    },
    // Match style to function above
    style: styleInfo,
    //Add popup for each earthquake with Magnitude & location
    onEachFeature: function(feature, layer) {
      layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
    }
    //This makes the default set to checked
  }).addTo(earthquakes);

  //Then add earthquake layer to our map
  earthquakes.addTo(map);
});


