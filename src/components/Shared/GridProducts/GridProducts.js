import { map, size } from 'lodash';
import { Loading } from '../Loading';
import { Separator } from '../Separator';
import styles from './GridProducts.module.scss';
import { NoResults } from '../NoResults';
import classNames from 'classnames';
import { Product } from './Product';

export function GridProducts(props) {
    const { products, columns = 4, classProduct } = props;

    if (!products) {
        return (
            <>
                <Separator height={50} />
                <Loading text="Loading products" />
                <Separator height={50} />
            </>
        );
    }

    if (size(products) === 0) {
        return (<NoResults text="No products found.."/>);
    }

  return (
    <div className={styles.container}>
        {
            map(products, (product) => (
                <div 
                  key={product.prodId}
                  className={classNames(styles.product,{
                    [styles.oneColumn]: columns === 1,
                    [styles.twoColumn]: columns === 2,
                    [styles.threeColumn]: columns === 3,
                    [styles.fourColumn]: columns === 4,
                    [styles.fiveColumn]: columns === 5,
                    [styles.sixColumn]: columns === 6,

                  })}
                > 
                    <Product product={product} classProduct={classProduct} />
                </div>
            ))
        }
    </div>
  )
}
