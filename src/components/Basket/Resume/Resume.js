import { Button } from 'semantic-ui-react';
import styles from './Resume.module.scss';
import { forEach } from 'lodash';
import { useAuth } from '@/hooks';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export function Resume(props) {
    const { products, nextStep, btnText, nextDisable = false } = props;
    const [total, setTotal] = useState(null);
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      let totalTemp = 0;
      forEach(products, (product) => {
        totalTemp += product.prodPrice * product.quantity;
      });
      setTotal(totalTemp);
    }, [products]);
    
    const goToNextStep = () => {
        if (user) {
            router.replace({ query: { ...router.query, step: nextStep } });
        } else {
            router.push("/join/login");
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
          disabled={nextDisable}
          onClick={goToNextStep}
        >
          {btnText}
        </Button>
    </div>
  )
}
