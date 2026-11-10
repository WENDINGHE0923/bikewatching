// Import Mapbox as an ESM module
import mapboxgl from 'https://cdn.jsdelivr.net/npm/mapbox-gl@2.15.0/+esm';
import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm';

// Check that Mapbox GL JS is loaded
console.log('Mapbox GL JS Loaded:', mapboxgl);

// Set your Mapbox access token here
mapboxgl.accessToken = 'pk.eyJ1Ijoid2VoMDU3IiwiYSI6ImNtd2E3eG83eDA5eHUyem91dDBoMXF2cXgifQ.S3F4lGaXbbet_BmqVkf-UA';

// Initialize the map
const map = new mapboxgl.Map({
  container: 'map', // ID of the div where the map will render
  style: 'mapbox://styles/mapbox/streets-v12', // Map style
  center: [-71.09415, 42.36027], // [longitude, latitude]
  zoom: 12, // Initial zoom level
  minZoom: 5, // Minimum zoom level allowed
  maxZoom: 18, // Maximum zoom level allowed
});

// Shared style for both bike-lane layers, so we only tweak it in one place
const bikeLanePaint = {
  'line-color': '#32D400',
  'line-width': 3,
  'line-opacity': 0.6,
};

// Wait for the map to load before adding data
map.on('load', () => {
  // Boston bike lanes (GeoJSON from Boston open data)
  map.addSource('boston_route', {
    type: 'geojson',
    data: 'https://bostonopendata-boston.opendata.arcgis.com/datasets/boston::existing-bike-network-2022.geojson',
  });
  map.addLayer({
    id: 'bike-lanes',
    type: 'line',
    source: 'boston_route',
    paint: bikeLanePaint,
  });

  // Cambridge bike lanes (GeoJSON from Cambridge ArcGIS)
  map.addSource('cambridge_route', {
    type: 'geojson',
    data: 'https://services1.arcgis.com/WnzC35krSYGuYov4/ArcGIS/rest/services/Bike_Facilities/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson',
  });
  map.addLayer({
    id: 'cambridge-bike-lanes',
    type: 'line',
    source: 'cambridge_route',
    paint: bikeLanePaint,
  });
});
