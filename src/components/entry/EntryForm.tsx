import styles from './EntryForm.module.css';
import { FormEvent, useState } from 'react';
import { socket } from '../../lib/socket.ts';

export const EntryForm = ({ setName }: { setName: (name: string) => void }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name')?.toString();
    if (!name) return;

    setLoading(true);
    socket.emit('join', { name }, (success) => {
      setLoading(false);

      if (!success) {
        setError(true);
        return;
      }

      setName(name);
    });
  };

  return (
    <div>
      <h2>럭키드로우 입장하기</h2>
      <p>안녕하세요! 이름을 알려주세요</p>

      <form className={styles.Form} action="" onSubmit={onSubmit}>
        <input type="text" name={'name'} minLength={1} onChange={() => setError(false)} />
        {error && <small className={styles.Error}>* 이미 이 이름을 쓰는 사람이 들어가 있어요</small>}
        <button type={'submit'} disabled={loading}>
          입장하기
        </button>
      </form>
    </div>
  );
};
