import * as Yup from 'yup';

export function initialValues() {
    return {
        ProdTitle: "",
        ProdDescription: "",
        ProdPrice: "",
        ProdStock: "",
        ProdPath: "",
        ProdCategId: null,
    };
}

export function validationSchema() {
    Yup.object({
        ProdTitle: Yup.string().required(true),
        ProdDescription: Yup.string().required(true),
        ProdPrice: Yup.number().required(true),
        ProdStock: Yup.number().required(true),
        ProdPath: Yup.string().required(true),
        ProdCategId: Yup.number().required(true),
    });
}