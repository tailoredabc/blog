import { elemFelvetele } from './index';

describe('elemFelvetele', () => {
  it('hozza kell adjon egy element a tombhoz', () => {
    const arr = [1];

    const actual = elemFelvetele(arr, 2);

    expect(actual)
      .toEqual([1, 2]);
  });

  it('nem lehet mellekhatasa', () => {
    const initialElement = 1;
    const arr = [initialElement];

    for (let i = 0; i < 3; i++) {
      const actual = elemFelvetele(arr, i);
      expect(actual).toEqual([initialElement, i]);
    }
  });
});
