import styles from './Room.module.css';
import { Roulette, RouletteRef } from './Roulette.tsx';
import { useEffect, useRef } from 'react';
import { ProductCard } from './components/ProductCard.tsx';
import { RoomData } from '../../App.tsx';
import { AdminTool } from './components/AdminTool.tsx';
import { socket } from '../../lib/socket.ts';

export const Room = ({ roomState, name, isAdmin }: { roomState: RoomData; name: string; isAdmin: boolean }) => {
  const rouletteRef = useRef<RouletteRef>();
  const chatRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const textarea = chatRef.current;
    if (!textarea) return;

    textarea.scrollTop = textarea.scrollHeight;
  }, [roomState]);

  useEffect(() => {
    const onSpin = (winner: { name: string }, randomize: number) => {
      rouletteRef.current?.rotate(winner.name, randomize);
    };

    socket.on('spin', onSpin);

    return () => {
      socket.off('spin', onSpin);
    };
  }, []);

  return (
    <div className={styles.Container}>
      <h1 className={styles.Title}>🤩 럭키드로우 🤩</h1>
      <div className={styles.ChatWrapper}>
        <p>
          <strong>{name}</strong>님, 오늘 와주셔서 감사해요!
        </p>
        <p>
          <strong>방장의 말</strong>
        </p>
        <textarea ref={chatRef} name="chat" id="chat" readOnly value={roomState.chatList.join('\n')}></textarea>
      </div>
      {isAdmin && <AdminTool />}
      <div className={styles.ProductCardWrapper}>
        <p>
          <strong>이번 애장품</strong>
        </p>
        <ProductCard product={roomState.currentProduct} />
      </div>
      <Roulette list={roomState.participants} ref={rouletteRef} />
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
