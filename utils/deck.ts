import { v4 as uuidv4 } from 'uuid';
import type { Card, DeckConstructor } from '../types';
import { getCardProps } from './card';

export default class Deck {
  cards: Card[] = [];

  numDecks: number;

  includeJokers: boolean;

  suits: string[] = ['S', 'D', 'H', 'C'];

  ranks: string[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

  constructor(options: DeckConstructor = {}) {
    const { numDecks, includeJokers } = options;

    this.numDecks = numDecks || 1;
    this.includeJokers = includeJokers || false;

    this.buildDeck();
  }

  /**
   * Build deck with specified constructor values
   */
  buildDeck() {
    const cardHashes = this.suits
      .flatMap((suit): string[] => this.ranks.map((rank): string => rank + suit));

    if (this.includeJokers) {
      cardHashes.push(...['JOK', 'JOK']);
    }

    const cards = cardHashes.map((hash) => {
      const id = uuidv4();
      return getCardProps(id, hash);
    });

    const mergedDecks = Array(this.numDecks)
      .fill([...cards])
      .reduce((a, b) => a.concat(b));

    this.cards = [...mergedDecks];
  }
}
