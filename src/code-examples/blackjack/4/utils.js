export function kartyalap(szin, jel, ertek) {
  if (ertek < 1 || ertek > 10) {
    throw new Error();
  }

  return {
    jel,
    szin,
    ertek,
  };
}
