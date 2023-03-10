using GeographicLib;

namespace LoranCalc;
class Gri {
    public int repititionInterval;
    public Dictionary<string, Tower> towers;

    public Gri(int repititionInterval) {
        towers = new Dictionary<string, Tower>();
        this.repititionInterval = repititionInterval;
    }

    public void AddTower(string location, string lat, string lon, int codingDelay = 0) {
        towers.Add(location, new Tower(lat, lon, codingDelay));
    }

    override public string ToString() {
        string result = string.Empty;
        foreach(string key in towers.Keys) {
            result += $"{key}:{towers[key]}\n";
        }
        return result;
    }

    public Tower this[string key] {
        get {
            return towers[key];
        }
    }
}
