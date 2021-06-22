import React from 'react';
import { cardSymbolsMap } from '../utils/cardSymbolsMap';

type PlayingCardProps = {
  id: string,
  rank: string,
  suit: string,
}

const PlayingCard: React.FC<PlayingCardProps> = ({ id, rank, suit }) => {
  const faceCards = ['J', 'Q', 'K'];
  const specialRanks = ['A', ...faceCards, 'JOK'];

  const renderSymbols = () => {
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

  const renderCardCenter = () => {
    const rankMap: Record<string, string> = {
      A: 'ace',
      J: 'jack',
      Q: 'queen',
      K: 'king',
      JOK: 'joker',
    };

    if (specialRanks.indexOf(rank) > -1) {
      return <div className={`playing-card__symbol playing-card__symbol--${rankMap[rank]}`} />;
    }

    return renderSymbols();
  };

  return (
    <div className={`playing-card playing-card--${suit}`}>
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
