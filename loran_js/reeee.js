const DMS = require("geographiclib-dms");

const Geo = require("./Geo");
const Loran = require("./Loran");
const Tower = require("./Tower");
const Constants = require("./Constants");
const fs = require('fs');

const { exec } = require("child_process");

const gri9960 = {
  m: new Tower(`42° 42' 50.716"N`, `76° 49' 33.308"W`),
  w: new Tower(`46° 48' 27.305"N`, `67° 55' 37.159"W`, 11000),
  x: new Tower(`41° 15' 12.046"N`, `69° 58' 38.536"W`, 27000),
  y: new Tower(`34° 03' 46.17"N`, `77° 54' 46.21"W`, 40000),
  z: new Tower(`39° 51' 07.658"N`, `87° 29' 11.586"W`, -1), // Do not use
};

const d2r = Math.PI / 180.0;
const r2d = 180.0 / Math.PI;

let m = gri9960.m; // M
let w = gri9960.w; // S2
let x = gri9960.x; // S1

let master2w = Geo.Inverse(m.pos, w.pos); // S2
let master2x = Geo.Inverse(m.pos, x.pos); // S1

let oT1 = 12300;
let oT2 = 25500;
let T1 = 12300;
let T2 = 25500;

//T1 = Loran.SecondaryPhaseCorrection(T1);
//T2 = Loran.SecondaryPhaseCorrection(T2);

const zeta = 1; // Placeholder

let TB1 = Loran.GetTB(m.pos, x.pos);
let TB2 = Loran.GetTB(m.pos, w.pos);

let twoC1 = Loran.Get2c(TB1);
let twoC2 = Loran.Get2c(TB2);

let expected_alpha = 78.31421*d2r;
let expected_r = 7.254325*d2r;

let rate = 1.12345e-3;
let last_abs = 1e20;
let last_abs_r = 1e20;
let dx = -1;
let dy = -1;

let lastT1 = 0;
let lastT2 = 0;

let alpha = 0;
let r = 0;

fs.writeFile('./data.csv', "T1,T2,alpha,r\n", _ => {});

while (1) {
  let twoA1 = Loran.Get2a(T1, TB1, x.codingDelay);
  let twoA2 = Loran.Get2a(T2, TB2, w.codingDelay);

  let A1 = zeta * Math.sin(twoA1);
  let A2 = zeta * Math.sin(twoA2);

  let B1 = Math.cos(twoA1) - Math.cos(twoC1);
  let B2 = Math.cos(twoA2) - Math.cos(twoC2);

  let C1 = Math.sin(twoC1);
  let C2 = Math.sin(twoC2);

  let az1 = master2x.azi2 * d2r;
  let az2 = master2w.azi2 * d2r;

  let C = B1 * C2 * Math.cos(az2) - B2 * C1 * Math.cos(az1);
  let S = B1 * C2 * Math.sin(az2) - B2 * C1 * Math.sin(az1);
  let K = B2 * A1 - B1 * A2;

  let rho = Math.sqrt(C * C + S * S);
  let gamma = Math.atan2(S, C);

  alpha = gamma + Math.acos(K / rho);

  r = Math.atan2(B1, C1 * Math.cos(alpha - az1) + A1); // i = 1

  if (!isNaN(alpha) && !isNaN(r)) {
    fs.appendFile('./data.csv', `${T1},${T2},${alpha},${r}\n`, _ => {});
  }

  let cur_abs = Math.abs(alpha - expected_alpha)*r2d;
  let cur_abs_r = Math.abs(r - expected_r)*r2d;

  //if (cur_abs > last_abs || cur_abs == NaN || cur_abs_r > last_abs_r || cur_abs_r == NaN) {
    //T1 = lastT1;
    //T2 = lastT2;

    //if (dx == 1) {
    //  dx = 0;
    //  dy = -1;
    //}
    //else if (dx == -1) {
    //  dx = 1;
    //  dy = 0;
    //}
    //else if (dy == -1) {
    //  dy = 1;
    //  dx = 0;
    //}
    //else if (dy == 1) {
    //  dx = -1;
    //  dy = 0;
    //}
  //}

  console.log(cur_abs, cur_abs_r);

  if ((cur_abs <= 0.1)) {
    console.log(T1, T2);
    console.log(alpha*r2d, r*r2d);
    console.log(cur_abs, cur_abs_r);
    break;
  }

  lastT1 = T1;
  lastT2 = T2;

  T1 += dx*rate;
  T2 += dy*rate;

  last_abs = cur_abs;
  last_abs_r = cur_abs_r;
  //break;
}

let result = Geo.Direct(m.pos, alpha*r2d, r*r2d);

console.log(`alpha: ${alpha} (${alpha*r2d})`);
console.log(`    r: ${r} (${r*r2d})`);
console.log(`result LL: ${result.lat2}, ${result.lon2}`);
console.log("actual LL: 43.7666667, -67");
//console.log(`Map: https://www.google.com/maps/dir/${result.lat1},${result.lon1}/43.7666667,-67/${result.lat2},${result.lon2}/`);

//exec(`"C:\\Program Files\\Mozilla Firefox\\firefox.exe" "https://www.google.com/maps/dir/${result.lat1},${result.lon1}/43.7666667,-67/${result.lat2},${result.lon2}/" -private`);

/*
{
  lat1: 42.71408777777777,
  azi1: 20.95609925039048,
  lon1: -76.82591888888889,
  a12: 758.0245243057831,
  s12: 84235417.32741722,
  lon2: -28.295763980630333,
  lat2: 73.13307203467642,
  azi2: 64.72896212121209
}
alpha: 1.3102980645532072
r1: 1.3404816669794215
r2: 1.3404816669794213
result LL: 73.13307203467642, -28.295763980630333
actual LL: 43.7666667, -67
Map: https://www.google.com/maps/dir/42.71408777777777,-76.82591888888889/43.7666667,-67/73.13307203467642,-28.295763980630333/
*/
