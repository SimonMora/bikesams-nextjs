import { useAuth } from "@/hooks";
import { useFormik } from "formik";
import { Form } from "semantic-ui-react";
import { initialValues, validateSchema } from "./NameForm.form";
import { userContrl } from "@/api";

export function NameForm() {
    const { user } = useAuth();
    
    const formik = useFormik({
        initialValues: initialValues(user.userFirstName, user.userLastName),
        validationSchema: validateSchema(),
        validateOnChange: false,
        onSubmit: async (formValues) => {
            try {
                await userContrl.updateMe(formValues);
            } catch (error) {
                console.error(error);
            }
        },
    });
  return (
    <>
        <Form onSubmit={formik.handleSubmit}>
            <Form.Input 
              name="userFirstName" 
              placeholder="First Name"
              value={formik.values.userFirstName}
              onChange={formik.handleChange}
              error={formik.errors.userFirstName}
            />
            <Form.Input 
              name="userLastName" 
              placeholder="Last Name"
              value={formik.values.userLastName}
              onChange={formik.handleChange}
              error={formik.errors.userLastName}
            />
            <Form.Button type="submit" fluid loading={formik.isSubmitting}>
                Send
            </Form.Button>   
        </Form>
    </>
  )
}
