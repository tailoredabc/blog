import { kartyalap } from './utils';
import { lapokSzinei } from './index';

describe('lapokSzinei', () => {
  it('meg kell mondja a lapok szineit', () => {
    const lapok = [
      kartyalap('pikk', '9', 9),
      kartyalap('káró', '5', 5),
      kartyalap('kőr', 'K', 10),
      kartyalap('treff', '3', 3),
    ];

    const result = lapokSzinei(lapok);

    const expectedResult = ['pikk', 'káró', 'kőr', 'treff'];
    expect(result).toEqual(expectedResult);
  });
});
