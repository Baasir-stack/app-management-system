import { Outlet } from 'react-router-dom'
import AppHeader from '../../../component/header'
import { SubWrapper, Wrapper } from './style'
import { GlobalWrapper } from '../../../styles/global-styles'

const VendorLayout = (): JSX.Element => {
  return (
    <Wrapper >
      <SubWrapper>
        <AppHeader />
        <GlobalWrapper>
          <Outlet />
        </GlobalWrapper>
      </SubWrapper>
    </Wrapper >
  )
}

export default VendorLayout