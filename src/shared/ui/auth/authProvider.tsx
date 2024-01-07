import React, { ReactNode, ProviderProps } from "react";
import { AuthContext } from "./authContext";

interface Props {   
    children: ReactNode,
    name: string,
    loginPath : string
}

export default function AuthProvider({ children, name, loginPath }: Props) {
    const isLoggedIn = (): boolean => {
        return !!localStorage.getItem(name)
    }

    const getToken = (): string | null => {
        return localStorage.getItem(name)
    }

    const clearSession = (): void => {
        
        return localStorage.removeItem(name);
    } 

    return (React.createElement(AuthContext.Provider, { value: { 
        isLoggedIn, 
        getToken,
        clearSession,
        loginPath 
    } } as ProviderProps<any>, children))
}