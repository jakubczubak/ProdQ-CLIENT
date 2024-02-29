//Importy zewnętrzne
import React from 'react';
//Importy lokalne
import styles from './css/OrderItem.module.css';

export const OrderSummary = ({ accumulatedPrice }) => {
  return (
    <div>
      <h3 className={styles.order_header}>Summary</h3>
      <div className={styles.total_price}>
        <span>Total price:</span>
        <span className={styles.total_price_value}>{accumulatedPrice.toFixed(2)} PLN (net)</span>
      </div>
    </div>
  );
};
