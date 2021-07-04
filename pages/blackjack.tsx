import { MouseEvent, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useBlackjack from '../game-logic/blackjack';
import Card from '../components/Card';
import CardContainer from '../components/CardContainer';

const Blackjack = () => {
  const {
    dealerHand,
    dealerScore,
    isDealerTurn,
    isPlayerBusted,
    isRoundComplete,
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
            <CardContainer
              cards={dealerHand}
              flippedIndices={!isDealerTurn ? [1] : []}
              name="dealer"
              className="mt-6"
            />
          </section>
          <div className="hairline hairline--light mt-8" />
          <section>
            <CardContainer
              cards={playerHand}
              name="player"
              className="mt-8"
            />
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
            (playerHand?.length > 0 && !isDealerTurn && !isRoundComplete) && (
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
