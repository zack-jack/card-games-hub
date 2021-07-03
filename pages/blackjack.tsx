import { MouseEvent, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useBlackjack from '../game-logic/blackjack';
import Card from '../components/Card';

const Blackjack = () => {
  const {
    dealerHand,
    playerHand,
    playerScore,
    calculateScore,
    deal,
    declareWinner,
    setDealerScore,
    setPlayerScore,
  } = useBlackjack();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setDealerScore(calculateScore(dealerHand));
    setPlayerScore(calculateScore(playerHand));

    return () => setLoading(false);
  }, [dealerHand, playerHand]);

  const handleDealClick = (e: MouseEvent): void => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    deal();
  };

  const hit = (e: MouseEvent): void => {
    e.preventDefault();
  };

  const stand = (e: MouseEvent): void => {
    e.preventDefault();
  };

  return (
    <main className="flex-grow w-full bg-green-500 p-10">
      <div className="flex items-start justify-center">
        <div className="flex flex-col">
          <section>
            <p
              className="py-2 px-6 text-white font-bold bg-black bg-opacity-30 rounded"
            >
              Dealer
            </p>
            <div className="flex mt-6">
              {
                dealerHand.length ? dealerHand.map(({ id, rank, suit }, i) => (
                  <Card
                    id={id}
                    key={id}
                    testId={`dealer-card-${i + 1}`}
                    rank={rank}
                    suit={suit}
                    flipped={i === 1}
                    className={i > 0 ? 'ml-6' : ''}
                  />
                )) : (
                  <>
                    <Card
                      testId="dealer-placeholder-1"
                      placeholder
                    />
                    <Card
                      testId="dealer-placeholder-2"
                      placeholder
                      className="ml-6"
                    />
                  </>
                )
              }
            </div>
          </section>
          <section>
            <div className="flex mt-6">
              {
                playerHand.length ? playerHand.map(({ id, rank, suit }, i) => (
                  <Card
                    id={id}
                    key={id}
                    testId={`player-card-${i + 1}`}
                    rank={rank}
                    suit={suit}
                    className={i > 0 ? 'ml-6' : ''}
                  />
                )) : (
                  <>
                    <Card
                      testId="player-placeholder-1"
                      placeholder
                    />
                    <Card
                      testId="player-placeholder-2"
                      placeholder
                      className="ml-6"
                    />
                  </>
                )
              }
            </div>
            <p
              className="mt-6 py-2 px-6 text-white font-bold bg-black bg-opacity-30 rounded"
            >
              { playerScore ? `Player: ${playerScore}` : 'Player' }
            </p>
            {
              playerHand.length > 0 && (
                <div className="flex justify-center mt-6">
                  <button
                    type="button"
                    className="btn w-full"
                    onClick={hit}
                  >
                    Hit
                  </button>
                  <button
                    type="button"
                    className="btn w-full ml-6"
                    onClick={stand}
                  >
                    Stay
                  </button>
                </div>
              )
            }
          </section>
        </div>
        <div className="flex flex-col ml-20 pt-16">
          <Card
            id={uuidv4()}
            testId="deck"
            flipped
          />
          <button
            type="button"
            disabled={loading}
            className="btn mt-6"
            onClick={handleDealClick}
          >
            { loading ? 'Dealing...' : 'Deal' }
          </button>
          { declareWinner() && (
            <p
              className="mt-6 py-2 text-center text-white font-bold bg-black bg-opacity-30 rounded"
            >
              { declareWinner() }
            </p>
          )}
        </div>
      </div>
    </main>
  );
};

export default Blackjack;
