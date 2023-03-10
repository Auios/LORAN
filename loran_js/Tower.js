const DMS = require("geographiclib-dms");

class Tower {
  /**
   * @param {String} lat
   * @param {String} lon
   * @param {Number} codingDelay
   */
  constructor(lat, lon, codingDelay = 0) {
    this.codingDelay = codingDelay;
    
    lat = lat.replace("° ", ":");
    lat = lat.replace("' ", ":");
    lat = lat.replace("\"", "");
    
    lon = lon.replace("° ", ":");
    lon = lon.replace("' ", ":");
    lon = lon.replace("\"", "");
    
    this.pos = DMS.DecodeLatLon(lat, lon);
  }
}

module.exports = Tower;