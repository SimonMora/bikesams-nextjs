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

async function login(email, password) {
    try {
        const response = await Auth.signIn({
            username: email,
            password
        });

        const session = Auth.currentAuthenticatedUser({
            bypassCache: false,
        });

        return session;
    } catch (error) {
        throw error;
    }
}

async function retrieveSession() {
    const authContxt = await Auth.currentSession({
        bypassCache: false,
    });

    return authContxt.getAccessToken().getJwtToken();
}

async function logout() {
    try {
        await Auth.signOut();
    } catch (error) {
        throw error;
    }
}

export const authControl = {
    register,
    confirm,
    reSendVerificationCode,
    login,
    retrieveSession,
    logout
};