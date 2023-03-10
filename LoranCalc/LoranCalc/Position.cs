namespace LoranCalc;

public class Position {
    public double lat;
    public double lon;

    public Position(string lat, string lon) {
        this.lat = ConvertDMS(lat);
        this.lon = ConvertDMS(lon);
    }

    public Position(double lat, double lon) {
        this.lat = lat;
        this.lon = lon;
    }

    public double ConvertDMS(string dms) {
        // South/West
        int multiplier = (dms.Contains("S") || dms.Contains("W")) ? -1 : 1;
        dms = dms.Replace("N", "");
        dms = dms.Replace("E", "");
        dms = dms.Replace("S", "");
        dms = dms.Replace("W", "");
        dms = dms.Replace("° ", ":");
        dms = dms.Replace("' ", ":");
        dms = dms.Replace("\"", "");

        string[] dmsParts = dms.Split(":");
        double degrees = double.Parse(dmsParts[0]);
        double minutes = double.Parse(dmsParts[1]) / 60;
        double seconds = double.Parse(dmsParts[2]) / 3600;

        return (degrees + minutes + seconds) * multiplier;
    }

    public override string ToString() {
        return $"{lat}, {lon}";
    }
}
