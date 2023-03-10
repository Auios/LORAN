namespace LoranCalc;
public static class Constants {
    public static double SpeedOfLight = 299792458;
    public static double RefractiveIndex = 1.000338;
    public static double EquatorialRadius = 6378137;
    public static double PolarRadius = 6356752;
    public static double FlatteningFactor = 1 - (PolarRadius / EquatorialRadius);
    public static double ElectromagneticRadiationSpeed = SpeedOfLight / RefractiveIndex;
}
