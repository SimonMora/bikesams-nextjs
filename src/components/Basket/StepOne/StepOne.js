import { Container } from 'semantic-ui-react';
import styles from './StepOne.module.scss';
import { Resume } from '../Resume';
import ListProducts from './ListProducts/ListProducts';

export function StepOne(props) {
    const { products } = props;
  return (
    <Container className={styles.container}>
        <div className={styles.left}>
            <ListProducts products={products} />
        </div>
        <div className={styles.right}>
            <Resume products={products} nextStep={2} btnText={"Next Address"} />
        </div>
    </Container>
  )
}
