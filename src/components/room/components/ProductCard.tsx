import styles from '../Room.module.css';

export const ProductCard = ({ product }: { product: { name: string; description: string; img: string } }) => {
  return (
    <div className={styles.ProductCard}>
      <img src={product.img} alt={product.name} />
      <div>
        <p>
          <strong>{product.name}</strong>
        </p>
        <p>{product.description}</p>
      </div>
    </div>
  );
};
