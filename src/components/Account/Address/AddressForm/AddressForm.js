import { useFormik } from "formik";
import { Form } from "semantic-ui-react";
import { initialValues, validationSchema } from "./AddressForm.form";
import { addressContrl } from "@/api";


export function AddressForm(props) {
    const { onClose, onReload, address } = props;

    const formik = useFormik({
        initialValues: initialValues(address),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async(formValues) => {
            try {
                if(address) {
                    const resp = await addressContrl.update(address.addId, formValues); 
                } else {
                    const resp = await addressContrl.create(formValues); 
                }

                formik.handleReset();
    
                onReload();
                onClose();
            } catch (error) {
                console.error(error);
            }
        }
    });

  return (
    <Form onSubmit={formik.handleSubmit}>
        <Form.Input 
          name="addTitle" 
          placeholder="Address Title"
          value={formik.values.addTitle}
          onChange={formik.handleChange}
          error={formik.errors.addTitle}
        />

        <Form.Group widths="equal">
            <Form.Input 
              name="addName" 
              placeholder="Address Name"
              value={formik.values.addName}
              onChange={formik.handleChange}
              error={formik.errors.addName}
            />
            <Form.Input 
              name="addAddress" 
              placeholder="Address"
              value={formik.values.addAddress}
              onChange={formik.handleChange}
              error={formik.errors.addAddress}
            />
        </Form.Group> 

        <Form.Group widths="equal">
            <Form.Input 
              name="addState" 
              placeholder="State"
              value={formik.values.addState}
              onChange={formik.handleChange}
              error={formik.errors.addState}
            />
            <Form.Input 
              name="addCity" 
              placeholder="City"
              value={formik.values.addCity}
              onChange={formik.handleChange}
              error={formik.errors.addCity}
            />
        </Form.Group> 

        <Form.Group widths="equal">
            <Form.Input 
              name="addPostalCode" 
              placeholder="Postal Code"
              value={formik.values.addPostalCode}
              onChange={formik.handleChange}
              error={formik.errors.addPostalCode}
            />
            <Form.Input 
              name="addPhone" 
              placeholder="Phone"
              value={formik.values.addPhone}
              onChange={formik.handleChange}
              error={formik.errors.addPhone}
            />
        </Form.Group> 

        <Form.Button type="submit" fluid loading={formik.isSubmitting}>
            Send
        </Form.Button>
    </Form>
  )
}
