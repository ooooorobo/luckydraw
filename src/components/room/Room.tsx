import styles from './Room.module.css';
import { Roulette, RouletteRef } from './Roulette.tsx';
import { useRef } from 'react';

const members = [0, 11, 5, 10, 6, 9, 7, 8, 1, 14, 2, 13, 3, 12, 4].map((name) => ({
  name: name.toString(),
}));

export const Room = () => {
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
        <div className={styles.ProductCard}>
          <img src={potato} alt="" />
          <div>
            <p>
              <strong>조예진이 직접 키운 감자</strong>
            </p>
            <p>사실 로켓프레시로 시켰음</p>
          </div>
        </div>
      </div>
      <Roulette list={members} ref={rouletteRef} />
      <button onClick={() => rouletteRef?.current?.rotate('3')}>룰렛 돌리기</button>
      <div className={styles.ParticipantWrapper}>
        <p>
          <strong>참가자</strong>
        </p>
        <ul>
          {members.map(({ name }) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const potato =
  'data:image/webp;base64,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';
