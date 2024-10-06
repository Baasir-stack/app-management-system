import { prepareHeaders } from './_utils'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const appApis = createApi({
    reducerPath: 'appApis',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_API_URL}/api/`,
        prepareHeaders,
        credentials: 'include',
    }),
  

    endpoints: (builder) => ({
        getUserInfo: builder.query<any, void>({
            query: () => 'users/me'
        }),
        getProfileDetails: builder.query<any, void>({
            query: () => 'users/me'
        }),
    
       
        login: builder.mutation({
            query: (credentials) => ({
                url: 'auth/login',
                method: 'POST',
                body: credentials
            })
        }),
        register: builder.mutation({
            query: (credentials) => ({
                url: 'auth/register',
                method: 'POST',
                body: credentials
            })
        }),
        logout: builder.mutation<any, unknown>({
            query: () => ({
                url: 'auth/logout',
                method: 'POST'
            })
        }),

        
        forgetPassword: builder.mutation({
            query: (email) => ({
                url: 'auth/forget-password',
                method: 'POST',
                body: { email }
            })
        }),


        resetPassword: builder.mutation({
            query: ({ token, password, confirmPassword }) => ({
                url: `auth/reset-password/${token}`,
                method: 'POST',
                body: { password, confirmPassword }
            })
        }),
        validateResetPasswordToken: builder.mutation({
            query: (token) => ({
                url: `auth/reset-password/validate/${token}`,
                method: 'POST',
               
            })
        }),

        getAllApps: builder.query({
            query: (userId) => ({
                url: `app/getAllUserApps/${userId}`,
                method: 'GET',
            
            })
        }),

        getAllSubDetails: builder.query({
            query: (userId) => ({
                url: `subs/getSubsById/${userId}`,
                method: 'GET',
            
            })
        }),

        getSubPlanDetails: builder.query({
            query: () => ({
                url: `subs-plan/plans`,
                method: 'GET',
            
            })
        }),
        
        createSubscription: builder.mutation({
            query: (subsData) => ({
                url: `subs/create`,
                method: 'POST',
                body: subsData
            
            })
        }),
        createNewApp: builder.mutation({
            query: (appData) => ({
                url: `app/create`,
                method: 'POST',
                body: appData
            
            })
        }),
        deleteApp: builder.mutation({
            query: (appId) => ({
                url: `app/delete/${appId}`,
                method: 'DELETE',
              
            
            })
        }),
        editApp: builder.mutation({
            query: ({ appData, appId }: { appData: any; appId: string }) => ({
              url: `app/update/${appId}`, // no need for ':'
              method: 'PATCH',
              body: appData
            })
        }),

        updateProfile: builder.mutation({
            query: (updatedProfileData) =>  ({
              url: `users/me`,
              method: 'PATCH',
              body: updatedProfileData
            })
        }),

        updatePassword: builder.mutation({
            query: ({ currentPassword,password, confirmPassword  }: {currentPassword:string ,password:string, confirmPassword :string }) => ({
              url: `users/me/password`,
              method: 'PUT',
              body: {
                currentPassword,
                password,
                confirmPassword
              }
            })
        }),


 
       
    })
})

export const {
    useGetUserInfoQuery,
    useLoginMutation,
    useRegisterMutation,
    useValidateResetPasswordTokenMutation,
    useLogoutMutation,
    useForgetPasswordMutation,  
    useResetPasswordMutation ,
    useGetAllAppsQuery,
    useCreateSubscriptionMutation,
    useGetAllSubDetailsQuery,
    useCreateNewAppMutation,
    useEditAppMutation,
    useUpdateProfileMutation,
    useUpdatePasswordMutation,
    useGetSubPlanDetailsQuery,
    useGetProfileDetailsQuery,
    useDeleteAppMutation
} = appApis

