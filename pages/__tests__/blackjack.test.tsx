import { fireEvent, render, screen } from '@testing-library/react';
import Blackjack from '../blackjack';

const page = {
  dealer: {
    card1: 'dealer-card-1',
    card2: 'dealer-card-2',
    placeholder1: 'dealer-placeholder-1',
    placeholder2: 'dealer-placeholder-2',
  },
  player: {
    card1: 'player-card-1',
    card2: 'player-card-2',
    card3: 'player-card-3',
    placeholder1: 'player-placeholder-1',
    placeholder2: 'player-placeholder-2',
    score: 'player-score',
  },
  turn: {
    player: 'Turn: Player',
    dealer: 'Turn: Dealer',
  },
  deck: 'deck',
  button: {
    deal: 'Deal',
    hit: 'Hit',
    stay: 'Stay',
  },
};

test('Card placeholders are rendered | prior to dealing', () => {
  render(<Blackjack />);

  expect(screen.queryByTestId(page.dealer.card1)).not.toBeInTheDocument();
  expect(screen.queryByTestId(page.dealer.card2)).not.toBeInTheDocument();
  expect(screen.queryByTestId(page.player.card1)).not.toBeInTheDocument();
  expect(screen.queryByTestId(page.player.card2)).not.toBeInTheDocument();

  expect(screen.getByTestId(page.dealer.placeholder1)).toBeInTheDocument();
  expect(screen.getByTestId(page.dealer.placeholder2)).toBeInTheDocument();
  expect(screen.getByTestId(page.player.placeholder1)).toBeInTheDocument();
  expect(screen.getByTestId(page.player.placeholder2)).toBeInTheDocument();
});

test('Cards with value are rendered | when user clicks Deal button', () => {
  render(<Blackjack />);

  fireEvent.click(screen.getByText(page.button.deal));

  expect(screen.queryByTestId(page.dealer.placeholder1)).not.toBeInTheDocument();
  expect(screen.queryByTestId(page.dealer.placeholder2)).not.toBeInTheDocument();
  expect(screen.queryByTestId(page.player.placeholder1)).not.toBeInTheDocument();
  expect(screen.queryByTestId(page.player.placeholder2)).not.toBeInTheDocument();

  expect(screen.getByTestId(page.dealer.card1)).toBeInTheDocument();
  expect(screen.getByTestId(page.dealer.card2)).toBeInTheDocument();
  expect(screen.getByTestId(page.player.card1)).toBeInTheDocument();
  expect(screen.getByTestId(page.player.card2)).toBeInTheDocument();
});

test('Second dealer card that is dealt is flipped', () => {
  render(<Blackjack />);

  fireEvent.click(screen.getByText(page.button.deal));

  expect(screen.queryByTestId(page.dealer.card2)).toHaveClass('card--flipped');
});

test('Next card is added to player hand | when user clicks Hit button', () => {
  render(<Blackjack />);

  fireEvent.click(screen.getByText(page.button.deal));
  fireEvent.click(screen.getByText(page.button.hit));

  expect(screen.getByTestId(page.player.card1)).toBeInTheDocument();
  expect(screen.getByTestId(page.player.card2)).toBeInTheDocument();
  expect(screen.getByTestId(page.player.card3)).toBeInTheDocument();
});

test('Dealer turn starts | when user clicks Stay button', () => {
  render(<Blackjack />);

  fireEvent.click(screen.getByText(page.button.deal));
  fireEvent.click(screen.getByText(page.button.stay));

  expect(screen.queryByText(page.turn.player)).not.toBeInTheDocument();
  expect(screen.queryByText(page.turn.dealer)).toBeInTheDocument();
});
