import React from 'react'
import AppHeader from '../../../component/header'
import { GlobalWrapper } from '../../../styles/global-styles'
import { Outlet } from 'react-router-dom'

const SuperAdminLayout = (): JSX.Element => {
    return (
        <>
            <AppHeader />
            <GlobalWrapper >
                <Outlet />
            </GlobalWrapper>
        </>
    )
}

export default SuperAdminLayout