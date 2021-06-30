import { ReactElement } from 'react';
import { cardSymbolsMap } from '../utils/cardSymbolsMap';

interface PlayingCardProps {
  id: string,
  rank: string,
  suit: string,
  flipped?: boolean,
  className?: string,
}

const PlayingCard = ({
  id, rank, suit, flipped = false, className = '',
}: PlayingCardProps): ReactElement => {
  if (flipped) {
    return <div className={`playing-card playing-card--flipped ${className}`} />;
  }

  const faceCards = ['J', 'Q', 'K'];
  const specialRanks = ['A', ...faceCards, 'JOK'];
  const rankMap: Record<string, string> = {
    A: 'ace',
    J: 'jack',
    Q: 'queen',
    K: 'king',
    JOK: 'joker',
  };
  const suitMap: Record<string, string> = {
    C: 'clubs',
    D: 'diamonds',
    H: 'hearts',
    S: 'spades',
  };

  const renderCardCenter = () => {
    if (specialRanks.indexOf(rank) > -1) {
      return <div className={`playing-card__symbol playing-card__symbol--${rankMap[rank]}`} />;
    }

    const symbolColumns = cardSymbolsMap[rank];

    return symbolColumns.map((count, i) => {
      const symbolsArr = count ? new Array(count).fill(null) : [];

      return (
        <div
          key={`${id}-${i + 1}-${count}`}
          className="playing-card__symbol-col"
        >
          {
            symbolsArr.map((_, j) => (
              <div
                key={`${id}-${i + 1}-symbol-${j + 1}`}
                className="playing-card__symbol"
              />
            ))
          }
        </div>
      );
    });
  };

  return (
    <div className={`playing-card playing-card--${suitMap[suit]} ${className}`}>
      <span
        data-rank={rank}
        className="playing-card__corner playing-card__corner--top"
      />
      <div className="playing-card__inner">
        {renderCardCenter()}
      </div>
      <span
        data-rank={rank}
        className="playing-card__corner playing-card__corner--bot"
      />
    </div>
  );
};

export default PlayingCard;
