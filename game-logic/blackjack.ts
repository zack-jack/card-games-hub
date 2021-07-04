import { useEffect, useState } from 'react';
import type { Card as CardType } from '../types';
import { buildDeck, shuffleDeck } from '../utils/deck';

const useBlackjack = () => {
  const [deck, setDeck] = useState<CardType[]>([]);
  const [dealerHand, setDealerHand] = useState<CardType[]>([]);
  const [dealerScore, setDealerScore] = useState<number>(0);
  const [isDealerTurn, setIsDealerTurn] = useState<boolean>(false);
  const [isPlayerBusted, setIsPlayerBusted] = useState<boolean>(false);
  const [isRoundComplete, setIsRoundComplete] = useState<boolean>(false);
  const [playerHand, setPlayerHand] = useState<CardType[]>([]);
  const [playerScore, setPlayerScore] = useState<number>(0);

  useEffect(() => {
    const newDeck = buildDeck({ numDecks: 6, includeJokers: false });
    const shuffled = shuffleDeck(newDeck);
    setDeck(shuffled);
  }, []);

  useEffect(() => () => resetGameState(), []);

  useEffect(() => {
    setIsPlayerBusted(playerScore > 21);
  }, [playerScore]);

  useEffect(() => {
    if (isPlayerBusted) {
      setIsDealerTurn(true);
    }
  }, [isPlayerBusted]);

  useEffect(() => {
    if (!isRoundComplete && isDealerTurn && dealerScore >= 17) {
      setIsRoundComplete(true);
    }

    if (!isRoundComplete && isDealerTurn && dealerScore < 17) {
      runDealerTurn();
    }
  }, [dealerScore]);

  const runDealerTurn = () => {
    if (dealerScore >= 17) {
      setIsRoundComplete(true);
      return;
    }

    drawCard('dealer');
    setDealerScore(calculateScore(dealerHand));
  };

  const declareWinner = (): string => {
    if (playerScore === 21) return 'Blackjack! Player wins!';
    if (dealerScore === 21) return 'Blackjack! Dealer wins!';
    if (isPlayerBusted) return 'Player busted, Dealer wins!';
    if (!isRoundComplete || (playerScore === 0 && dealerScore === 0)) return '';
    if (dealerScore > 21) return 'Dealer busted, Player wins!';
    if (playerScore === dealerScore) return 'Tie!';
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

  const drawCard = (personEnum: 'player' | 'dealer') => {
    const nextCard: CardType = deck.pop() as CardType;

    if (personEnum === 'player') {
      setPlayerHand([...playerHand, nextCard]);
    } else {
      setDealerHand([...dealerHand, nextCard]);
    }
  };

  const resetGameState = () => {
    setDealerHand([]);
    setDealerScore(0);
    setIsDealerTurn(false);
    setIsPlayerBusted(false);
    setIsRoundComplete(false);
    setPlayerScore(0);
    setPlayerHand([]);
  };

  return {
    // State
    dealerHand,
    dealerScore,
    deck,
    isDealerTurn,
    isPlayerBusted,
    isRoundComplete,
    playerHand,
    playerScore,
    // State setters
    setDealerHand,
    setDealerScore,
    setDeck,
    setIsDealerTurn,
    setIsPlayerBusted,
    setIsRoundComplete,
    setPlayerHand,
    setPlayerScore,
    // Functions
    calculateScore,
    deal,
    declareWinner,
    drawCard,
    resetGameState,
    runDealerTurn,
  };
};

export default useBlackjack;
