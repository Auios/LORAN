using GeographicLib;

namespace LoranCalc;

public class Tower {
    public Position pos;
    public int codingDelay;
    

    public Tower(string lat, string lon, int codingDelay) {
        pos = new Position(lat, lon);
        this.codingDelay = codingDelay;
    }

    override public string ToString() {
        return $"{pos.lat}, {pos.lon}, {codingDelay}";
    }
}