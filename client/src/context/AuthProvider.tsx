import { createContext, useEffect, useReducer } from 'react';
import AuthContextState from '../types/AuthContextState';
import reducer from './AuthReducer';
import { AuthActionType } from '../types/AuthReducerAction';
import type { LoginUser } from '../types/User';
import ROLE from '../types/Role';
import AuthService from '../utils/http/auth-service';

const initialState: AuthContextState = {
    isAuthenticated: false,
    login: async (): Promise<boolean> => {
        return false;
    },
};

export const AuthContext = createContext<AuthContextState>(initialState);

type AuthProviderProps = { children: React.ReactChild[] | React.ReactChild };

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        async function checkUserAuthenticated(): Promise<void> {
            const authService = new AuthService();
            const authResponse = await authService.checkIsAuthenticated();

            if (!authResponse) {
                return;
            }

            let userRole: ROLE = ROLE.USER;
            const r = authResponse.role as ROLE;

            if (r === ROLE.ADMIN) {
                userRole = ROLE.ADMIN;
            } else if (r === ROLE.MOD) {
                userRole = ROLE.MOD;
            }

            dispatch({
                type: AuthActionType.USER_LOGIN,
                payload: {
                    id: authResponse.id,
                    role: userRole,
                    username: authResponse.username,
                },
            });
        }
        checkUserAuthenticated();
    }, []);

    const login = async (user: LoginUser): Promise<boolean> => {
        const authService = new AuthService();
        const loginUser = await authService.login(user);

        if (loginUser) {
            const { username, id, role, token } = loginUser;
            localStorage.setItem('token', token);

            dispatch({
                type: AuthActionType.USER_LOGIN,
                payload: { username, id, role },
            });
            return true;
        }
        return false;
    };

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                isAuthenticated: state.isAuthenticated,
                login,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
