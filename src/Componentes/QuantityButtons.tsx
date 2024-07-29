import React from 'react';
import styles from '../Style/QuantityButtons.module.css';

interface QuantityButtonsProps {
  productId: number;
  onIncrease: (productId: number) => void;
  onDecrease: (productId: number) => void;
}

const QuantityButtons: React.FC<QuantityButtonsProps> = ({ productId, onIncrease, onDecrease }) => {
  return (
    <div className={styles.quantityButtons}>
      <button className={styles.changeQuantityButton} onClick={() => onIncrease(productId)}>+</button>
      <button className={styles.changeQuantityButton} onClick={() => onDecrease(productId)}>-</button>
    </div>
  );
};

export default QuantityButtons;
