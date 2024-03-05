const { ENV, fetchAuthenticatedRequest } = require("@/utils");


async function getAllAddresses() {
    try {
        const url = `${ENV.API_URL}${ENV.ENDPOINTS.ADDRESS_ME}`;
        const params = {
            method: 'GET',
        };

        const response = await fetchAuthenticatedRequest(url, params);
        const result = await response.json();

        if (response.status !== 200) {
            throw result;
        }

        return result;
    } catch (error) {
        throw error;
    }
}

export const addressContrl = {
    getAll: getAllAddresses,
};