namespace LoranCalc;
public static class Loran {
    public static double[] GetAValues(double loranTime) {
        double[] result;
        if(loranTime >= 537) {
            result = new double[] { 129.04398, -0.40758, 0.00064576438};
        }
        else {
            result = new double[] { 2.7412979, -0.011402, 0.00032774624 };
        }
        return result;
    }

    public static double[] GetAValuesZero() {
        return new double[] { 0, -0.321, 0.000635 };
    }

    public static double SecondaryPhaseCorrection(double loranTime) {
        // p(T) = a0 / T + a1 + a2 * T
        double[] a = GetAValues(loranTime);
        return a[0] / loranTime + a[1] + a[2] * loranTime;
    }

    public static double GetDeltaT(double masterSlaveTime, double codingDelay) {
        return (masterSlaveTime + SecondaryPhaseCorrection(masterSlaveTime)) + codingDelay;
    }

    public static double GetTB(Tower master, Tower slave) {
        // Get the difference in microseconds between the master and slave tower
        double seconds = Geo.Inverse(master.pos, slave.pos).Distance / Constants.ElectromagneticRadiationSpeed;
        double microSeconds = seconds * 1e6;
        return microSeconds;
    }

    public static double Get2c(double TB) {
        // 2c = v * T * TB / ae
        return (TB / Constants.EquatorialRadius) * Constants.ElectromagneticRadiationSpeed;
    }

    public static double Get2a(double loranTime, double masterSlaveTime, double codingDelay) {
        // TS - TM = (ITD - ∆t)/(1 + a2)
        double TS_TM = (loranTime - GetDeltaT(masterSlaveTime, codingDelay)) / (1 + GetAValuesZero()[2]);
        return Get2c(TS_TM);
    }

    //public static double GetK(double loranTime, double masterSlaveTime, ) {
    //}
}
