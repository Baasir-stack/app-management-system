import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../store';
import { Splash } from '../pages'; 

interface IPrivateRoute {
    component: ReactNode;
}

const PrivateRoute = ({
    component: Component,
    ...rest
}: IPrivateRoute): ReactNode => {
    const authState = useSelector((state: RootState) => state.auth);

   
    if (authState.isLoadingUser) {
        return <Splash />; 
    }

    if (authState.user) {
        return Component ? <Component {...rest} /> : null;
    }

  
    return <Navigate to="/" replace />;
};

export default PrivateRoute;
