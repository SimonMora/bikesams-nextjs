import { authControl } from "@/api";

export async function fetchAuthenticatedRequest(url, params) {

    const token = await authControl.retrieveSession();
    console.log(token);
    const logout = () => {
        authControl.logout();
        window.location.replace("/");
    }; 

    if (!token) {
        logout();        
    } else {
        const paramsAuth = {
            ...params,
            headers: {
                ...params?.headers,
                Authorization: token,
            },
        };
        try {
            const response = await fetch(url, paramsAuth);
            return response;
        } catch (error) {
            throw error;
        }
        
    }
}