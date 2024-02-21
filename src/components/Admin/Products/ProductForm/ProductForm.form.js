import * as Yup from 'yup';

export function initialValues() {
    return {
        prodTitle: "",
        prodDescription: "",
        prodPrice: "",
        prodStock: "",
        prodPath: "",
        prodCategId: "",
    };
}

export function validationSchema() {
    Yup.object({
        prodTitle: Yup.string().required(true),
        prodDescription: Yup.string().required(true),
        prodPrice: Yup.number().required(true),
        prodStock: Yup.number().required(true),
        prodPath: Yup.string().required(true),
        prodCategId: Yup.number().required(true),
    });
}