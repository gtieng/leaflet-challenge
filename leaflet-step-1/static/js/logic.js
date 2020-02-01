// leaflet challenge by gerard tieng

// map coordinates for mapbox tile
var myMap = L.map("map", {
    // google search "center of us coordinates"
    center: [38.2375, -112.2199],
    zoom: 6
});



L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
}).addTo(myMap);

function chooseColor(size) {
    return  size >=5 ? "red":
            size >=4 ? "orange":
            size >=3 ? "yellow":
            size >=2 ? "green":
                       "lightblue";
};

// timestamp function from **https://makitweb.com/convert-unix-timestamp-to-date-time-with-javascript/**
function convert(timestamp){

    // Unixtimestamp
    var unixtimestamp = timestamp/1000
   
    // Months array
    var months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
   
    // Convert timestamp to milliseconds
    var date = new Date(unixtimestamp*1000);
   
    // Year
    var year = date.getFullYear();
   
    // Month
    var month = months_arr[date.getMonth()];
   
    // Day
    var day = date.getDate();
   
    // Hours
    var hours = date.getHours();
   
    // Minutes
    var minutes = "0" + date.getMinutes();
   
    // Seconds
    var seconds = "0" + date.getSeconds();
   
    // Display date time in MM-dd-yyyy h:m:s format
    var convdataTime = month+'-'+day+'-'+year+' '+hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    
    return convdataTime;
    
   }
  
//load in geojson file from usgs for circles
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(response) {

  response.features.forEach(function(d) {

      L.circle([d.geometry.coordinates[1], d.geometry.coordinates[0]], {
          fillOpacity: 0.75,
          weight: 1,
          color: "black",
          fillColor: chooseColor(d.properties.mag),
          radius: d.properties.mag * 5000
        }).bindPopup(`<b>Location: </b><p>${d.properties.place}</p><b>Timestamp:</b><p>${convert(d.properties.time)}</p><b>Magnitude:</b><p>${d.properties.mag}</p>`).addTo(myMap);
    });

});

// add legend
var legend = L.control({ position: "bottomright" });

legend.onAdd = function(map) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += '<i style="background: red"></i>5+<br>';
  div.innerHTML += '<i style="background: orange"></i>4 to 4.9<br>';
  div.innerHTML += '<i style="background: yellow"></i>3 to 3.9<br>';
  div.innerHTML += '<i style="background: green"></i>2 to 2.9<br>';
  div.innerHTML += '<i style="background: lightblue"></i>0 to 1.9';
  
  return div;
};

legend.addTo(myMap);

