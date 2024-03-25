const { ENV, fetchAuthenticatedRequest } = require("@/utils");

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

async function createProduct(data) {
    try {
        const url = `${ENV.API_URL}${ENV.ENDPOINTS.PRODUCT}`;
        const params = {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
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

async function updateProduct(prodId, data) {
    try {
        const url = `${ENV.API_URL}${ENV.ENDPOINTS.PRODUCT}/${prodId}`;
        const params = {
            method: 'PUT',
            headers: {
                'Content-Type': "application/json",
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

async function deleteProduct(prodId) {
    try {
        const url = `${ENV.API_URL}${ENV.ENDPOINTS.PRODUCT}/${prodId}`;
        const params = {
            method: 'DELETE',
            headers: {},
        };

        const response = await fetchAuthenticatedRequest(url, params);
        
        if (response.status !== 200) throw response;
        
        return true;
    } catch (error) {
        throw error;
    }
}

async function updateProductImage(productId, image) {
    
    try {
        const url = `${ENV.MEDIA_API}${productId}.jpg`;
        const params = {
            method: "PUT",
            headers: {
                "Content-Type": "image/jpeg",
            },
            body: image,
        };
    
        const response = await fetchAuthenticatedRequest(url, params);
    
        if (response.status !== 200) throw response;
        
        return true; 
    } catch (error) {
        throw error;
    }
}

async function getProductByCategorySlug(slug, page = 1, pageSize = 10) {
    try {
        const categoryFilter = `slugCategory=${slug}`;
        const paginationFilter = `page=${page}&pageSize=${pageSize}`;
        
        const filters = `${categoryFilter}&${paginationFilter}`;

        const url = `${ENV.API_URL}${ENV.ENDPOINTS.PRODUCT}?${filters}`;

        const response = await fetch(url);
        const result = await response.json();

        if(response.status !== 200) throw result;

        return result;
    } catch (error) {
        throw error;
    }
}

async function getProductBySlug(slug) {
    try {
        const filter = `slug=${slug}`;
        const url = `${ENV.API_URL}${ENV.ENDPOINTS.PRODUCT}?${filter}`;

        const response = await fetch(url);
        const result = await response.json();

        if (response.status !== 200) throw result;

        return result;
    } catch (error) {
        throw error;
    }
}

export const productControl = {
    getAll: getPaginatedProducts,
    create: createProduct,
    update: updateProduct,
    updateImage: updateProductImage,
    delete: deleteProduct,
    getProductByCategSlug: getProductByCategorySlug,
    getBySlug: getProductBySlug,
};