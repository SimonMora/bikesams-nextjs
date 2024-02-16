import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Form, Button } from "semantic-ui-react";

import { Separator } from "@/components/Shared";
import { initialValues, validateForm } from "./CofirmForm.data";
import { authControl } from "@/api";

export function ConfirmForm() {
  const router = useRouter();
  const { query } = router;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    formik.setFieldValue("email", query.email);
  }, [query]);
  
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validateForm(),
    validateOnChange: false,
    onSubmit: async(formValue) => {
        try {
            const response = await authControl.confirm(formValue.email, formValue.verificationCode);
            router.push("/join/login");
        } catch (error) {
            console.log(error);
        }
    }
  });

  const onResendCode = async () => {
    try {
        formik.setFieldError("email", false);

        if (!formik.values.email || formik.values.email === "") {
            formik.setFieldError("email", "Email is required");
            return;
        }

        setLoading(true);
        await authControl.reSendVerificationCode(formik.values.email);
        setLoading(false);
    
    } catch (error) {
        console.log(error);
    }
   };  
    

  return (
    <>
        <Form onSubmit={formik.handleSubmit}>
            <Form.Input 
              name="email" 
              placeholder="User Email"
              value={formik.values.email} 
              onChange={formik.handleChange} 
              error={formik.errors.email}
            />
            <Form.Input 
              name="verificationCode" 
              placeholder="Verification Code"
              value={formik.values.verificationCode} 
              onChange={formik.handleChange} 
              error={formik.errors.verificationCode}
            />
            <Form.Button type="submit" fluid loading={formik.isSubmitting}>
                Confirm Account
            </Form.Button>
        </Form>

        <Separator height={50}/>
        <span>Didn't received the code?</span>
        <Button onClick={onResendCode} loading={loading} fluid basic>
            Send code again
        </Button>
    </>
  )
}
