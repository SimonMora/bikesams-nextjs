import Link from 'next/link';
import React from 'react';
import { Icon, Label } from 'semantic-ui-react';
import styles from './Basket.module.scss';
import { useBasket } from '@/hooks';


export function Basket() {
  const { total } = useBasket();
  return (
    <Link href="/basket" className={styles.basket}>
        <Icon name="cart"/>
        {total > 0 &&
            <Label circular color="teal">
                {total}
            </Label>
        }
        My Basket
    </Link>
  )
}
