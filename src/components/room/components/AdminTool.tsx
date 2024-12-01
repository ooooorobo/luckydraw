import { FormEvent } from 'react';
import { socket } from '../../../lib/socket.ts';
import styles from '../Room.module.css';

export const AdminTool = () => {
  const onSubmitChat = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const message = formData.get('message')?.toString();

    e.currentTarget.reset();

    socket.emit('chat', { message });
  };

  const onSpinRoulette = () => {
    socket.emit('spin');
  };

  const onPrevProduct = () => {
    socket.emit('prevProduct');
  };

  const onNextProduct = () => {
    socket.emit('nextProduct');
  };

  return (
    <div className={styles.AdminTools}>
      <form action="" onSubmit={onSubmitChat}>
        <input name={'message'} type="text" placeholder={'채팅 입력'} />
        <button type={'submit'}>전송</button>
      </form>
      <button onClick={onSpinRoulette}>룰렛 돌리기</button>
      <button onClick={onPrevProduct}>이전 애장품</button>
      <button onClick={onNextProduct}>다음 애장품</button>
    </div>
  );
};
