import { Button, Icon } from 'semantic-ui-react';
import styles from './Address.module.scss';

export function Address(props) {
    const { address } = props;

  return (
    <>
        <div className={styles.address}>
            <div>
                <p className={styles.title}>{address.addTitle}</p>
                <p className={styles.addressInfo}>
                    {address.addName}, {address.addAddress}, {address.addState},
                    {address.addCity}, {address.addPostalCode}
                </p>
            </div>
            <div className={styles.actions}>
                <Button primary icon>
                    <Icon name="pencil" />
                </Button>
                <Button primary icon>
                    <Icon name="delete" />
                </Button>
            </div>
        </div>
    </>
  )
}
