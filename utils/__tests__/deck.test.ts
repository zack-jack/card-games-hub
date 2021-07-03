import { buildDeck, shuffleDeck } from '../deck';

test('Deck cards has one deck without jokers | when built without passing any args', () => {
  const deck = buildDeck();
  const jokers = deck.filter(({ hash }) => hash === 'JOK');

  expect(deck.length).toBe(52);
  expect(jokers.length).toBe(0);
});

test('Deck cards should have two jokers | when passed "includeJokers" of true', () => {
  const deck = buildDeck({ includeJokers: true });
  const jokers = deck.filter(({ hash }) => hash === 'JOK');

  expect(jokers.length).toBe(2);
});

test('Deck cards has six decks without jokers | when passed "numDecks" of six', () => {
  const deck = buildDeck({ numDecks: 6 });
  const jokers = deck.filter(({ hash }) => hash === 'JOK');

  expect(deck.length).toBe(52 * 6);
  expect(jokers.length).toBe(0);
});

test('Deck cards are in randomized order | when deck is shuffled', () => {
  const deck1 = buildDeck();
  const deck2 = [...deck1];

  expect(deck1).toStrictEqual(deck2);

  const shuffledDeck1 = shuffleDeck(deck1);

  expect(shuffledDeck1).not.toStrictEqual(deck2);
});

test('Card ids are unique | when multiple decks are used', () => {
  const deck = buildDeck({ numDecks: 2 });
  const cardIds = deck.map(({ id }) => id);
  const unique = new Set(cardIds);

  expect(unique.size).toEqual(cardIds.length);
});
