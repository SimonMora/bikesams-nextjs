import { Button, Image } from 'semantic-ui-react';
import styles from './ProductImageForm.module.scss';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useFormik } from 'formik';
import { initialValues, validateSchema } from './ProductImageForm.form';
import { productControl } from '@/api';

export function ProductImageForm(props) {
    const { onClose, onReload, productId } = props;
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validateSchema(),
        validateOnChange: false,
        onSubmit: async (formValues) => {
            try {
                setLoading(true);

                const render = new FileReader();

                render.readAsArrayBuffer(formValues.file);
                render.onload = async () => {
                    const image = render.result;
                    await productControl.updateImage(productId, image);
                    onReload();
                    onClose();
                };
            } catch (error) {
                console.error(error);
            }
        }
    });

    const onDrop = useCallback(
      (acceptedFile) => {
        const file = acceptedFile[0];
        
        formik.setFieldValue("file", file);
        formik.setFieldValue("preview", URL.createObjectURL(file));
      }
    );
    
    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/jpeg',
        onDrop
    });
    
    const getMiniature = () => {
        if (formik.values.file) {
            return formik.values.preview;
        }
        return null;
    };

  return (
    <div>
        <div className={styles.imageContainer} {...getRootProps()}>
            <input {...getInputProps()}/>

            { getMiniature() ? (
                <Image size='small' src={getMiniature()} />
              )  : ( 
                <div> 
                    <span>Drag the new image</span>
                </div>
              )
            }
        </div>
        <Button primary fluid onClick={formik.handleSubmit} loading={loading}>
            Send
        </Button>
    </div>
  )
}
