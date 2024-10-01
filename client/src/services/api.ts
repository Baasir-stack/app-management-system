import { prepareHeaders } from './_utils'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const appApis = createApi({
    reducerPath: 'appApis',
    baseQuery: fetchBaseQuery({
        baseUrl: `http://localhost:8000/api/`,
        prepareHeaders,
        credentials: 'include',
    }),
    tagTypes: ['Product', 'Categories'],

    endpoints: (builder) => ({
        getUserInfo: builder.query<any, void>({
            query: () => 'users/me'
        }),
        getUserProducts: builder.query<any, IPagination>({
            query: (pagination: IPagination) => {
                const { page, pageSize } = pagination
                return {
                    url: 'products/user',
                    method: 'GET',
                    params: { page, pageSize }
                }
            },
            providesTags: ["Product"]
        }),
        getAllProducts: builder.query({
            query: (pagination) => {
                const { page, pageSize } = pagination
                return {
                    url: 'products/all',
                    method: 'GET',
                    params: { page, pageSize }
                }
            },
            serializeQueryArgs: ({ endpointName }) => {
                return endpointName;
            },
            merge: (currentCache, newItems) => {
                currentCache.products.push(...newItems.products);
            },
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg;
            }
        }),
        getCategories: builder.query<any, void>({
            query: () => "category"
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
        editApp: builder.mutation({
            query: ({ appData, appId }: { appData: any; appId: string }) => ({
              url: `app/update/${appId}`, // no need for ':'
              method: 'PATCH',
              body: appData
            })
        }),

        updateProfile: builder.mutation({
            query: ({ updatedProfileData }: { updatedProfileData: any;  }) => ({
              url: `users/me`,
              method: 'PATCH',
              body: updatedProfileData
            })
        }),

        updatePassword: builder.mutation({
            query: ({ password, confirmPassword  }: { password:string, confirmPassword :string }) => ({
              url: `users/me/password`,
              method: 'PUT',
              body: {
                password,
                confirmPassword
              }
            })
        }),


 
        addProduct: builder.mutation({
            query: (credentials) => ({
                url: 'products/',
                method: 'POST',
                body: credentials
            }),
            invalidatesTags: ["Product"]
        }),
        updateProduct: builder.mutation<void, any>({
            query: ({ id, formData }) => ({
                url: `products/${id}`,
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: ["Product"]
        }),
        deleteProduct: builder.mutation<{ id: string }, void>({
            query: (id) => ({
                url: `products/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["Product"]
        }),
        getProductsBySearch: builder.mutation<any, { keyword?: string } | any>({
            query: (keyword) => {
                return {
                    url: 'products',
                    method: 'GET',
                    params: keyword
                }
            },
        }),
        addCategory: builder.mutation<any, IKeyValue>({
            query: (body) => {
                return {
                    url: 'category',
                    method: 'POST',
                    body
                }
            },
            invalidatesTags: ["Categories"]
        }),
        getAllCategories: builder.query<any, void>({
            query: () => 'category',
            providesTags: ["Categories"]

        }),
        deleteCategory: builder.mutation<IKeyValue, void>({
            query: (id) => ({
                url: `category/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["Categories"]
        }),
        updateCategory: builder.mutation<void, any>({
            query: ({ id, values }) => ({
                url: `category/${id}`,
                method: 'PUT',
                body: values,
            }),
            invalidatesTags: ["Categories"]
        }),
    })
})

export const {
    useGetUserInfoQuery,
    useLoginMutation,
    useRegisterMutation,
    useGetUserProductsQuery,
    useAddProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useGetCategoriesQuery,
    useGetAllProductsQuery,
    useGetProductsBySearchMutation,
    useAddCategoryMutation,
    useGetAllCategoriesQuery,
    useDeleteCategoryMutation,
    useUpdateCategoryMutation,
    useLogoutMutation,
    useForgetPasswordMutation,  
    useResetPasswordMutation ,
    useGetAllAppsQuery,
    useCreateSubscriptionMutation,
    useGetAllSubDetailsQuery,
    useCreateNewAppMutation,
    useEditAppMutation,
    useUpdateProfileMutation,
    useUpdatePasswordMutation
} = appApis

