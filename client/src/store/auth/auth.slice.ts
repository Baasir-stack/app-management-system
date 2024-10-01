import { createSlice } from "@reduxjs/toolkit";
import { appApis } from "../../services/api";

interface IUser {
  id: string;
  firstName: string; 
  lastName: string; 
  email: string;
  avatar?: string;   
  status?: string;   
  role?: string;     

}

interface IAuthInitialState {
  user: IUser | null;
  isLoadingUser: boolean;
}


const getUserFromLocalStorage = (): IUser | null => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};


const persistUserInLocalStorage = (user: IUser | null) => {
  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
  } else {
    localStorage.removeItem('user');
  }
};

const initialState: IAuthInitialState = {
  user: getUserFromLocalStorage(), // Load user from localStorage on init
  isLoadingUser: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state: IAuthInitialState, { payload }) => {
      state.user = payload.user;
      persistUserInLocalStorage(payload.user); // Persist user in localStorage
    },
    logout: (state: IAuthInitialState) => {
      state.user = null;
      persistUserInLocalStorage(null); // Clear user from localStorage on logout
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(appApis.endpoints.getUserInfo.matchPending, (state: IAuthInitialState) => {
        state.isLoadingUser = true; 
      })
      .addMatcher(appApis.endpoints.getUserInfo.matchFulfilled, (state: IAuthInitialState, { payload }) => {
        state.user = payload.user;
        state.isLoadingUser = false; 
        persistUserInLocalStorage(payload.user); // Persist user info
      })
      .addMatcher(appApis.endpoints.getUserInfo.matchRejected, (state: IAuthInitialState) => {
        state.user = null;
        state.isLoadingUser = false; 
      });

    builder
      .addMatcher(appApis.endpoints.login.matchPending, (state: IAuthInitialState) => {
        state.isLoadingUser = true;  
      })
      .addMatcher(appApis.endpoints.login.matchFulfilled, (state: IAuthInitialState, { payload }) => {
        state.user = payload.user;
        state.isLoadingUser = false; 
        persistUserInLocalStorage(payload.user); // Persist user info
      })
      .addMatcher(appApis.endpoints.login.matchRejected, (state: IAuthInitialState) => {
        state.isLoadingUser = false; 
      });

    builder
      .addMatcher(appApis.endpoints.logout.matchPending, (state: IAuthInitialState) => {
        state.isLoadingUser = true;  
      })
      .addMatcher(appApis.endpoints.logout.matchFulfilled, (state: IAuthInitialState) => {
        state.user = null;
        state.isLoadingUser = false; 
        persistUserInLocalStorage(null); // Clear user on logout
      })
      .addMatcher(appApis.endpoints.logout.matchRejected, (state: IAuthInitialState) => {
        state.isLoadingUser = false; 
      });
  },
});

export const { logout, setAuth } = slice.actions;

export default slice.reducer;
