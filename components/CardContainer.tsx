import { ReactElement } from 'react';
import type { Card as CardType } from '../types';
import Card from './Card';

interface CardContainerProps {
  cards: CardType[],
  flippedIndices?: number[],
  maxPerRow?: number,
  name: string,
  className: string,
}

const CardContainer = ({
  cards,
  flippedIndices = [],
  maxPerRow = 4,
  name,
  className = '',
}: CardContainerProps): ReactElement => {
  const cardWidth = 172;
  const cardGap = 24;
  const containerStyle = {
    width: `${(cardWidth * maxPerRow) + (cardGap * (maxPerRow - 1))}px`,
  };

  const cardClassName = (index: number, numSiblings: number) => {
    if (index === 0 && numSiblings >= 4) return '';
    if (index > 3) return 'mt-6 ml-6';
    return 'ml-6';
  };

  return (
    <div
      style={containerStyle}
      className={`flex flex-wrap justify-end ${className}`}
    >
      {
        cards?.length < 4 && [...Array(4 - cards?.length).keys()]
          .map((i) => (
            <Card
              key={`${name}-placeholder-${i + 1}`}
              testId={`${name}-placeholder-${i + 1}`}
              placeholder
              className={`${i > 0 ? 'ml-6' : ''}`}
            />
          ))
      }
      {
        cards?.length > 0 && cards.map(({ id, rank, suit }, i) => (
          <Card
            id={id}
            key={id}
            testId={`${name}-card-${i + 1}`}
            rank={rank}
            suit={suit}
            flipped={flippedIndices.indexOf(i) >= 0}
            className={cardClassName(i, cards.length || 0)}
          />
        ))
      }
    </div>
  );
};

export default CardContainer;
