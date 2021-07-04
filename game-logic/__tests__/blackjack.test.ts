import { renderHook, act } from '@testing-library/react-hooks';
import useBlackjack from '../blackjack';

const AceOfSpades = {
  id: 'AS', hash: 'AS', rank: 'A', suit: 'S',
};
const KingOfSpades = {
  id: 'KS', hash: 'KS', rank: 'K', suit: 'S',
};
const QueenOfSpades = {
  id: 'QS', hash: 'QS', rank: 'Q', suit: 'S',
};
const JackOfSpades = {
  id: 'JS', hash: 'JS', rank: 'J', suit: 'S',
};
const TenOfSpades = {
  id: '10S', hash: '10S', rank: '10', suit: 'S',
};
const NineOfSpades = {
  id: '9S', hash: '9S', rank: '9', suit: 'S',
};
const TwoOfSpades = {
  id: '2S', hash: '2S', rank: '2', suit: 'S',
};

[
  { hand: [AceOfSpades, KingOfSpades], score: 21 },
  { hand: [AceOfSpades, QueenOfSpades], score: 21 },
  { hand: [AceOfSpades, JackOfSpades], score: 21 },
  { hand: [AceOfSpades, TenOfSpades], score: 21 },
  { hand: [AceOfSpades, NineOfSpades], score: 20 },
  { hand: [KingOfSpades, QueenOfSpades], score: 20 },
  { hand: [KingOfSpades, JackOfSpades], score: 20 },
  { hand: [KingOfSpades, TenOfSpades], score: 20 },
  { hand: [KingOfSpades, NineOfSpades], score: 19 },
  { hand: [AceOfSpades, TwoOfSpades], score: 13 },
  { hand: [KingOfSpades, TwoOfSpades], score: 12 },
  { hand: [QueenOfSpades, TwoOfSpades], score: 12 },
  { hand: [JackOfSpades, TwoOfSpades], score: 12 },
  { hand: [TenOfSpades, TwoOfSpades], score: 12 },
  { hand: [AceOfSpades, AceOfSpades], score: 12 },
  { hand: [NineOfSpades, TwoOfSpades], score: 11 },
].forEach(({ hand, score }) => {
  test(`For a hand of ${hand[0].rank}, ${hand[1].rank}, the score should be ${score}`, () => {
    const { result } = renderHook(() => useBlackjack());

    act(() => {
      result.current.setDealerScore(result.current.calculateScore(hand));
      result.current.setPlayerScore(result.current.calculateScore(hand));
    });

    expect(result.current.dealerScore).toBe(score);
    expect(result.current.playerScore).toBe(score);
  });
});

[
  { dealerScore: 22, playerScore: 21, message: 'Blackjack! Player wins!' },
  { dealerScore: 22, playerScore: 10, message: 'Dealer busted, Player wins!' },
  { dealerScore: 20, playerScore: 22, message: 'Player busted, Dealer wins!' },
  { dealerScore: 18, playerScore: 19, message: 'Player wins!' },
  { dealerScore: 19, playerScore: 18, message: 'Dealer wins!' },
  { dealerScore: 0, playerScore: 0, message: '' },
].forEach(({ dealerScore, playerScore, message }) => {
  test(`Given a dealer score of ${dealerScore} and a player score of ${playerScore},
        message should be ${message || 'empty'}`, () => {
    const { result } = renderHook(() => useBlackjack());

    act(() => {
      result.current.setDealerScore(dealerScore);
      result.current.setPlayerScore(playerScore);
      result.current.setIsRoundComplete(true);
    });

    expect(result.current.declareWinner()).toBe(message);
  });
});
