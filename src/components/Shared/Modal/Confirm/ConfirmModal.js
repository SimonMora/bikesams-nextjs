import { useState } from "react";
import { Button, Confirm } from "semantic-ui-react";

export function ConfirmModal(props) {
    const { onConfirm, ...rest } = props;
    const [loading, setLoading] = useState(false);

    const onConfirmWrapper = () => {
        setLoading(true);
        onConfirm();
        setLoading(false);
    };

  return (
    <Confirm 
      className="confirm"
      size="mini"
      onConfirm={onConfirmWrapper}
      {...rest}
      confirmButton={
        <Button primary loading={loading}>
            Confirm
        </Button>
      }
    />  

  )
}
