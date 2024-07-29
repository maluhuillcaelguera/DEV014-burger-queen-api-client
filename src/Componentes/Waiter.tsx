import React, { useEffect, useState } from 'react';
import { fetchProducts, Product } from '../Servicios/authService';
import ProductList from './ProductList';
import QuantityButtons from './QuantityButtons';
import styles from '../Style/Waiter.module.css';

interface OrderItem extends Product {
  quantity: number;
}

const Waiter: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('Desayuno');
  const [order, setOrder] = useState<OrderItem[]>([]);
  const [clientName, setClientName] = useState<string>('');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsData = await fetchProducts();
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Error fetching products");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const addToOrder = (product: Product) => {
    setOrder(prevOrder => {
      const existingItem = prevOrder.find(item => item.id === product.id);
      if (existingItem) {
        return prevOrder.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevOrder, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromOrder = (productId: number) => {
    setOrder(prevOrder =>
      prevOrder
        .map(item =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const increaseQuantity = (productId: number) => {
    setOrder(prevOrder =>
      prevOrder.map(item =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (productId: number) => {
    setOrder(prevOrder =>
      prevOrder
        .map(item =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const totalPrice = order.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className={styles.waiterInterface}>
      <div className={styles.navBar}>
        {['Desayuno', 'Comidas', 'Bebidas'].map(tab => (
          <button
            key={tab}
            className={`${styles.navButton} ${activeTab === tab ? styles.active : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
        <div className={styles.menuIcon}>≡</div>
      </div>
      <div className={styles.mainContent}>
        <ProductList products={products} onAddToOrder={addToOrder} />
        <div className={styles.orderSection}>
          <input 
            className={styles.clientInput}
            placeholder="Cliente:" 
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
          />
          <table className={styles.orderTable}>
            <thead>
              <tr>
                <th>Cantidad</th>
                <th>Pedido</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {order.map(item => (
                <tr key={item.id}>
                  <td>{item.quantity}</td>
                  <td>{item.name}</td>
                  <td>S/. {(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <QuantityButtons
                      productId={item.id}
                      onIncrease={increaseQuantity}
                      onDecrease={decreaseQuantity}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles.total}>
            <strong>TOTAL: S/. {totalPrice.toFixed(2)}</strong>
          </div>
          <button className={styles.submitButton}>Enviar a cocinar</button>
        </div>
      </div>
    </div>
  );
};

export default Waiter;