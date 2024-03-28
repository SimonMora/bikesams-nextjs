import { Button } from 'semantic-ui-react';
import styles from './Resume.module.scss';
import { forEach } from 'lodash';
import { useAuth, useBasket } from '@/hooks';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { basketContrll, orderControll } from '@/api';

export function Resume(props) {
    const { products, address, nextDisable = false } = props;
    const [total, setTotal] = useState(null);
    const [orderDetails, setOrderDetails] = useState([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { deleteAllItems } = useBasket();

    useEffect(() => {
      let totalTemp = 0;
      let orderDetailsTemp = [];

      forEach(products, (product) => {
        totalTemp += product.prodPrice * product.quantity;
        orderDetailsTemp.push({
          odProdId: product.prodId,
          odQuantity: product.quantity,
          odPrice: product.prodPrice,
        });
      });

      setTotal(totalTemp);
      setOrderDetails(orderDetailsTemp);
    }, [products]);

    const onPay = async () => {
      try {
        setLoading(true);
        const data = {
          ordeDate: new Date(),
          orderTotal: total,
          orderDetails: orderDetails,
          orderAddId: address.addId,
        };

        await orderControll.createOrder(data);
        deleteAllItems();
        router.replace({ query: { ...router.query, step: 4 } });
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    
    if (!total) return null;
  return (
    <div className={styles.container}>
        <h2>Resume</h2>
        <div className={styles.prices}>
            <div>
                <span>Total</span>
                <span>{total.toFixed(2)}$</span>
            </div>
        </div>
        <Button 
          primary 
          fluid
          loading={loading} 
          disabled={nextDisable}
          onClick={onPay}
        >
          Pagar
        </Button>
    </div>
  )
}
