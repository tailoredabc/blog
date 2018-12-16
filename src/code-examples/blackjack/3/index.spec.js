import { kartyalap } from './utils';
import { legkisebb3Lap } from './index';

describe('legkisebb3Lap', () => {
  it('sorba rendezve kell adjon 3 lapot', () => {
    const lapok = [
      kartyalap('pikk', '9', 9),
      kartyalap('káró', '5', 5),
      kartyalap('kőr', 'K', 10),
      kartyalap('treff', '3', 3),
    ];

    const result = legkisebb3Lap(lapok);

    const expectedResult = [
      kartyalap('treff', '3', 3),
      kartyalap('káró', '5', 5),
      kartyalap('pikk', '9', 9),
    ];
    expect(result).toEqual(expectedResult);
  });
});
