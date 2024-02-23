import * as Yup from 'yup';

export function initialSchema(data) {
    return {
        categName: data?.categName || "",
        categPath: data?.categPath || "",
    };
}

export function validateSchema() {
    return Yup.object({
        categName: Yup.string().required(true),
        categPath: Yup.string().required(true),
    });
}