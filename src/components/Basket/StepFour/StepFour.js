import { Button, Container, Icon } from 'semantic-ui-react';
import styles from './StepFour.module.scss';
import Link from 'next/link';

export function StepFour() {
  return (
    <Container className={styles.container}>
        <Icon name="check circle outline" />
        <h2>Order Completed!</h2>

        <Button as={Link} href="/account" primary>
            To orders
        </Button>
    </Container>
  )
}
