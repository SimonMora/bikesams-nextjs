import { useEffect, useState } from 'react';
import styles from './ListAddresses.module.scss';
import { addressContrl } from '@/api/address';
import { Loading, NoResults } from '@/components/Shared';
import { add, map, size } from 'lodash';
import { Address } from './Address';

export function ListAddresses(props) {
    const { reload , onReload } = props;
    const [addresses, setAddresses] = useState(null);

    useEffect(() => {
      (async ()=>{
        try {
            const resp = await addressContrl.getAll();
            setAddresses(resp);
        } catch (error) {
            console.error(error);
        }
      })();
    }, [reload]);

    if (!addresses) {
        return <Loading text="Loading addresses" top={100} />
    }
    
  return (
    <div className={styles.addresses}>
        {
            size(addresses) === 0 && <NoResults text="Create your fisrt address.." />
        }

        {
            map(addresses, (address) => (
                <Address key={address.addId} address={address} onReload={onReload} />
            ))
        }
    </div>
  )
}
