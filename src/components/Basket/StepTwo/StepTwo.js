import { Container } from 'semantic-ui-react';
import styles from './StepTwo.module.scss';
import { Resume } from '../Resume';
import { Addresses } from './Addresses';

export function StepTwo(props) {
    const { products, address, setAddress, nextDisabled} = props;
  return (
    <Container className={styles.container}>
        <div className={styles.left}>
            <Addresses address={address} setAddress={setAddress} />
        </div>
        <div className={styles.right}>
            <Resume
              products={products}
              nextStep={3}
              btnText="Proceed to checkout"
              nextDisable={nextDisabled}
            />
        </div>
    </Container>
  )
}
