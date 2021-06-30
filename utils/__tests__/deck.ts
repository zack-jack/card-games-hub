import { v4 as uuidv4 } from 'uuid';
import Deck from '../deck';

jest.mock('uuid');

beforeEach(() => {
  (uuidv4 as jest.Mock).mockReturnValueOnce('1234');
});

test('Deck cards should have two jokers | when instantiated with "includeJokers" of true', () => {
  const deck = new Deck({ includeJokers: true });
  const jokers = deck.cards.filter(({ hash }) => hash === 'JOK');

  expect(jokers.length).toBe(2);
});

test('Deck cards has one deck without jokers | when instantiated without args', () => {
  const deck = new Deck();
  const jokers = deck.cards.filter(({ hash }) => hash === 'JOK');

  expect(deck.cards.length).toBe(52);
  expect(jokers.length).toBe(0);
});

test('Deck cards has six decks without jokers | when instantiated with "numDecks" of six', () => {
  const deck = new Deck({ numDecks: 6 });
  const jokers = deck.cards.filter(({ hash }) => hash === 'JOK');

  expect(deck.cards.length).toBe(312);
  expect(jokers.length).toBe(0);
});
