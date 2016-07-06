// Manhattan
var coords = [-37.87,145.06];

var world = VIZI.world('world', {
  skybox: true,
  postProcessing: true
}).setView(coords);

var meters2degress = function(x,y) {
  var lon = x *  180 / 20037508.34 ;
  var lat = Math.atan(Math.exp(y * Math.PI / 20037508.34)) * 360 / Math.PI - 90;

  return [lon, lat]
}

world._environment._skybox.setInclination(0.3);

// Add controls
VIZI.Controls.orbit().addTo(world);

// CartoDB basemap
VIZI.imageTileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
}).addTo(world);

// Mapzen GeoJSON tile including points, linestrings and polygons
//application/json;type=geojson
// VIZI.geoJSONLayer('http://www.dance4water.org:8080/geoserver/dance4water/ows?service=WFS&version=1.1.0&request=GetFeature&typeName=dance4water:10_building_1&srsName=EPSG:4326&outputFormat=json&format_options=callback:loadGeoJson&maxFeatures=50000', {
//http://www.dance4water.org:8080/geoserver/gwc/service/tms/1.0.0/dance4water:building_melb/{z}/{x}/{y}.topojson?gridSet=EPSG:4326
//var topoJSONTileLayer = VIZI.topoJSONTileLayer('https://vector.mapzen.com/osm/buildings,roads/{z}/{x}/{y}.topojson?api_key=vector-tiles-NT5Emiw', {
//http://www.dance4water.org:8080/geoserver/gwc/service/tms/1.0.0/dance4water:14304_buildings_new_1@EPSG%3A900913@topojson/{z}/{x}/{y}.topojson
  var topoJSONTileLayer = VIZI.topoJSONTileLayer('http://www.dance4water.org:8080/geoserver/gwc/service/tms/1.0.0/dance4water:building_melb@EPSG:900913@topojson/{z}/{x}/{y}.topojson ', {
  interactive: false,
  style: function(feature) {
    var height;

    if (feature.properties.height) {
      height = feature.properties.height;
    } else {
      height = 10 + Math.random() * 10;
    }

    for (i in feature.geometry.coordinates) {
      for (j in feature.geometry.coordinates[i]){
        coords = feature.geometry.coordinates[i]
        // console.log([feature.geometry.coordinates[i][j][0], feature.geometry.coordinates[i][j][1]])

        feature.geometry.coordinates[i][j] = meters2degress(feature.geometry.coordinates[i][j][0], feature.geometry.coordinates[i][j][1]);
      }
    }

    // console.log(feature);


    var color = "grey"
    if (feature.properties.construction_year > 1999) {
      color = "yellow"
    }

    return {
      color: color,
      height: height,
      lineColor: '#f7c616',
      lineWidth: 1,
      lineTransparent: true,
      lineOpacity: 0.2
    };
  },

  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://whosonfirst.mapzen.com#License">Who\'s On First</a>.'
}).addTo(world);

//http://www.dance4water.org:8080/geoserver/dance4water/ows?service=WFS&version=1.1.0&request=GetFeature&typeName=dance4water:13957_building_10&srsName=EPSG:2274&outputFormat=json&format_options=callback:loadGeoJson
