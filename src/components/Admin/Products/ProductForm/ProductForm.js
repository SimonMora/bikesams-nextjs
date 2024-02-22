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
    const { onClose, onReload, product } = props;
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
        initialValues: initialValues(product),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
              if (product) {
                //TODO
                await productControl.update(product.prodId, formValue);
              } else {
                await productControl.create(formValue);
              }
              onReload();
              onClose();
            } catch (error) {
              console.log(error);
            }
        },
    });

  return (
    <>
        <Form onSubmit={formik.handleSubmit}>
            <Form.Input 
              name="prodTitle" 
              placeholder="Name"
              value={formik.values.prodTitle}
              onChange={formik.handleChange}
              error={formik.errors.prodTitle}  
            />
            <Form.Input 
              name="prodPath" 
              placeholder="Slug"
              value={formik.values.prodPath}
              onChange={formik.handleChange}
              error={formik.errors.prodPath}  
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
                initialValue={formik.values.prodDescription}
                onBlur={(event) => {
                    formik.setFieldValue("prodDescription", event.target.getContent())
                }}
                error={formik.errors.prodDescription}
              />

            <Separator height={20} />
            <Form.Dropdown 
              name="prodCategId"
              placeholder="Product Category"
              search
              selection
              fluid 
              options={categories}
              value={formik.values.prodCategId}
              onChange={(_, data) => {
                formik.setFieldValue("prodCategId", data.value);
              }}
              error={formik.errors.prodCategId} 
            />

            <Form.Group widths="equal">
                <Form.Input 
                  name="prodStock"
                  type="number" 
                  placeholder="Stock"
                  value={formik.values.prodStock}
                  onChange={formik.handleChange}
                  error={formik.errors.prodStock} 
                />
                <Form.Input 
                  name="prodPrice"
                  type="number" 
                  placeholder="Price"
                  value={formik.values.prodPrice}
                  onChange={formik.handleChange}
                  error={formik.errors.prodPrice} 
                />
            </Form.Group>

            <Form.Button type="submit" fluid loading={formik.isSubmitting}>
                Send
            </Form.Button>
        </Form>
    </>
  )
}
