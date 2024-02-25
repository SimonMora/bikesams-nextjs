import *as Yup from 'yup';

export function initialValues() {
    return {
        file: null,
        preview: null,
    };
}

export function validateSchema() {
    return Yup.object({
        file: Yup.string().required(true),
    });
}