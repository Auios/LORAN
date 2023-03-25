using GeographicLib;

namespace LoranCalc;
public static class Geo {
    public static InverseGeodesicResult Inverse(Position pos1, Position pos2) {
        return Geodesic.WGS84.Inverse(pos1.lat, pos1.lon, pos2.lat, pos2.lon);
    }

    // NAD27 and NAD83
    // Proj4

    public static Position Direct(Position pos, double az1, double s12) {
        double latOut;
        double lonOut;
        Geodesic.WGS84.Direct(pos.lat, pos.lon, az1, s12, out latOut, out lonOut);
        return new Position(latOut, lonOut);
    }
}
