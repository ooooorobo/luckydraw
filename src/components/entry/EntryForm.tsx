import styles from './EntryForm.module.css';

export const EntryForm = () => {
  return (
    <div>
      <h2>럭키드로우 입장하기</h2>
      <p>안녕하세요! 이름을 알려주세요</p>

      <form className={styles.Form} action="" onSubmit={(e) => e.preventDefault()}>
        <input type="text" />
        <small className={styles.Error}>* 이미 이 이름을 쓰는 사람이 들어가 있어요</small>
        <button type={'submit'}>입장하기</button>
      </form>
    </div>
  );
};
