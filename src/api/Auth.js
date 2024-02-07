import { Auth } from '@aws-amplify/auth';

async function register(email, password) {
    try {
        const response = await Auth.signUp({
            username: email,
            password
        });
        return response;
    } catch (error) {
        throw error;
    }
}

async function confirm(email, verificationCode) {
    try {
        const response = await Auth.confirmSignUp(email, verificationCode);
        return response;
    } catch (error) {
        throw error;
    }
}

async function reSendVerificationCode(email) {
    try {
        const response = await Auth.resendSignUp(email);
        return response;
    } catch (error) {
        throw error;
    }
}

export const authControl = {
    register,
    confirm,
    reSendVerificationCode,
};