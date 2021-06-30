import { v4 as uuid } from 'uuid';
import PlayingCard from '../components/PlayingCard';

const Blackjack = () => (
  <main className="flex-grow w-full bg-green-500">
    <h1>
      Welcome to Blackjack!
    </h1>
    <div className="flex flex-wrap">
      <PlayingCard
        id={uuid()}
        rank="A"
        suit="spades"
      />
      <PlayingCard
        id={uuid()}
        rank="2"
        suit="spades"
        flipped
        className="ml-6"
      />
    </div>
  </main>
);

export default Blackjack;
