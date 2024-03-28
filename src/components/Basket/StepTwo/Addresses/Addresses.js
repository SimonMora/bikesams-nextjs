import { addressContrl } from '@/api';
import styles from './Addresses.module.scss';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks';
import { Loading, NoResults } from '@/components/Shared';
import { map, size } from 'lodash';
import { Button } from 'semantic-ui-react';
import Link from 'next/link';
import classNames from 'classnames';

export function Addresses(props) {
    const { address, setAddress } = props;
    const [addresses, setAddresses] = useState(null);
    const { user } = useAuth();
    console.log(address);

    useEffect(() => {
        (async() => {
            try {
                const response = await addressContrl.getAll();
                setAddresses(response);
            } catch (error) {
                console.error(error);
            }
        })();
      
    }, [user]);
    
  return (
    <div className={styles.addresses}>
        <h2>Send Address</h2>

        {!addresses && <Loading text="Loading addresses" />}

        {addresses && size(addresses) === 0 && (
            <div className={styles.noAddresses}>
                <NoResults text="No address registered" />
                <Button as={Link} href="/account" primary>
                    Register Address
                </Button>
            </div>
        )}

        {map(addresses, (item) => (
            <div 
              key={item.addId} 
              onClick={() => setAddress(item)} 
              className={classNames(styles.address, {
                [styles.selected]: item.addId === address?.addId, 
              })}
            >
                <div>
                    <p className={styles.title}>{item.addTitle}</p>
                    <p className={styles.addressInfo}>
                        {item.addName}, {item.addAddress}, {item.addState}, {item.addCity}, {item.addPostalCode}
                    </p>
                </div>
            </div>
            )
        )}
    </div>
  )
}
