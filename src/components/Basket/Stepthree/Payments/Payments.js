import { map } from 'lodash';
import styles from './Payments.module.scss';
import { paymentsData } from './Payments.data';
import classNames from 'classnames';

export function Payments(props) {
    const { paymentSelected, setPaymentSelected } = props;

  return (
    <div className={styles.payments}>
        <h2>Payment Methods</h2>
        { map(paymentsData, (payment) => (
            <div 
              key={payment.id} 
              className={classNames(styles.payment, {
                [styles.selected]: payment.id === paymentSelected?.id
              })}
              onClick={() => setPaymentSelected(payment)}  
            >
                <div>
                    <p className={styles.name}>{payment.name}: </p>
                    <p className={styles.description}>{payment.description}</p>
                </div>
            </div>
        ))}
    </div>
  )
}
