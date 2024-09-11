import { Navigate } from 'react-router-dom';

const AuthRoute = ({ children, isAuthenticated }) => {
    if (!isAuthenticated()) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default AuthRoute;