import { Container } from 'semantic-ui-react';
import styles from './StepThree.module.scss';
import { Payments } from './Payments';
import { useState } from 'react';
import { Resume } from './Resume';

export function StepThree(props) {
    const { products, address } = props;
    const [paymentSelected, setPaymentSelected] = useState(null);

  return (
    <Container className={styles.container}>
        <div className={styles.left}>
            <Payments paymentSelected={paymentSelected} setPaymentSelected={setPaymentSelected} />
        </div>
        <div className={styles.right}>
            <Resume products={products} address={address} nextDisable={!paymentSelected} />
        </div>
    </Container>
  );
}
