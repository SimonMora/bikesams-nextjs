import { Button, Container, Icon } from 'semantic-ui-react';
import styles from './Order.module.scss';
import { DateTime } from 'luxon';
import { Modal } from '@/components/Shared';
import { useState } from 'react';
import { ProductDetails } from '../ProductDetails';
import { AddressDetails } from '../AddressDetails';

export function Order(props) {
    const { order } = props;
    const [showModal, setShowModal] = useState(false);

    const createdAt = new Date(order.orderDate).toISOString();

    const openCloseModal = () => setShowModal((prevState) => !prevState);

  return (
    <>
        <div className={styles.container}>
            <div>
                <p>Order number: {order.orderId}</p>
                <span>{DateTime.fromISO(createdAt, { locale: 'en' }).toFormat("yyyy/MM/dd")}</span>
            </div>
            <Button icon onClick={openCloseModal}>
                <Icon name="eye" />
            </Button>
        </div>

        <Modal.Basic show={showModal} onClose={openCloseModal} title="Order Details">
            <ProductDetails orderProducts={order.orderDetails} />
            <AddressDetails addressId={order.orderAddId} />
            <p className={styles.totalOrder}>{order.orderTotal}$</p>
        </Modal.Basic>
    </>
  );
}
