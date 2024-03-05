import { Button, Icon } from 'semantic-ui-react';
import styles from './Address.module.scss';
import { Modal } from '@/components/Shared';
import { AddressForm } from '../../AddressForm';
import { useState } from 'react';
import { addressContrl } from '@/api';

export function Address(props) {
    const { address, onReload } = props;
    const [showEdit, setShowEdit] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const openCloseShowEdit = () => setShowEdit((prevState) => !prevState);
    const openCloseConfirm = () => setShowConfirm((prevState) => !prevState);

    const onDelete = () => {
        try {
            addressContrl.delete(address.addId);
            onReload();
            openCloseConfirm();
        } catch (error) {
            console.error(error);
        }
    }
  return (
    <>
        <div className={styles.address}>
            <div>
                <p className={styles.title}>{address.addTitle}</p>
                <p className={styles.addressInfo}>
                    {address.addName}, {address.addAddress}, {address.addState},
                    {address.addCity}, {address.addPostalCode}
                </p>
            </div>
            <div className={styles.actions}>
                <Button primary icon onClick={openCloseShowEdit}>
                    <Icon name="pencil" />
                </Button>
                <Button primary icon onClick={openCloseConfirm}>
                    <Icon name="delete" />
                </Button>
            </div>
        </div>

        <Modal.Basic 
          show={showEdit} 
          onClose={openCloseShowEdit} 
          title="Edit Address"
        >
            <AddressForm 
              onClose={openCloseShowEdit} 
              onReload={onReload} 
              address={address} 
            />
        </Modal.Basic>
        <Modal.Confirm 
          open={showConfirm} 
          onCancel={openCloseConfirm} 
          onConfirm={onDelete} 
          content="Sure to delete the address?"
        />
    </>
  )
}
