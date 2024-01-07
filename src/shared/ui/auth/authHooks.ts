import { useContext } from 'react';
import { AuthContext } from './authContext';

export function useClearSession() {
    const { clearSession } = useContext<any>(AuthContext);

    return clearSession;
}

export function useGetToken() {
    const { getToken } = useContext<any>(AuthContext);

    return getToken;
}

export function useIsLoggedIn() {
    const { isLoggedIn } = useContext<any>(AuthContext);

    return isLoggedIn;
}