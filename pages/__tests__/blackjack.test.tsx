import { fireEvent, render, screen } from '@testing-library/react';
import Blackjack from '../blackjack';

const page = {
  house: {
    card1: 'house-card-1',
    card2: 'house-card-2',
    placeholder1: 'house-placeholder-1',
    placeholder2: 'house-placeholder-2',
  },
  player: {
    card1: 'player-card-1',
    card2: 'player-card-2',
    placeholder1: 'player-placeholder-1',
    placeholder2: 'player-placeholder-2',
  },
  deck: 'deck',
  button: {
    deal: 'Deal',
    hit: 'Hit',
    stand: 'Stand',
  },
};

test('Card placeholders are rendered | prior to dealing', () => {
  render(<Blackjack />);

  expect(screen.queryByTestId(page.house.card1)).not.toBeInTheDocument();
  expect(screen.queryByTestId(page.house.card2)).not.toBeInTheDocument();
  expect(screen.queryByTestId(page.player.card1)).not.toBeInTheDocument();
  expect(screen.queryByTestId(page.player.card2)).not.toBeInTheDocument();

  expect(screen.getByTestId(page.house.placeholder1)).toBeInTheDocument();
  expect(screen.getByTestId(page.house.placeholder2)).toBeInTheDocument();
  expect(screen.getByTestId(page.player.placeholder1)).toBeInTheDocument();
  expect(screen.getByTestId(page.player.placeholder2)).toBeInTheDocument();
});

test('Cards with value are rendered | when user clicks Deal button', () => {
  render(<Blackjack />);

  fireEvent.click(screen.getByText(page.button.deal));

  expect(screen.queryByTestId(page.house.placeholder1)).not.toBeInTheDocument();
  expect(screen.queryByTestId(page.house.placeholder2)).not.toBeInTheDocument();
  expect(screen.queryByTestId(page.player.placeholder1)).not.toBeInTheDocument();
  expect(screen.queryByTestId(page.player.placeholder2)).not.toBeInTheDocument();

  expect(screen.getByTestId(page.house.card1)).toBeInTheDocument();
  expect(screen.getByTestId(page.house.card2)).toBeInTheDocument();
  expect(screen.getByTestId(page.player.card1)).toBeInTheDocument();
  expect(screen.getByTestId(page.player.card2)).toBeInTheDocument();
});

test('Second house card that is dealt is flipped', () => {
  render(<Blackjack />);

  fireEvent.click(screen.getByText(page.button.deal));

  expect(screen.queryByTestId(page.house.card2)).toHaveClass('card--flipped');
});
