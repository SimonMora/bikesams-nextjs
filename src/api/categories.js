const { ENV } = require("@/utils");

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

export const categContrl = {
    getAllCategories,
};