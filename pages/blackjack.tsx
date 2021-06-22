import { v4 as uuid } from 'uuid';
import PlayingCard from '../components/PlayingCard';

const Blackjack = () => (
  <main className="flex-grow w-full bg-green-500">
    <h1>
      Welcome to Blackjack!
    </h1>
    <div className="flex">
      <PlayingCard
        id={uuid()}
        rank="A"
        suit="hearts"
      />
      <PlayingCard
        id={uuid()}
        rank="2"
        suit="hearts"
      />
      <PlayingCard
        id={uuid()}
        rank="3"
        suit="hearts"
      />
      <PlayingCard
        id={uuid()}
        rank="4"
        suit="hearts"
      />
    </div>
    <div className="flex">
      <PlayingCard
        id={uuid()}
        rank="5"
        suit="hearts"
      />
      <PlayingCard
        id={uuid()}
        rank="6"
        suit="hearts"
      />
      <PlayingCard
        id={uuid()}
        rank="7"
        suit="hearts"
      />
      <PlayingCard
        id={uuid()}
        rank="8"
        suit="hearts"
      />
    </div>
    <div className="flex">
      <PlayingCard
        id={uuid()}
        rank="9"
        suit="hearts"
      />
      <PlayingCard
        id={uuid()}
        rank="10"
        suit="hearts"
      />
    </div>
    <div className="flex">
      <PlayingCard
        id={uuid()}
        rank="J"
        suit="hearts"
      />
      <PlayingCard
        id={uuid()}
        rank="Q"
        suit="hearts"
      />
      <PlayingCard
        id={uuid()}
        rank="K"
        suit="hearts"
      />
      <PlayingCard
        id={uuid()}
        rank="JOK"
        suit="joker"
      />
    </div>
  </main>
);

export default Blackjack;
