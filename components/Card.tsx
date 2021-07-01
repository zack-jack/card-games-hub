import { ReactElement } from 'react';
import { cardSymbolsMap } from '../utils/cardSymbolsMap';

interface CardProps {
  id?: string,
  rank?: string,
  suit?: string,
  flipped?: boolean,
  placeholder?: boolean,
  className?: string,
}

const Card = ({
  id, rank = '', suit = '', flipped = false, placeholder = false, className = '',
}: CardProps): ReactElement => {
  if (placeholder) {
    return <div className={`card card--placeholder ${className}`} />;
  }

  if (flipped) {
    return <div className={`card card--flipped ${className}`} />;
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
      return <div className={`card__symbol card__symbol--${rankMap[rank]}`} />;
    }

    const symbolColumns = cardSymbolsMap[rank];

    return symbolColumns.map((count, i) => {
      const symbolsArr = count ? new Array(count).fill(null) : [];

      return (
        <div
          key={`${id}-${i + 1}-${count}`}
          className="card__symbol-col"
        >
          {
            symbolsArr.map((_, j) => (
              <div
                key={`${id}-${i + 1}-symbol-${j + 1}`}
                className="card__symbol"
              />
            ))
          }
        </div>
      );
    });
  };

  return (
    <div className={`card card--${suitMap[suit]} ${className}`}>
      <span
        data-rank={rank}
        className="card__corner card__corner--top"
      />
      <div className="card__inner">
        {renderCardCenter()}
      </div>
      <span
        data-rank={rank}
        className="card__corner card__corner--bot"
      />
    </div>
  );
};

export default Card;
