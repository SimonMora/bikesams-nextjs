import { Button } from 'semantic-ui-react';
import styles from './Info.module.scss';

export function Info(props) {
    const { product } = props;

  return (
    <div className={styles.container}>
        <h1 className={styles.title}>{product.prodTitle}</h1>
        <span className={styles.stock}>
            {`${product.prodStock} unit/s left`}
        </span>
        <span className={styles.price}>{product.prodPrice}$</span>

        <Button primary className={styles.btnBuy}>
            Buy
        </Button>
    </div>
  );
}
