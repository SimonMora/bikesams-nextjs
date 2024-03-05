import { Modal } from "@/components/Shared";
import { useState } from "react"
import { Button } from "semantic-ui-react";
import { AddressForm } from "../AddressForm";


export function AddAddress(props) {

    const { onReload } = props;
    const [showModal, setShowModal] = useState(false);

    const openCloseModal = () => setShowModal((prevState) => !prevState);

  return (
    <>
        <Button primary onClick={openCloseModal}>
            New Address
        </Button>
        <Modal.Basic 
          show={showModal} 
          onClose={openCloseModal} 
          title={"New Address"}
        >
            <AddressForm onClose={openCloseModal} onReload={onReload} />
        </Modal.Basic>
    </>
  )
}
