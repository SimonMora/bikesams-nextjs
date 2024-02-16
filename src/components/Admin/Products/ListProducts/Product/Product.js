import { useEffect, useState } from 'react';
import { Icon, Image, Table } from 'semantic-ui-react';

import styles from './Product.module.scss';
import { fn } from '@/utils';
import { checkImageExist } from '@/utils/functions/checkImageExist';

const NOT_FOUND_IMAGE = "/image/not-found.png";

export default function Product(props) {
    const { product } = props;
    const [image, setImage] = useState(NOT_FOUND_IMAGE);

    useEffect(() => {
      const imageUrl = fn.getImageUrl(product.prodId);
      checkImageExist(imageUrl, (exist) => {
        if (exist) {
          setImage(imageUrl);
        }
      });
    }, [product]);
    

  return (
    <>
        <Table.Cell>{product.prodId}</Table.Cell>
        <Table.Cell>
            <Image className={styles.image} src={image} alt={product.prodTitle} /> 
        </Table.Cell>
        <Table.Cell>{product.prodTitle}</Table.Cell>
        <Table.Cell>{product.prodPrice} $</Table.Cell>
        <Table.Cell>{product.prodStock} Units</Table.Cell>
        <Table.Cell className={styles.actions}>
            <Icon name="pencil" link />
            <Icon name="image" link />
            <Icon name="trash" link />
        </Table.Cell>
    </>
  )
}