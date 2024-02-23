import { Modal } from "@/components/Shared";
import { useState } from "react";
import { Button } from "semantic-ui-react";
import { CategoryForm } from "../CategoryForm";

export function AddCategory(props) {
    const { onReload } = props;
    const [openModal, setOpenModal] = useState(false);

    const openCloseModal = () => {
        setOpenModal((prevState) => !prevState);
    };

  return (
    <>
        <Button primary onClick={openCloseModal}>
            Add Category
        </Button>

        <Modal.Basic show={openModal} title={"Add New Category"} onClose={openCloseModal}>
            <CategoryForm onClose={openCloseModal} onReload={onReload} />
        </Modal.Basic>
    </>
  )
}
