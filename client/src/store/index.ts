import { configureStore } from '@reduxjs/toolkit'
import auth from './auth/auth.slice'
import { appApis } from '../services/api'

export interface RootState {
    auth: ReturnType<typeof auth>
}


const store = configureStore({
    reducer: {
        auth,
        [appApis.reducerPath]: appApis.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(appApis.middleware),
})

export default store

