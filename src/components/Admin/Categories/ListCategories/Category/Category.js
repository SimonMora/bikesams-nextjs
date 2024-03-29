import { Icon, Table } from 'semantic-ui-react';
import styles from './Category.module.scss';
import { Modal } from '@/components/Shared';
import { CategoryForm } from '../../CategoryForm';
import { useState } from 'react';
import { categContrl } from '@/api';

export function Category(props) {
    const { category, onReload } = props;

    const [openModal, setOpenModal] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const openCloseModal = () => setOpenModal((prevState) => !prevState);

    const openConfirmModal = () => setShowConfirm((prevState) => !prevState);

    const deleteCategory = async () => {
      try {
        await categContrl.delete(category.categId);
        openConfirmModal();
        onReload();
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <>
        <Table.Cell>{category.categId}</Table.Cell>
        <Table.Cell>{category.categName}</Table.Cell>
        <Table.Cell>{category.categPath}</Table.Cell>
        <Table.Cell className={styles.actions} textAlign='right'>
            <Icon name="pencil" link onClick={openCloseModal} />
            <Icon name="trash" link onClick={openConfirmModal}/>
        </Table.Cell>
        <Modal.Basic show={openModal} title={`Edit Category: ${category.categName}`} onClose={openCloseModal}>
          <CategoryForm onReload={onReload} onClose={openCloseModal} category={category}/>
        </Modal.Basic>
        <Modal.Confirm 
          open={showConfirm}
          onCancel={openConfirmModal}
          onConfirm={deleteCategory}
          content={`Are you sure to eliminate category (${category.categName})?`}
        />
    </>
  )
}
