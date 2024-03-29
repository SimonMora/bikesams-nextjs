const { ENV, fetchAuthenticatedRequest } = require("@/utils");


async function createOrder(data) {
    try {
        const url = `${ENV.API_URL}${ENV.ENDPOINTS.ORDER}`;
        const params = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };

        const response = await fetchAuthenticatedRequest(url, params);

        if (response.status !== 200) throw response;

        return true;
    } catch (error) {
        throw error;
    }
}

async function getAllOrders() {
    try {
        const url = `${ENV.API_URL}${ENV.ENDPOINTS.ORDER}`;

        const response = await fetchAuthenticatedRequest(url);
        const result = await response.json();

        if (response.status !== 200) throw result;

        return result;
    } catch (error) {
        throw error;
    }
}

export const orderControll = {
    createOrder,
    getAll: getAllOrders,
};