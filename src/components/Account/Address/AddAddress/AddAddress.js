import { Modal } from "@/components/Shared";
import { useState } from "react"
import { Button } from "semantic-ui-react";


export function AddAddress() {

    const [showModal, setShowModal] = useState(false);

    const openCloseModal = () => setShowModal((prevState) => !prevState);

  return (
    <>
        <Button primary onClick={openCloseModal}>
            New Address
        </Button>
        <Modal.Basic show={showModal} onClose={openCloseModal} title={"New Address"}>
            <h2>New Address FORM</h2>
        </Modal.Basic>
    </>
  )
}
