import { BrowserRouter } from 'react-router-dom'
import Routes from './routes'
import { Provider } from 'react-redux'
import store from './store'
import './styles/global.css'
import { Toaster } from 'react-hot-toast'

export default function App(): JSX.Element {
    return (
        <Provider store={store}>
            <Toaster toastOptions={{ duration: 2000 }} />
            <BrowserRouter>
                <Routes />
            </BrowserRouter>
        </Provider>
    )
}
