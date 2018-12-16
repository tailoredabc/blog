import { pakliJokerNelkul } from './index';
import { kartyalap } from './utils';

describe('ervenyesLapok', () => {
  it('ki kell vegye a joker lapot', () => {
    const lapok = [
      kartyalap('pikk', 'Q', 10),
      kartyalap('jolly', 'joker', 10),
    ];

    const expectedPakli = lapok.filter(lap => lap.jel !== 'joker');
    expect(pakliJokerNelkul(lapok)).toEqual(expectedPakli);
  });
});
