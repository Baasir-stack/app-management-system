/* eslint-disable @typescript-eslint/no-unused-vars */
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../store';
import { Splash } from '../pages'; // Assuming Splash is the loading screen

interface IPrivateRoute {
    component: ReactNode;
  
}

const PrivateRoute = ({
    component: Component,
  
    ...rest
}: IPrivateRoute): ReactNode => {
    const authState = useSelector((state: RootState) => state.auth);

    // Check if the user is authenticated
    if (authState.isLoadingUser) {
        return <Splash />;
    }

    if (authState.user) {
        return Component ? <Component {...rest} /> : null; // Render the component if authenticated
    }

    return <Navigate to="/" replace />; // Redirect to home if not authenticated
};

export default PrivateRoute;
