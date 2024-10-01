import { Spin } from "antd"

const Splash = (): ReactNode => {
    return (
        <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Spin size="large" />
        </div>
    )
}

export default Splash