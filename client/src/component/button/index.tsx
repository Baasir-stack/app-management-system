import { ButtonProps } from 'antd'
import { AppButtonWrapper } from './style'

const Button = ({ children, style, ...rest }: ButtonProps): ReactNode => {
    return (
        <AppButtonWrapper
            style={style}
            {...rest}
        >
            {children}
        </AppButtonWrapper>
    )
}

export default Button
