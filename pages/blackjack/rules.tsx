/* eslint-disable max-len */
import { ReactElement } from 'react';

const Rules = (): ReactElement => (
  <main className="flex-grow w-full p-10 bg-gray-100">
    <div className="flex justify-between max-w-screen-xl mx-auto">
      <div className="w-3/12">
        <div className="px-6 py-10 bg-gray-800">
          <h1 className="font-bold text-white text-xl">How To Play: Blackjack</h1>
        </div>
      </div>
      <div className="w-8/12">
        <p>
          Equally well known as Twenty-One. The rules are simple, the play is thrilling, and there is opportunity for high strategy.
        </p>
        <p className="mt-3">
          While the popularity of Blackjack dates from World War I, its roots go back to the 1760s in France, where it is called Vingt-et-Un (French for 21). Today, Blackjack is the one card game that can be found in every American gambling casino.
        </p>
        <h2 className="font-bold text-lg mt-6">
          Object of the Game
        </h2>
        <p className="mt-3">
          The participant attempts to beat the dealer by getting a count as close to 21 as possible, without going over 21.
        </p>
        <h2 className="font-bold text-lg mt-6">
          The Pack
        </h2>
        <p className="mt-3">
          The standard 52-card pack is used, with six of these decks of cards shuffled together to form the main deck.
        </p>
        <h2 className="font-bold text-lg mt-6">
          Card Values/Scoring
        </h2>
        <p className="mt-3">
          An ace is worth 1 or 11. Face cards are 10 and any other card is its pip value.
        </p>
        <h2 className="font-bold text-lg mt-6">
          The Deal
        </h2>
        <p className="mt-3">
          The dealer gives one card face up to the player and then one card face up to themselves. Another round of card is then dealt face up to the player, but the dealer takes the second card face down. Thus, the player receives two cards face up, and the dealer receives one card face up and one card face down.
        </p>
        <h2 className="font-bold text-lg mt-6">
          The Play
        </h2>
        <p className="mt-3">
          The player goes first and must decide whether to &quot;stay&quot; (not ask for another card) or &quot;hit&quot; (ask for another card in an attempt to get closer to a count of 21, or even hit 21 exactly). Thus, a player may stay on the two cards originally dealt to them, or they may ask the dealer for additional cards, one at a time, until deciding to stay on the total (if it is 21 or under), or goes &quot;bust&quot; (if it is over 21). In the latter case, the player loses.
        </p>
        <h2 className="font-bold text-lg mt-6">
          The Dealer&apos;s Play
        </h2>
        <p>
          When the dealer has served the player, the dealers face-down card is turned up. If the total is 17 or more, it must stay. If the total is 16 or under, they must take a card. The dealer must continue to take cards until the total is 17 or more, at which point the dealer must stay. If the dealer has an ace, and counting it as 11 would bring the total to 17 or more (but not over 21), the dealer must count the ace as 11 and stay. The dealer&apos;s decisions, then, are automatic on all plays, whereas the player always has the option of taking one or more cards.
        </p>
      </div>
    </div>
  </main>
);

export default Rules;
