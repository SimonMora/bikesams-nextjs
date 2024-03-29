import { useEffect, useState } from 'react';
import styles from './AddressDetails.module.scss';
import { Loading } from '@/components/Shared';
import { addressContrl } from '@/api';

export function AddressDetails(props) {
    const { addressId } = props;
    const [address, setAddress] = useState(null);

    useEffect(() => {
      (async () => {
        try {
            const response = await addressContrl.getById(addressId);
            setAddress(response);
        } catch (error) {
            console.error(error);
        }
      })();
    }, [addressId]);
    
    if(!address) return <Loading text="Loading address" />;

  return (
    <div className={styles.container}>
        <h4>Sending Address: </h4>
        <div className={styles.address}>
            <p className={styles.title}>{address.addTitle}</p>
            <p className={styles.addressInfo}>
                {address.addName}, {address.addAddress}, {address.addState}, {" "}
                {address.addCity}, {address.addPostalCode}
            </p>
        </div>
    </div>
  )
}
