import ReactDOM from 'react-dom/client'
import App from './App'
import { ConfigProvider } from 'antd'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render( <ConfigProvider
    theme={{
      token: {
        fontFamily: 'Montserrat, sans-serif',  // Override default Ant Design font
      },
    }}
  >
    <App />
  </ConfigProvider>)
