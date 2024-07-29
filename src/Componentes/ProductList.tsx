import React from 'react';
import { Product } from '../Servicios/authService';
import ProductCard from './Product';
import styles from '../Style/ProductList.module.css';

interface ProductListProps {
  products: Product[];
  onAddToOrder: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onAddToOrder }) => {
  return (
    <div className={styles.productList}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} onAddToOrder={onAddToOrder} />
      ))}
    </div>
  );
};

export default ProductList;
