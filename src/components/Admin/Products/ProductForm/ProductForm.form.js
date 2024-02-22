import * as Yup from 'yup';

export function initialValues(data) {
    return {
        prodTitle: data?.prodTitle || "",
        prodDescription: data?.prodDescription || "",
        prodPrice: data?.prodPrice || "",
        prodStock: data?.prodStock || "",
        prodPath: data?.prodPath || "",
        prodCategId: data?.prodCategoryId || null,
    };
}

export function validationSchema() {
    return Yup.object({
        prodTitle: Yup.string().required(true),
        prodDescription: Yup.string().required(true),
        prodPrice: Yup.number().required(true),
        prodStock: Yup.number().required(true),
        prodPath: Yup.string().required(true),
        prodCategId: Yup.number().required(true),
    });
}