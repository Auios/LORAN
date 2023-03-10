const Geodesic = require("geographiclib-geodesic").Geodesic;
const Constants = require("./Constants");

Geodesic.WGS84.a = Constants.equatiorialRadius;
Geodesic.WGS84.f = Constants.flatteningFactor;

class Geo {
  static Direct(pos, azimuth, distance) {
    return Geodesic.WGS84.ArcDirect(pos.lat, pos.lon, azimuth, distance);
  }

  static Inverse(pos1, pos2) {
    return Geodesic.WGS84.Inverse(pos1.lat, pos1.lon, pos2.lat, pos2.lon);
  }
}

module.exports = Geo;
