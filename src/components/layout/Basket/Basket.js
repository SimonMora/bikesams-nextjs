import Link from 'next/link';
import React from 'react';
import { Icon, Label } from 'semantic-ui-react';
import styles from './Basket.module.scss';

const totalItems = 6;

export function Basket() {
  return (
    <Link href="/basket" className={styles.basket}>
        <Icon name="cart"/>
        {totalItems > 0 &&
            <Label circular color="teal">
                {totalItems}
            </Label>
        }
        My Basket
    </Link>
  )
}
