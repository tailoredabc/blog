import { kartyalap } from './index';

describe('kartyalap', () => {
  it('erteke nem lehet kisebb mint 0', () => {
    expect(() => createCardWithValue(-1)).toThrowError('Hibas érték!');
  });

  it('erteke nem lehet 0', () => {
    expect(() => createCardWithValue(0)).toThrowError('Hibas érték!');
  });

  it('erteke nem lehet nagyobb mint 10', () => {
    expect(() => createCardWithValue(11)).toThrowError('Hibas érték!');
  });

  it('erteke lehet 10', () => {
    expect(() => createCardWithValue(10)).not.toThrowError('Hibas érték!');
  });

  function createCardWithValue(value) {
    return kartyalap(expect.any(String), expect.any(String), value);
  }
});
