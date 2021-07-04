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
    runDealerTurn,
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
    runDealerTurn();
  };

  const cardClassName = (index: number) => {
    if (index > 3) return 'mt-6 ml-6';
    if (index > 0) return 'ml-6';
    return '';
  };

  return (
    <main className="flex-grow w-full bg-green-500 p-10">
      <div className="flex justify-evenly max-w-screen-xl mx-auto">
        <div className="flex flex-col">
          <div className="w-full h-14 text-center">
            { declareWinner() && (
            <p
              className="py-4 text-gray-800 font-bold bg-white rounded"
            >
              { declareWinner() }
            </p>
            )}
          </div>
          <section className="mt-6">
            <p
              className="py-2 px-6 text-white text-center font-bold bg-black bg-opacity-30 rounded"
            >
              Dealer
            </p>
            <div className="flex flex-wrap justify-end mt-6">
              {
                dealerHand?.length ? dealerHand.map(({ id, rank, suit }, i) => (
                  <Card
                    id={id}
                    key={id}
                    testId={`dealer-card-${i + 1}`}
                    rank={rank}
                    suit={suit}
                    flipped={i === 1 && !isDealerTurn}
                    className={cardClassName(i)}
                  />
                )) : (
                  [1, 2, 3, 4].map((item) => (
                    <Card
                      key={`dealer-placeholder-${item}`}
                      testId={`dealer-placeholder-${item}`}
                      placeholder
                      className={`${item > 1 ? 'ml-6' : ''}`}
                    />
                  ))
                )
              }
            </div>
          </section>
          <div className="hairline hairline--light mt-8" />
          <section>
            <div className="flex flex-wrap justify-end mt-8">
              {
                playerHand?.length ? playerHand.map(({ id, rank, suit }, i) => (
                  <Card
                    id={id}
                    key={id}
                    testId={`player-card-${i + 1}`}
                    rank={rank}
                    suit={suit}
                    className={cardClassName(i)}
                  />
                )) : (
                  [1, 2, 3, 4].map((item) => (
                    <Card
                      key={`player-placeholder-${item}`}
                      testId={`player-placeholder-${item}`}
                      placeholder
                      className={`${item > 1 ? 'ml-6' : ''}`}
                    />
                  ))
                )
              }
            </div>
            <p
              data-testid="player-score"
              className="mt-6 py-2 px-6 text-white text-center font-bold bg-black bg-opacity-30 rounded"
            >
              Player
            </p>
          </section>
        </div>
        <div className="flex flex-col pt-20">
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
          {
            (playerHand?.length > 0 && !isDealerTurn) && (
              <>
                <button
                  type="button"
                  className="btn mt-6"
                  onClick={hit}
                >
                  Hit
                </button>
                <button
                  type="button"
                  className="btn mt-6"
                  onClick={stay}
                >
                  Stay
                </button>
              </>
            )
          }
        </div>
      </div>
    </main>
  );
};

export default Blackjack;
