const { ENV, fetchAuthenticatedRequest } = require("@/utils");
const { Auth } = require("aws-amplify");

async function me() {
    
    const url = `${ENV.API_URL}${ENV.ENDPOINTS.USER_ME}`;
    const res = await fetchAuthenticatedRequest(url, null);
    const result = await res.json();

    if (res.status !== 200) {
        throw result;
    }

    return result;
}

export const userContrl = {
    me,
};