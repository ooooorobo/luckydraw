import styles from '../Room.module.css';

export type Product = { name: string; description: string; img: string };

export const ProductCard = ({ product }: { product: Product }) => {
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
