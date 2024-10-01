import { CardWrapper, HeaderWrapper, Wrapper } from './style'
import { Outlet } from 'react-router-dom'
import TypoGraphy from '../../component/typography'
import AnimatedWrapper from '../../component/animated-wrapper'



const AuthLayout = (): any => {

    return (
        <Wrapper>
            <AnimatedWrapper>
            <CardWrapper>
                <HeaderWrapper>
                    <TypoGraphy level={2} value="App Management System" />
                </HeaderWrapper>
                <Outlet />
            </CardWrapper>
            </AnimatedWrapper>
        </Wrapper>
    )
}

export default AuthLayout
