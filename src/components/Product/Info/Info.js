import { Button } from 'semantic-ui-react';
import styles from './Info.module.scss';
import { useBasket } from '@/hooks';
import { useState } from 'react';

export function Info(props) {
    const { product } = props;
    const { addProduct } = useBasket();
    const [loading, setLoading] = useState(false);
    
    
    const addProductWraper = () => {
      setLoading(true);
      addProduct(product.prodId);

      setTimeout(() => {
        setLoading(false);
      }, 500);
    };

  return (
    <div className={styles.container}>
        <h1 className={styles.title}>{product.prodTitle}</h1>
        <span className={styles.stock}>
            {`${product.prodStock} unit/s left`}
        </span>
        <span className={styles.price}>{product.prodPrice}$</span>

        <Button 
          primary 
          className={styles.btnBuy} 
          loading={loading} 
          onClick={addProductWraper}
        >
            Buy
        </Button>
    </div>
  );
}
