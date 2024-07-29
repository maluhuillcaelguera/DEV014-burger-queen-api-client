import React from 'react';
import { Product } from '../Servicios/authService';
import styles from '../Style/Product.module.css';

interface ProductProps {
  product: Product;
  onAddToOrder: (product: Product) => void;
}

const ProductCard: React.FC<ProductProps> = ({ product, onAddToOrder }) => {
  return (
    <div className={styles.productCard} onClick={() => onAddToOrder(product)}>
      <img src={product.image} alt={product.name} className={styles.productImage} />
      <div className={styles.productDetails}>
        <div className={styles.productName}>{product.name}</div>
        <div className={styles.productPrice}>S/. {product.price.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default ProductCard;
