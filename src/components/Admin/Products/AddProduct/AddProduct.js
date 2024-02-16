
import { Modal } from "@/components/Shared";
import { useState } from "react";
import { Button } from "semantic-ui-react";
import { ProductForm } from "../ProductForm";


export function AddProduct() {
    const [openModal, setOpenModal] = useState(false);

    const openCloseModal = () => setOpenModal((prevState) => !prevState);
  return (
    <>
        <Button primary onClick={ openCloseModal }>Add Product</Button>
        <Modal.BasicModal 
          show={openModal}
          onClose={ openCloseModal }
          title="New Product"
        > 
            <ProductForm onClose={openCloseModal}/>
        </Modal.BasicModal>
    </>
  );
}
