import { useCallback, useEffect, useState } from 'react';
import styles from './AvatarForm.module.scss';
import { Button, Image } from 'semantic-ui-react';
import { useDropzone } from 'react-dropzone';
import { useFormik } from 'formik';
import { initialValues, validateSchema } from './AvatarForm.form';
import { fn } from '@/utils';
import { useAuth } from '@/hooks';
import { userContrl } from '@/api';

export function AvatarForm() {

    const [avatar, setAvatar] = useState(null);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validateSchema(),
        validateOnChange: false,
        onSubmit: async (formValues) => {
            try {
                console.log(user);
                setLoading(true);
                const render = new FileReader();
                render.readAsArrayBuffer(formValues.file);
                render.onload = async () => {
                    const image = render.result;
                    const response = userContrl.updateAvatar(user.userUUID, image);
                    setLoading(false);
                };
            } catch (error) {
                console.error(error);
            }
        },
    });

    const onDrop = useCallback(
        (acceptedFiles) => {
          const file = acceptedFiles[0];
          formik.setFieldValue("file", file);
          formik.setFieldValue("preview", URL.createObjectURL(file));
        }
    );

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/jpeg',
        onDrop
    });

    useEffect(() => {
        if(formik.values.file) {
          setAvatar(formik.values.preview);
        } else {
          const imageUrl = fn.getImageUrl(user?.userUUID);
          fn.checkImageExist(imageUrl, (exist) => { 
              if (exist) {
                  setAvatar(imageUrl);
              } else {
                  setAvatar(null);
              }
          });
        }
    }, [formik.values.file]);
    
  return (
    <>
        <div className={styles.imageContainer} {...getRootProps()}>
            <input {...getInputProps()}/>
            {
                avatar ? (
                    <Image size="small" src={avatar} />
                ) : (
                    <div>
                        <span>Drag your image or click.</span>
                    </div>
                )
            }
        </div>
        <Button 
          primary
          type="submit" 
          loading={loading} 
          onClick={formik.handleSubmit}
        >
            Send
        </Button>
    </>
  );
}
