import { Separator } from '@/components/Shared';
import styles from './BasketLayout.module.scss';
import { Layout } from '@/components/layout';

export function BasketLayout(props) {
    const { children } = props;
  return (
    <div className={styles.container}>
        <Layout.HeaderBasket />
        <Separator height={100} />

        {children}
    </div>
  )
}
