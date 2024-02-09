import { Form, Button } from "semantic-ui-react";
import Link from "next/link";
import { useFormik } from "formik";
import { useRouter } from "next/router";

import styles from './LoginForm.module.scss';
import { initialValues, validateValues } from "./LoginForm.form";
import { authControl } from "@/api";
import { useAuth } from "@/hooks";


export function LoginForm() {

    const { login } = useAuth();
    const router = useRouter();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validateValues(),
        validateOnChange: false,
        onSubmit: async (formValues) => {
            try {
                const response = await authControl.login(
                    formValues.email,
                    formValues.password
                );
                try {
                    await login();
                    router.push("/");
                } catch (error) {
                    console.log(error);
                }
                
            } catch (error) {
                console.log(error);
            }
        }
    });

  return (
    <>
        <Form onSubmit={formik.handleSubmit}>
            <Form.Input 
              name="email" 
              placeholder="User email"
              value={formik.values.email} 
              onChange={formik.handleChange} 
              error={formik.errors.email}
            />
            <Form.Input 
              name="password" 
              type="password" 
              placeholder="Password"
              value={formik.values.password} 
              onChange={formik.handleChange} 
              error={formik.errors.password}
            />
            <Form.Button type="submit" fluid loading={formik.isSubmitting}>
                Login
            </Form.Button>
        </Form>
        <p className={styles.register}>Not yet an user?</p>
        <Button as={Link} href="/join/register" fluid basic>
            Sign Up
        </Button>
    </>
  )
}
