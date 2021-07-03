import { MouseEvent, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useBlackjack from '../game-logic/blackjack';
import Card from '../components/Card';

const Blackjack = () => {
  const {
    dealerHand,
    dealerScore,
    isDealerTurn,
    isPlayerBusted,
    playerHand,
    playerScore,
    calculateScore,
    setDealerScore,
    setIsDealerTurn,
    setPlayerScore,
    deal,
    declareWinner,
    drawCard,
    resetGameState,
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
    resetGameState();
    deal();
  };

  const hit = (e: MouseEvent): void => {
    e.preventDefault();

    if (!isPlayerBusted) {
      drawCard('player');
    }
  };

  const stay = (e: MouseEvent): void => {
    e.preventDefault();

    setIsDealerTurn(true);
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
            <div className="flex justify-end mt-6">
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
            <div className="flex justify-end mt-6">
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
              data-testid="player-score"
              className="mt-6 py-2 px-6 text-white font-bold bg-black bg-opacity-30 rounded"
            >
              Player
            </p>
            {
              (playerHand.length > 0 && !isDealerTurn) && (
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
                    onClick={stay}
                  >
                    Stay
                  </button>
                </div>
              )
            }
          </section>
        </div>
        <div className="flex flex-col ml-20 pt-16">
          <div
            className="py-2 text-center text-white font-bold bg-black bg-opacity-30 rounded"
          >
            <p>{`Dealer: ${isDealerTurn ? dealerScore : '-'}`}</p>
            <p>{`Player: ${playerScore}`}</p>
            <p>{`Turn: ${isDealerTurn ? 'Dealer' : 'Player'}`}</p>
          </div>
          <Card
            id={uuidv4()}
            testId="deck"
            flipped
            className="mt-6"
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
