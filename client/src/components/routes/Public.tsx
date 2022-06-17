import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthProvider';

type PublicProps = {
    component: React.ComponentType;
};

const Public: React.FC<PublicProps> = ({ component: RouteComponent }) => {
    const { isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) navigate('/');
    }, [isAuthenticated, navigate]);

    return <>{!isAuthenticated && <RouteComponent />}</>;
};

export default Public;
