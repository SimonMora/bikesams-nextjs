import { authControl, userContrl } from "@/api";
import { useState, useEffect, createContext } from "react";

export const AuthContext = createContext();

export function AuthProvider(props) {
    const { children } = props;
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        (async () => {
            try {
               await login();
               setLoading(false); 
            } catch (error) {
                setLoading(false);
            }
        })();
    }, []);
    

    const login = async () => {
        try {
            const userInfo = await userContrl.me();
            setUser(userInfo);
            setIsAdmin(userInfo.userStatus === 0);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);    
        }
    };

    const logout = async () => {
        try {
            setUser(null);
            await authControl.logout();
        } catch (error) {
            throw error;
        }
    };

    const data = {
        user,
        logout,
        isAdmin,
        login,
    };

    if (loading) {
        return null;
    }

    return (<AuthContext.Provider value={data}>{children}</AuthContext.Provider>);   
}