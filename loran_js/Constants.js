const speedOfLightSpace = 299792458.0;
const refractionIndex = 1.000338;

module.exports = Object.freeze({
  equatiorialRadius: 6378135.0, //ae
  flatteningFactor: 1/298.26, //f
  speedOfLightSpace: speedOfLightSpace, //v0
  refractionIndex: refractionIndex, //n
  speedOfLightAtmosphere: speedOfLightSpace / refractionIndex, // v
});