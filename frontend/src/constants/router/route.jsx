import Home from '../../pages/Home';
import Login from '../../pages/Login';
import LoginMobile from '../../pages/LoginMobile';
import Register from '../../pages/Register';
import ForgotPassword from '../../pages/ForgotPassword';
import AuthRoute from './authRoute';
import NotFound from '../../pages/NotFound';

const isAuthenticated = () => {
    const savedUsername = localStorage.getItem('username');
    return savedUsername !== null;
    
};

export const ROUTES = [
    {
        path: '/',
        element: <AuthRoute isAuthenticated={isAuthenticated()}><Home /></AuthRoute>,
    },

    {
        path: '/login',
        element: <Login />,
    },

    {
        path: '/login-mobile',
        element: <LoginMobile />,
    },

    {
        path: '/register',
        element: <Register />,
    },

    {
        path: '/forgot-password',
        element: <ForgotPassword />,
    },

    {
        path: '*',
        element: <NotFound />,
    }
];