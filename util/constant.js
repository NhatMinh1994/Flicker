const Constant = {
  link:
    "https://api.flickr.com/services/rest/?api_key=6a68dc4789aa817dfbd2a84fb0e5ca86&format" +
    "=json&nojsoncallback=1&extras=url_s&method=flickr.photos.getRecent",
  linkSearch:
    "https://api.flickr.com/services/rest/?api_key=6a68dc4789aa817dfbd2a84fb0e5ca86&format=json&nojsoncallback" +
    "=1&extras=url_s&method=flickr.photos.search&text=",
  linkLocation:
    "https://api.flickr.com/services/rest/?api_key=6a68dc4789aa817dfbd2a84fb0e5ca86&format=json&nojsoncallback=1&extras=url_s%2Cgeo&method=flickr.photos.search",
  lat: "&lat=",
  lon: "&lon=",
  findCoordinates() {
    var lon, lat;
    var obj;
    navigator.geolocation.getCurrentPosition(
      position => {
        lon = JSON.stringify(position.coords.longitude);
        lat = JSON.stringify(position.coords.latitude);
        console.log("LOG LOCATION : " + lat + " : " + lon);
      },
      error => alert(error.message),
      { enableHighAccuracy: false, timeout: 60000, maximumAge: 10000 }
    );
    console.log("LOG LOCATION 2 : " + lat + " : " + lon);
    return { lon, lat };
  }
};
export default Constant;
