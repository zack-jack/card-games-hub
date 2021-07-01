import { MouseEvent, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Card as CardType } from '../types';
import { buildDeck, shuffleDeck } from '../utils/deck';
import Card from '../components/Card';

interface Player {
  id: string,
  hand: CardType[],
  score: number,
}

const Blackjack = () => {
  const [deck, setDeck] = useState<CardType[]>([]);
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

    newPlayerHand.push(shuffled.pop() as CardType);
    newHouseHand.push(shuffled.pop() as CardType);
    newPlayerHand.push(shuffled.pop() as CardType);
    newHouseHand.push(shuffled.pop() as CardType);

    setPlayer({ ...player, hand: newPlayerHand });
    setHouse({ ...house, hand: newHouseHand });
    setDeck(shuffled);
  };

  return (
    <main className="flex-grow w-full bg-green-500 p-10">
      <div className="flex items-center justify-center">
        <div className="flex flex-col">
          <section>
            <p className="text-center">House</p>
            <div className="flex mt-6">
              {
                house.hand.length ? house.hand.map(({ id, rank, suit }, i) => (
                  <Card
                    key={id}
                    id={id}
                    rank={rank}
                    suit={suit}
                    flipped={i === 1}
                    className={i > 0 ? 'ml-6' : ''}
                  />
                )) : (
                  <>
                    <Card placeholder />
                    <Card placeholder className="ml-6" />
                  </>
                )
              }
            </div>
          </section>
          <section>
            <div className="flex mt-6">
              {
                player.hand.length ? player.hand.map(({ id, rank, suit }, i) => (
                  <Card
                    key={id}
                    id={id}
                    rank={rank}
                    suit={suit}
                    className={i > 0 ? 'ml-6' : ''}
                  />
                )) : (
                  <>
                    <Card placeholder />
                    <Card placeholder className="ml-6" />
                  </>
                )
              }
            </div>
            <p className="mt-6 text-center">Player</p>
          </section>
        </div>
        <div className="flex flex-col ml-20">
          <Card
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
