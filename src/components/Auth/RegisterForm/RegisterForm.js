import { Form, Button } from "semantic-ui-react";
import Link from "next/link";
import { useFormik } from "formik";
import { useRouter } from "next/router";

import { initialValues, validationSchema } from "./RegisterForm.form";
import { authControl } from "@/api";
import styles from './RegisterForm.module.scss';

export function RegisterForm() {

    const router = useRouter();

    const formik = useFormik({
        initialValues: initialValues(),
        //password is missing validations: lenght, cap characters and special characters
        validationSchema: validationSchema(),
        validateOnChange:false,
        onSubmit: async (formValue) => {
          try {
            const response = await authControl.register(formValue.email, formValue.password);
            console.log(response);
            router.push(`/join/confirm?email=${formValue.email}`);
          } catch (error) {
            //send register error information with banner or something, showing the rror message
            console.log(error);
          }
        },
    });

  return (
    <>
        <Form onSubmit={formik.handleSubmit}>
            <Form.Input 
              name="email" 
              placeholder="E-mail" 
              value={formik.values.email} 
              onChange={formik.handleChange} 
              error={formik.errors.email}
            />
            <Form.Input 
              type="password" 
              name="password" 
              placeholder="Password" 
              value={formik.values.password} 
              onChange={formik.handleChange} 
              error={formik.errors.password}
            />
            <Form.Input 
              type="password" 
              name="repeatPassword" 
              placeholder="Repeat Password" 
              value={formik.values.repeatPassword} 
              onChange={formik.handleChange} 
              error={formik.errors.repeatPassword}
            />
            <Form.Button type="submit" fluid loading={formik.isSubmitting}>
                Sign Up
            </Form.Button>
        </Form>
        <p className={styles.login}>Do you have an account?</p>
        <Button as={Link} href='/join/login' fluid basic>
            Log In
        </Button>

    </>
  );
};
