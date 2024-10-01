import { Typography } from 'antd'

const { Title } = Typography

interface ITypoGraphy {
    value: string;
    level: 5 | 1 | 2 | 3 | 4 | undefined
    style?: { [key: string]: string | number }
}

const TypoGraphy = ({ value, level, style }: ITypoGraphy): ReactNode => {
    return (
        <Title level={level} {...style && { style }}>{value}</Title>
    )
}

export default TypoGraphy