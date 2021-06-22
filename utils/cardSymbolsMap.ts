/**
 * Each card's symbols can be represented in a three column layout
 * with the number of symbols in each column
 *
 * Examples:
 * Two card - [0, 2, 0]
 * Five card - [2, 1, 2]
 * Eight card - [3, 2, 3]
 * Ten card - [4, 2, 4]
 *
 */

export const cardSymbolsMap: Record<string, number[]> = {
  2: [0, 2, 0],
  3: [0, 3, 0],
  4: [2, 0, 2],
  5: [2, 1, 2],
  6: [3, 0, 3],
  7: [3, 1, 3],
  8: [3, 2, 3],
  9: [4, 1, 4],
  10: [4, 2, 4],
};

export default cardSymbolsMap;
