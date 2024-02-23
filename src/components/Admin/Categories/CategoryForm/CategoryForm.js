import { useFormik } from "formik";
import { Form } from "semantic-ui-react";
import { initialSchema, validateSchema } from "./CategoryForm.form";
import { categContrl } from "@/api/categories";

export function CategoryForm(props) {
    const { onClose, onReload, category } = props;

    const formik = useFormik({
        initialValues: initialSchema(category),
        validationSchema: validateSchema(),
        validateOnChange: false,
        onSubmit: async (formValues) => {
            try {
                if (category) {
                    await categContrl.update(category.categId, formValues);
                } else {
                    await categContrl.add(formValues);
                }
                onReload();
                onClose();
            } catch (error) {
                console.error(error);
            }
        },
    });

  return (
    <Form onSubmit={formik.handleSubmit}>
        <Form.Input 
          name="categName" 
          placeholder="Category Name"
          value={formik.values.categName}
          onChange={formik.handleChange}
          error={formik.errors.categName} 
        />
        <Form.Input 
          name="categPath" 
          placeholder="Category Slug"
          value={formik.values.categPath}
          onChange={formik.handleChange}
          error={formik.errors.categPath} 
        />
        <Form.Button type="submit" fluid loading={formik.isSubmitting}>
            Send
        </Form.Button>
    </Form>
    )
}
