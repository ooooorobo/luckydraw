import styles from './Room.module.css';
import { Roulette, RouletteRef } from './Roulette.tsx';
import { useRef } from 'react';
import { ProductCard } from './components/ProductCard.tsx';
import { RoomData } from '../../App.tsx';

const members = [0, 11, 5, 10, 6, 9, 7, 8, 1, 14, 2, 13, 3, 12, 4].map((name) => ({
  name: name.toString(),
}));

export const Room = ({ roomState }: { roomState: RoomData }) => {
  console.log(roomState);
  const rouletteRef = useRef<RouletteRef>();

  return (
    <div className={styles.Container}>
      <h1 className={styles.Title}>🤩 럭키드로우 🤩</h1>
      <div className={styles.ChatWrapper}>
        <p>
          <strong>방장의 말</strong>
        </p>
        <textarea name="chat" id="chat" cols="30" rows="10" readOnly value={'하이하이\nㄱㄱㄱㄱ'}></textarea>
      </div>
      <div className={styles.ProductCardWrapper}>
        <p>
          <strong>이번 애장품</strong>
        </p>
        <ProductCard product={roomState.currentProduct} />
      </div>
      <Roulette list={roomState.participants} ref={rouletteRef} />
      <button onClick={() => rouletteRef?.current?.rotate('3')}>룰렛 돌리기</button>
      <div className={styles.ParticipantWrapper}>
        <p>
          <strong>참가자</strong>
        </p>
        <ul>
          {roomState.participants.map(({ name }) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const product = {
  name: '먹뱉 인형',
  description: '검탐 스쿼드 유행템',
  img: '/image/dlsgud1.jpeg',
};
