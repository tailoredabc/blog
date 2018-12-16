import { kartyalap } from './utils';
import { lapokOsszege } from './index';

describe('lapokOsszege', () => {
  it('meg kell mondja a lapok osszeget', () => {
    const lapok = [
      kartyalap('pikk', '9', 9),
      kartyalap('káró', '5', 5),
      kartyalap('kőr', 'K', 10),
      kartyalap('treff', '3', 3),
    ];

    const result = lapokOsszege(lapok);

    expect(result).toEqual(27);
  });
});
