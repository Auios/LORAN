using GeographicLib;
using LoranCalc;
using static System.Net.WebRequestMethods;
using System;

public static class Program {
    public static double d2r = Math.PI / 180.0;
    public static double r2d = 180.0 / Math.PI;

    public static void Main() {
        // Setup Towers in GRI
        Gri gri = new Gri(9960);
        gri.AddTower("m", """42° 42' 50.716"N""", """76° 49' 33.308"W""");
        gri.AddTower("w", """46° 48' 27.305"N""", """67° 55' 37.159"W""", 11000);
        gri.AddTower("x", """41° 15' 12.046"N""", """69° 58' 38.536"W""", 27000);
        gri.AddTower("y", """34° 03' 46.17"N""", """77° 54' 46.21"W""", 40000);
        Console.WriteLine(gri.ToString());

        // Get the azimuths between the master and two slave stations
        InverseGeodesicResult m2w = Geo.Inverse(gri["m"].pos, gri["w"].pos);
        InverseGeodesicResult m2x = Geo.Inverse(gri["m"].pos, gri["x"].pos);

        // Our LORAN numbers. Time for slaves "w" and "x".
        double Tw = 12300;
        double Tx = 25500;

        // Time between master and slave (TB) - page 25
        double TBw = Loran.GetTB(gri["m"], gri["w"]);
        double TBx = Loran.GetTB(gri["m"], gri["x"]);

        // 2c = v * (TB / ae)
        double twoCw = Loran.Get2c(TBw);
        double twoCx = Loran.Get2c(TBx);

        // 2a = v * (TS - TM) / ae
        double twoAw = Loran.Get2a(Tw, TBw, gri["w"].codingDelay);
        double twoAx = Loran.Get2a(Tx, TBx, gri["x"].codingDelay);

        // 1 = Prime focus is at a master station, -1 = Prime focus is at a slave station.
        int primeFocus = 1;

        // Ai
        double A1 = primeFocus * Math.Sin(twoAw);
        double A2 = primeFocus * Math.Sin(twoAx);

        // Bi
        double B1 = Math.Cos(twoAw) - Math.Cos(twoCw);
        double B2 = Math.Cos(twoAx) - Math.Cos(twoCx);

        // Ci
        double C1 = Math.Sin(twoCw);
        double C2 = Math.Sin(twoCx);

        // Azimuth
        // What's the difference between Azimuth1 and Azimuth2?
        double az1 = m2w.Azimuth2;
        double az2 = m2x.Azimuth2;

        // C
        double C = B1 * C2 * Math.Cos(az2) - B2 * C1 * Math.Cos(az1);

        // S
        double S = B1 * B2 * Math.Sin(az2) - B2 * C1 * Math.Sin(az1);

        // K
        double K = B2 * A1 - B1 * A2;

        // Rho
        double rho = Math.Sqrt((C * C) + (S * S));

        // Gamma
        double gamma = Math.Atan2(S, C);

        // Get the azimuth angle
        double alpha = gamma + Math.Acos(K / rho);

        // Get r
        double r = Math.Atan2(B1, C1 * Math.Cos(alpha - az1) + A1); // i = 1

        // Get position???
        Position position = Geo.Direct(gri["x"].pos, alpha * r2d, r * r2d);

        Console.WriteLine($"Map: https://www.google.com/maps/dir/{gri["m"].pos.lat},{gri["m"].pos.lon}/43.7666667,-67/{position.lat},{position.lon}/");
    }
}
//M: 42.71407601036235, -76.82584649447081
//T: 43.7666667, -67