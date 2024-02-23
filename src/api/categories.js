const { ENV, fetchAuthenticatedRequest } = require("@/utils");

async function getAllCategories() { 
    try {
        const url = `${ENV.API_URL}${ENV.ENDPOINTS.CATEGORY}`;
        const res = await fetch(url);
        const result = await res.json();

        if (res.status !== 200) {
            throw result;
        }

        return result;
    } catch (error) {
        throw error;
    } 
}

async function addCategory(data) { 
    try {
        const url = `${ENV.API_URL}${ENV.ENDPOINTS.CATEGORY}`;
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
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

async function updateCategory(categId, data) { 
    try {
        const url = `${ENV.API_URL}${ENV.ENDPOINTS.CATEGORY}/${categId}`;
        const params = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
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

async function deleteCategory(categId) { 
    try {
        const url = `${ENV.API_URL}${ENV.ENDPOINTS.CATEGORY}/${categId}`;
        const params = {
            method: "DELETE",
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

export const categContrl = {
    add: addCategory,
    update: updateCategory,
    delete: deleteCategory,
    getAllCategories,
};