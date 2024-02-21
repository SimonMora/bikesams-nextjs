import { useEffect, useState } from 'react';
import { Icon, Image, Table } from 'semantic-ui-react';

import styles from './Product.module.scss';
import { fn } from '@/utils';
import { checkImageExist } from '@/utils/functions/checkImageExist';
import { Modal } from '@/components/Shared';
import { ProductForm } from '../../ProductForm';
import { ProductImageForm } from '../../ProductImageForm';

const NOT_FOUND_IMAGE = "/image/not-found.png";

export default function Product(props) {
    const { product, onReload } = props;
    const [image, setImage] = useState(NOT_FOUND_IMAGE);
    const [openModal, setOpenModal] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    useEffect(() => {
      const imageUrl = fn.getImageUrl(product.prodId);
      checkImageExist(imageUrl, (exist) => {
        if (exist) {
          setImage(imageUrl);
        }
      });
    }, [product]);
    
    const closeModal = () => {
      setOpenModal(false);
      setModalContent(null);
    };

    const openEditProd = () => {
      setModalContent(
        <ProductForm onClose={closeModal} onReload={onReload} product={product} />
      );
      setOpenModal(true);
    };

    const openProdImage = () => {
      setModalContent(
        <ProductImageForm onClose={closeModal} onReload={onReload} productId={product.prodId} />
      );
      setOpenModal(true);
    };

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
            <Icon name="pencil" link onClick={openEditProd}/>
            <Icon name="image" link onClick={openProdImage}/>
            <Icon name="trash" link />
        </Table.Cell>

        <Modal.BasicModal show={openModal} onClose={closeModal} title={`Edit ${product.prodTitle}`}>
          {modalContent}
        </Modal.BasicModal>
    </>
  )
}
