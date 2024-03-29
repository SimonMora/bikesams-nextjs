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

async function createAddress(data) {
    try {
        const url = `${ENV.API_URL}${ENV.ENDPOINTS.ADDRESS}`;
        const params = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
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

async function updateAddress(addId, data) {
    try {
        const url = `${ENV.API_URL}${ENV.ENDPOINTS.ADDRESS}/${addId}`;
        const params = {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };

        const response = await fetchAuthenticatedRequest(url, params);

        if (response.status !== 200) {
            throw response;
        }

        return true;
    } catch (error) {
        throw error;
    }
}

async function deleteAddress(addId) {
    try {
        const url = `${ENV.API_URL}${ENV.ENDPOINTS.ADDRESS}/${addId}`;
        const params = {
            method: 'DELETE',
        };

        const response = await fetchAuthenticatedRequest(url, params);

        if (response.status !== 200) {
            throw response;
        }

        return true;
    } catch (error) {
        throw error;
    }
}

async function getAddressById(addId) {
    try {
        const filter = `addId=${addId}`
        const url = `${ENV.API_URL}${ENV.ENDPOINTS.ADDRESS_ME}?${filter}`;

        const response = await fetchAuthenticatedRequest(url);
        const result = await response.json();

        if (response.status !== 200) {
            throw result;
        }

        return result[0] || null;
    } catch (error) {
        throw error;
    }
}

export const addressContrl = {
    getAll: getAllAddresses,
    create: createAddress,
    update: updateAddress,
    delete: deleteAddress,
    getById: getAddressById,
};