import type { LoginUser, User } from './User';

type AuthContextState = {
    user?: User;
    isAuthenticated: boolean;
    login: (user: LoginUser) => Promise<boolean>;
};

export default AuthContextState;
