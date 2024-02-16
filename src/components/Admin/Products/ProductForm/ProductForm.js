import { categContrl } from "@/api/categories";
import { Separator } from "@/components/Shared";
import { Editor } from "@tinymce/tinymce-react";
import { useFormik } from "formik";
import { map } from 'lodash';
import { useEffect, useState } from "react";
import { Form } from "semantic-ui-react";
import { initialValues, validationSchema } from "./ProductForm.form";
import { productControl } from "@/api/products";

export function ProductForm(props) {
    const { onClose } = props;
    const [categories, setCategories] = useState([]);

    useEffect(() => {
      (async ()=> {
        try {
            const response = await categContrl.getAllCategories();
            const result = map(response, (categ) => ({
                key: categ.categId,
                value: categ.categId,
                text: categ.categName
            }));
            setCategories(result);
        } catch (error) {
            console.log(error);
        }   
      })();
    }, []);
    
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                await productControl.create(formValue);
                onClose();
            } catch (error) {
                console.log(error);
            }
        }
    });

  return (
    <div>
        <Form onSubmit={formik.handleSubmit}>
            <Form.Input 
              name="ProdTitle" 
              placeholder="Name"
              value={formik.values.ProdTitle}
              onChange={formik.handleChange}
              error={formik.errors.ProdTitle}  
            />
            <Form.Input 
              name="ProdPath" 
              placeholder="Slug"
              value={formik.values.ProdPath}
              onChange={formik.handleChange}
              error={formik.errors.ProdPath}  
            />
            <Editor
                apiKey="y7stszftv1ah92um5axw3qmeck813kr6ja1s290jq3rw1q62"
                init={{
                height: 400,
                menubar: true,
                plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                ],
                toolbar: 'undo redo | blocks | ' +
                    'bold italic forecolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                }}
                initialValue={formik.values.ProdDescription}
                onBlur={(event) => {
                    formik.setFieldValue("ProdDescription", event.target.getContent())
                }}
            />

            <Separator height={20} />
            <Form.Dropdown 
              name="ProdCategId"
              placeholder="Product Category"
              search
              selection
              fluid 
              options={categories}
              value={formik.values.ProdCategId}
              onChange={(_, data) => {
                formik.setFieldValue("ProdCategId",data.value);
              }}
              error={formik.errors.ProdCategId} 
            />

            <Form.Group widths="equal">
                <Form.Input 
                  name="ProdStock"
                  type="number" 
                  placeholder="Stock"
                  value={formik.values.ProdStock}
                  onChange={formik.handleChange}
                  error={formik.errors.ProdStock} 
                />
                <Form.Input 
                  name="ProdPrice"
                  type="number" 
                  placeholder="Price"
                  value={formik.values.ProdPrice}
                  onChange={formik.handleChange}
                  error={formik.errors.ProdPrice} 
                />
            </Form.Group>

            <Form.Button type="submit" fluid loading={formik.isSubmitting}>
                Add
            </Form.Button>
        </Form>
    </div>
  )
}
