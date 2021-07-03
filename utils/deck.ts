import type { Card } from '../types';
import { buildCardFromHash } from './card';

/**
 * Build deck with specified constructor values
 * @param numDecks {Number} number of decks to include
 * @param includeJokers {String} deck should contain 2 jokers
 * @returns {Array} cards
 */
export const buildDeck = ({ numDecks = 1, includeJokers = false } = {}): Card[] => {
  const suits: string[] = ['S', 'D', 'H', 'C'];
  const ranks: string[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

  const cardHashes = suits.flatMap((suit): string[] => ranks.map((rank): string => rank + suit));

  if (includeJokers) {
    cardHashes.push(...['JOK', 'JOK']);
  }

  const mergedDecks: Card[] = [];

  Array.from(Array(numDecks).keys()).forEach(() => {
    const cards = cardHashes.map((hash) => buildCardFromHash(hash));
    mergedDecks.push(...cards);
  });

  return mergedDecks;
};

/**
 * Shuffle cards in the deck
 * @param deck {String} deck to shuffle
 * @returns {Array} shuffled deck
 */
export const shuffleDeck = (deck: Card[]): Card[] => {
  const shuffled = [...deck];
  let i = shuffled.length - 1;

  while (i > 0) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = shuffled[i];
    shuffled[i] = shuffled[j];
    shuffled[j] = temp;
    i -= 1;
  }

  return shuffled;
};
