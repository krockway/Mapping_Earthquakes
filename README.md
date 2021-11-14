# Mapping_Earthquakes

## Purpose

The goal of this project is to map the last 7 days of earthquake data from the [US Geological Survey website](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php).

The map features three layers that a user can choose between: street view, satellite view and dark view.

Additionally a user can toggle between any, or all, of the three types of map data: all earthquakes within the last 7 days, tectonic plates, or major earthquakes (with a magnitude greater than 4).

## Process

First I created a map with the three desired layers (street view, satellite view and dark view) and the ability to zoom the map in and out.

Next, I retrieved the earthquake data from the US Geological Survey website, which uses an API to get a GeoJSON file containing [all earthquakes in the last seven days](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson).

To create a layer with only the largest earthquakes from this week, I used the API again to get a truncated GeoJSON file containing [all earthquakes with a magnitude greater than 4.5](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson).

Next, I created a tectonic plate layer based on supplied GeoJSON [tectonic data](https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json).

Finally, I stylized the earthquake data by adding color and circle size to indicate the magnitude, and added labels to each circle with the location and magnitude of each earthquake.

## Tools & Languages

* HTML
* CSS
* JavaScript
* APIs - Google Maps & Earthquake Magnitudes
* GeoJSON

## Analysis & Results

[Link to maps](https://krockway.github.io/Mapping_Earthquakes/)

The data within the map can be displayed in various ways. At any time, only 1 map style can show (street, satellite, or dark), but any of the map data can be turned on (all earthquakes, tectonic plates, or major earthquakes).

Here are a few possible views of the map:

### Street view with all earthquake data
![streets_earthquake](https://github.com/krockway/Mapping_Earthquakes/blob/main/images/streets_earthquakes.png)

### Satellite view with tectonic plate data
![satellite_tectonic](https://github.com/krockway/Mapping_Earthquakes/blob/main/images/satellite_tectonic.png)

### Dark view with major earthquake data
![dark_major](https://github.com/krockway/Mapping_Earthquakes/blob/main/images/dark_major.png)

### Street view with all earthquake data & tectonic plate data
![streets_earthquakes_tectonic](https://github.com/krockway/Mapping_Earthquakes/blob/main/images/streets_earthquakes_tectonic.png)

## Challenges & Next Steps

Because the data source is constantly updated, it could be challenging for researchers to review this data and draw conclusions.
