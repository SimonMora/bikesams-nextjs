import { useEffect, useState } from 'react';
import styles from './ProductDetails.module.scss';
import { productControl } from '@/api';
import { Loading } from '@/components/Shared';
import { map } from 'lodash';
import { Image } from 'semantic-ui-react';
import { fn } from '@/utils';

export function ProductDetails(props) {
    const { orderProducts } = props;
    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      (async () => {
        try {
            setLoading(true);
            const productsTemp = [];
            for await (const item of orderProducts) {
                const response = await productControl.getById(item.odProdId);
                productsTemp.push({ ...response, quantity: item.odQuantity });
            }
            setProducts(productsTemp);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
       })()
    }, [orderProducts])
    
    if (loading) <Loading text="fetching products details" />

  return (
    <div>
        {map(products, (item) => (
            <div key={item.prodId} className={styles.product}>
                <div>
                    <Image src={fn.getImageUrl(item.prodId)} alt={item.prodTitle} />
                    <div>
                        <h4>{item.prodTitle}</h4>
                    </div>
                </div>
                <p className={styles.price}>{item.quantity} x {item.prodPrice}</p>
            </div>
        ))}
    </div>
  )
}
