import * as Yup from 'yup';

export function initialValues() {
    return ({
        email: "",
        verificationCode: "",
    });
}

export function validateForm() {
    return Yup.object({
        email: Yup.string().email(true).required(true),
        verificationCode: Yup.string().required(),
    });
}