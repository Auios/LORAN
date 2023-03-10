const Geo = require("./Geo");
const Constants = require("./Constants");

class Loran {
  static SecondaryPhaseCorrection(T) {
    let a = Loran.GetAValues(T);
    return a[0] / T + a[1] + a[2] * T;
  }

  static GetDeltaT(TB, codingDelay) {
    return (TB + Loran.SecondaryPhaseCorrection(TB)) + codingDelay;
  }

  static GetTB(masterPos, slavePos) {
    let seconds = Geo.Inverse(masterPos, slavePos).s12 / Constants.speedOfLightAtmosphere;
    let microseconds = seconds * 1e6;
    return microseconds;
  }

  static Get2c(TB) {
    return Constants.speedOfLightAtmosphere * TB / Constants.equatiorialRadius;
  }

  static Get2a(T, TB, codingDelay) {
    // TS - TM = (ITD - ∆t)/(1 + a2)
    let TS_TM = (T - Loran.GetDeltaT(TB, codingDelay)) / (1 + Loran.GetAValuesZero()[2]);
    return this.Get2c(TS_TM);
  }

  static GetAValues(T) {
    //return [0, -0.321, 0.000635];

    let result = null;
    if(T > 537) {
      result = [129.04398, -0.40758, 0.00064576438];
    }
    else {
      result = [2.7412979, -0.011402, 0.00032774624];
    }
    return result;
  }

  static GetAValuesZero() {
    return [0, -0.321, 0.000635];
  }
}

module.exports = Loran;
