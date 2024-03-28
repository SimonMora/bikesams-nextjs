import { map } from 'lodash';
import styles from './ListProducts.module.scss';
import { Dropdown, Icon, Image } from 'semantic-ui-react';
import { fn } from '@/utils';
import { useBasket } from '@/hooks';

export default function ListProducts(props) {
    const { products } = props;
    const { changeQuantityItem, deleteItem } = useBasket();
    const options = Array.from({ length: 10}, (_, index) => {
        const number = index + 1;
        return {key: number, text: String(number), value: number };
    });

  return (
    <div className={styles.basket}>
        <h2>Basket</h2>

        {map(products, (product) => (
            <div key={product.prodId} className={styles.product}>
                <Image src={fn.getImageUrl(product.prodId)} alt={product.prodTitle} />
                <div>
                    <div className={styles.info}>
                        <p>{product.prodTitle}</p>
                    </div>
                    <div className={styles.actions}>
                        <Dropdown 
                          className='number' 
                          options={options} 
                          selection 
                          compact 
                          value={product.quantity}
                          onChange={(_, data) => changeQuantityItem(product.prodId, data.value)}
                        />
                        <span>{product.prodPrice}</span>
                        <Icon name="trash alternate online" link onClick={() => deleteItem(product.prodId)}/>
                    </div>
                </div>
            </div>
        ))}
    </div>
  )
}
