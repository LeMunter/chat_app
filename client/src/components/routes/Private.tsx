import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import ROLE from '../../types/Role';

type PrivateProps = {
    component: React.ComponentType;
    roles: Array<ROLE>;
};

const Private: React.FC<PrivateProps> = ({
    component: RouteComponent,
    roles,
}) => {
    const { user, isAuthenticated } = useContext(AuthContext);
    const userHasRequiredRole = user && roles.includes(user.role);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated || !userHasRequiredRole) navigate('/login');
    }, [isAuthenticated, userHasRequiredRole, navigate]);

    return (
        <>
            {isAuthenticated && userHasRequiredRole && <RouteComponent />}
            {isAuthenticated && !userHasRequiredRole && navigate('/')}
        </>
    );
};

export default Private;
