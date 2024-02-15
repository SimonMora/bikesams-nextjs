const { ENV } = require("@/utils");

async function getPaginatedProducts(page = 1, pageSize = 10, search = "") {
    try {
        const paginationFilters = `page=${page}&pageSize=${pageSize}`;
        const searchFilter = `&search=${search}`;
        const filters = `${paginationFilters}${searchFilter}`;

        const url = `${ENV.API_URL}${ENV.ENDPOINTS.PRODUCT}?${filters}`;

        const response = await fetch(url);
        const result = await response.json();
        if (response.status !== 200) {
            throw result;
        }

        return result;
    } catch (error) {
        throw error;
    }
}

export const productControl = {
    getAll: getPaginatedProducts,
}