import { Outlet } from "react-router-dom"
import AppHeader from "../../component/header"
import { GlobalWrapper } from "../../styles/global-styles"

const CustomerLayout = (): JSX.Element => {
  return (
    <>
      <AppHeader />
      <GlobalWrapper >
        <Outlet />
      </GlobalWrapper>
    </>
  )
}

export default CustomerLayout