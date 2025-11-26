import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const BANK_URL = '/bank';
export const accountsApi = createApi({
  reducerPath: 'accountsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers) => {
      const token = document.getElementById('root_bank')?.getAttribute('token');
      if (token) headers.set('Authorization', token);
      // headers.set('Content-Type', 'application/json');
      // headers.set('Accept', 'application/json');
      return headers;
    },
  }),
  endpoints: (build) => ({
    getAccounts: build.infiniteQuery({
      query: ({ pageParam = 1, queryArg }) => ({
        url: `${BANK_URL}/partnership_details/?page=${pageParam}`,
        method: 'GET',
        params: queryArg,
      }),
      // transformResponse: (response) => ({
      //   data: response?.pages || [],
      //   // links: response?.data?.links || {},
      //   // meta: response?.data?.meta || {},
      // }),
      infiniteQueryOptions: {
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
          const next = lastPage?.links?.next;
          if (!next) return undefined;
          const nextPage = new URL(next, 'http://dummy').searchParams.get('page');
          return Number(nextPage);
        },
      },
      providesTags: ['accounts'],
    }),
    createBankAccount: build.mutation({
      query: (body) => ({
        url: `${BANK_URL}/partnership_details/create`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['accounts'],
    }),
    changeStatusBankAccount: build.mutation({
      query: ({ id }) => ({
        url: `${BANK_URL}/partnership_details/change-status/${id}`,
        method: 'POST',
      }),
      invalidatesTags: ['accounts'],
    }),
    setMainBankAccount: build.mutation({
      query: (id) => ({
        url: `${BANK_URL}/partnership_details/set-main/${id}`,
        method: 'POST',
      }),
      invalidatesTags: ['accounts'],
    }),
    deleteBankAccount: build.mutation({
      query: (id) => ({
        url: `${BANK_URL}/partnership_details/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['accounts'],
    }),
  }),
});

export const {
  useGetAccountsInfiniteQuery,
  useCreateBankAccountMutation,
  useChangeStatusBankAccountMutation,
  useSetMainBankAccountMutation,
  useDeleteBankAccountMutation,
} = accountsApi;
