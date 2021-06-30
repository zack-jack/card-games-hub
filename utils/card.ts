import type { Card } from '../types';

/**
 * Convert card hash to card suit
 * @param {String} cardHash (ex. AS is Ace of Spades, 5D is Five of Diamonds)
 * @returns {String}
 */
export const getCardSuit = (cardHash: string): string => {
  if (cardHash === 'JOK') {
    return cardHash;
  }

  return cardHash.split('').pop() || '';
};

/**
 * Convert card hash to card rank
 * @param {String} cardHash (ex. AS is Ace of Spades, 5D is Five of Diamonds)
 * @returns {String}
 */
export const getCardRank = (cardHash: string): string => {
  if (cardHash === 'JOK') {
    return cardHash;
  }

  if (cardHash.length > 2) {
    return '10';
  }

  return cardHash.split('').shift() || '';
};

/**
 * Generate card properties
 * @param {String} id unique identifier
 * @param {String} cardHash (ex. AS is Ace of Spades, 5D is Five of Diamonds)
 * @returns {Object}
 */
export const getCardProps = (id: string, cardHash: string): Card => ({
  id,
  hash: cardHash,
  rank: getCardRank(cardHash),
  suit: getCardSuit(cardHash),
  flipped: false,
});
