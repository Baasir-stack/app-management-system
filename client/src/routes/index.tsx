/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-empty-pattern */
import { Navigate, useRoutes } from 'react-router-dom';
import PublicRoute from './public-route';
import { Error404NotFound, Login, Register, ForgotPassword, ResetPassword, SubscriptionsPage } from '../pages';
// import { useSelector } from 'react-redux';
// import { RootState } from '../store';
import { AuthLayout } from '../layouts';
import { UserPage } from '../pages/user';
import {AppDetails} from '../pages/app';
import PrivateLayout from '../layouts/private-pages';
import PrivateRoute from './private-route';

export default function Routes(): ReactNode {
    // const { user } = useSelector((state: RootState) => state.auth);

    const publicRoutes = [
        {
            path: '/',
            element: <PublicRoute component={AuthLayout} />,
            children: [
                { path: "", element: <Login /> },
                { path: "/register", element: <Register /> },
                { path: "/forgot-password", element: <ForgotPassword /> },
                { path: "/reset-password", element: <ResetPassword /> },
            ],
        },
        {
            path: '*',
            element: <Navigate to="/404" />,
        },
        { path: '404', element: <Error404NotFound /> },
    ];

    // Define private routes for authenticated users
    const privateRoutes = [
        {
            path: '/profile',
            element: <PrivateRoute component={PrivateLayout} />, // Protect this route with PrivateRoute
            children: [
                { path: '', element: <UserPage /> },
            ],
        },
        {
            path: '/app',
            element: <PrivateRoute component={PrivateLayout} />, // Protect this route with PrivateRoute
            children: [
                { path: '', element: <AppDetails /> },
            ],
        },
        {
            path: '/subscription/:appId',
            element: <PrivateRoute component={PrivateLayout} />, // Protect this route with PrivateRoute
            children: [
                { path: '', element: <SubscriptionsPage /> },
            ],
        },
    ];
    return useRoutes([...publicRoutes, ...privateRoutes]);
}
