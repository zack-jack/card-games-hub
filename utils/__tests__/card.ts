import {
  getCardRank,
  getCardSuit,
  getCardProps,
} from '../card';

[
  ['2S', 'S'],
  ['3C', 'C'],
  ['4H', 'H'],
  ['5D', 'D'],
  ['JOK', 'JOK'],
].forEach(([hash, suit]) => {
  test(`A hash of ${hash} yields a suit of ${suit}`, () => {
    expect(getCardSuit(hash)).toBe(suit);
  });
});

[
  ['2S', '2'],
  ['10C', '10'],
  ['JH', 'J'],
  ['QD', 'Q'],
  ['KC', 'K'],
  ['AS', 'A'],
  ['JOK', 'JOK'],
].forEach(([hash, rank]) => {
  test(`A hash of ${hash} yields a rank of ${rank}`, () => {
    expect(getCardRank(hash)).toBe(rank);
  });
});

test('Card properties can be extracted from card hash', () => {
  const twoOfSpades = getCardProps('test', '2S');

  expect(twoOfSpades).toEqual({
    id: 'test',
    hash: '2S',
    rank: '2',
    suit: 'S',
    flipped: false,
  });
});
