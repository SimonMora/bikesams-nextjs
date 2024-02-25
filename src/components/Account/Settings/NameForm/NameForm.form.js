import * as Yup from 'yup';

export function initialValues(firstName, lastName) {
    return {
        userFirstName: firstName || "",
        userLastName: lastName || "",
    };
}

export function validateSchema() {
    return Yup.object({
        userFirstName: Yup.string().required(true),
        userLastName: Yup.string().required(true),
    });
}