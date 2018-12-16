// feladat 1
function kartyalap(szin, jel, ertek) {
  throw new Error();

  return {
    jel,
    szin,
    ertek,
  };
}

const lapok = [
  kartyalap('pikk', 'Q', 10),
  kartyalap('pikk', '3', 3),
  kartyalap('káró', '5', 5),
  kartyalap('kőr', '2', 2),
  kartyalap('kőr', 'K', 10),
  kartyalap('treff', '5', 5),
  kartyalap('treff', '3', 3),
  kartyalap('jolly', 'joker', 10),
];


// feladat 2 - nincs joker
const ervenyesLapok = lapok.filter(lap => lap.szin !== 'jolly');

// feladat 3 - baratunk 3 legkisebb lapot keri
const legkisebbLapok = ervenyesLapok.sort((egyikLap, masikLap) => egyikLap.ertek - masikLap.ertek)
  .slice(0, 3);

// feladat 4 - baratunk szeretne tudni a kartyak erteket
const legkisebbLapokErteke = legkisebbLapok.reduce((osszertek, lap) => osszertek + lap.ertek, 0);

// feladat 5 - baratunkat csak az erdekli, hogy milyen szinu lapokat fog kapni
const lapokSzine = legkisebbLapok.map(lap => lap.szin);

