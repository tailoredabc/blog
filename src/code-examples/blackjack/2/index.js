import { kartyalap } from './utils';

const joker = kartyalap('jolly', 'joker', 10);
const lapok = [
  kartyalap('pikk', 'Q', 10),
  kartyalap('káró', '5', 5),
  kartyalap('kőr', 'K', 10),
  kartyalap('treff', '3', 3),
  joker,
];

export function pakliJokerNelkul(pakli) {
  return pakli;
}
