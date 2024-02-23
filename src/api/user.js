const { ENV, fetchAuthenticatedRequest } = require("@/utils");

async function me() {
    const url = `${ENV.API_URL}${ENV.ENDPOINTS.USER_ME}`;
    const res = await fetchAuthenticatedRequest(url, null);
    const result = await res.json();

    if (res.status !== 200) {
        throw result;
    }

    return result;
}

async function listAllUsers(page = 1) {
    const filters = `page=${page}`;
    const url = `${ENV.API_URL}${ENV.ENDPOINTS.USERS}?${filters}`;
    const res = await fetchAuthenticatedRequest(url, null);
    const result = await res.json();

    if (res.status !== 200) {
        throw result;
    }

    return result;
}

export const userContrl = {
    me,
    list: listAllUsers,
};