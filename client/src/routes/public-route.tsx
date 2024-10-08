import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { RootState } from '../store'
import { Splash } from '../pages'

interface IPublicRoute {
  component: ReactNode
}

const PublicRoute = ({ component: Component, ...rest }: IPublicRoute): ReactNode => {
  const authState = useSelector((state: RootState) => state.auth)

  if (authState.isLoadingUser) {
    return <Splash />
  }

  const publicRoutes = ["/", "/register", "/forgot-password", "/reset-password/:token"];

  if (authState.user && publicRoutes.includes(window.location.pathname)) {
    return <Navigate to="/app" replace />;
  }


  return <Component {...rest} />
}

export default PublicRoute
