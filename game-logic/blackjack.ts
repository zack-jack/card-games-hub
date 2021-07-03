import { useEffect, useState } from 'react';
import type { Card as CardType } from '../types';
import { buildDeck, shuffleDeck } from '../utils/deck';

const useBlackjack = () => {
  const [deck, setDeck] = useState<CardType[]>([]);
  const [dealerHand, setDealerHand] = useState<CardType[]>([]);
  const [dealerScore, setDealerScore] = useState<number>(0);
  const [playerHand, setPlayerHand] = useState<CardType[]>([]);
  const [playerScore, setPlayerScore] = useState<number>(0);

  useEffect(() => {
    const newDeck = buildDeck({ numDecks: 6, includeJokers: false });
    const shuffled = shuffleDeck(newDeck);
    setDeck(shuffled);
  }, []);

  const declareWinner = (): string => {
    if (playerScore === 0 && dealerScore === 0) return '';
    if (playerScore === dealerScore) return 'Tie!';
    if (playerScore === 21) return 'Blackjack! Player wins!';
    if (dealerScore > 21) return 'Dealer busted, Player wins!';
    if (playerScore > 21) return 'Player busted, Dealer wins!';
    if (playerScore > dealerScore) return 'Player wins!';
    if (dealerScore > playerScore) return 'Dealer wins!';
    return '';
  };

  const calculateScore = (hand: CardType[]): number => {
    if (!hand.length) return 0;

    const newScore = hand
      // hand must be pre-sorted such that Aces are last
      .sort(({ rank }) => {
        if (rank === 'A') return 1;
        return -1;
      })
      .reduce((acc, { rank }): number => {
        if (rank === 'A' && acc <= 10) return acc + 11;
        if (rank === 'A' && acc > 10) return acc + 1;
        if (['J', 'Q', 'K'].indexOf(rank) >= 0) return acc + 10;

        return acc + Number(rank);
      }, 0);

    return newScore;
  };

  const deal = (): void => {
    setPlayerScore(0);
    setDealerScore(0);

    const shuffled = shuffleDeck(deck);
    const newPlayerHand: CardType[] = [];
    const newDealerHand: CardType[] = [];

    newPlayerHand.push(shuffled.pop() as CardType);
    newDealerHand.push(shuffled.pop() as CardType);
    newPlayerHand.push(shuffled.pop() as CardType);
    newDealerHand.push(shuffled.pop() as CardType);

    setPlayerHand(newPlayerHand);
    setDealerHand(newDealerHand);
    setDeck(shuffled);
  };

  return {
    // State
    deck,
    dealerHand,
    dealerScore,
    playerHand,
    playerScore,
    // State setters
    setDealerScore,
    setPlayerScore,
    // Functions
    calculateScore,
    deal,
    declareWinner,

  };
};

export default useBlackjack;
