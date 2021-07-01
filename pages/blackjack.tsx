import { MouseEvent, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Card } from '../types';
import { buildDeck, shuffleDeck } from '../utils/deck';
import PlayingCard from '../components/PlayingCard';

interface Player {
  id: string,
  hand: Card[],
  score: number,
}

const Blackjack = () => {
  const [deck, setDeck] = useState<Card[]>([]);
  const [house, setHouse] = useState<Player>({ id: uuidv4(), hand: [], score: 0 });
  const [player, setPlayer] = useState<Player>({ id: uuidv4(), hand: [], score: 0 });

  useEffect(() => {
    const newDeck = buildDeck({ numDecks: 6, includeJokers: false });
    const shuffled = shuffleDeck(newDeck);
    setDeck(shuffled);
  }, []);

  const deal = (e: MouseEvent) => {
    e.preventDefault();

    const shuffled = shuffleDeck(deck);
    const newPlayerHand = [];
    const newHouseHand = [];

    newPlayerHand.push(shuffled.pop() as Card);
    newHouseHand.push(shuffled.pop() as Card);
    newPlayerHand.push(shuffled.pop() as Card);
    newHouseHand.push(shuffled.pop() as Card);

    setPlayer({ ...player, hand: newPlayerHand });
    setHouse({ ...house, hand: newHouseHand });
    setDeck(shuffled);
  };

  return (
    <main className="flex-grow w-full bg-green-500 p-10">
      <div className="flex items-center justify-center">
        <div className="flex flex-col">
          <section>
            <div className="flex">
              {
                house.hand.map(({ id, rank, suit }, i) => (
                  <PlayingCard
                    key={id}
                    id={id}
                    rank={rank}
                    suit={suit}
                    flipped={i === 1}
                    className={i > 0 ? 'ml-6' : ''}
                  />
                ))
              }
            </div>
          </section>
          <section>
            <div className="flex mt-6">
              {
                player.hand.map(({ id, rank, suit }, i) => (
                  <PlayingCard
                    key={id}
                    id={id}
                    rank={rank}
                    suit={suit}
                    className={i > 0 ? 'ml-6' : ''}
                  />
                ))
              }
            </div>
          </section>
        </div>
        <div className="flex flex-col ml-6">
          <PlayingCard
            id={uuidv4()}
            flipped
          />
          <button
            type="button"
            className="btn mt-6"
            onClick={deal}
          >
            Deal
          </button>
        </div>
      </div>
    </main>
  );
};

export default Blackjack;
