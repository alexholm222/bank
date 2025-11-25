import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const BANK_URL = '/bank';
export const accountsApi = createApi({
  reducerPath: 'accountsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers) => {
      const token = document.getElementById('root_performers')?.getAttribute('token');
      if (token) headers.set('Authorization', token);
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (build) => ({
    getAccounts: build.infiniteQuery({
      query: ({ pageParam = 1, filters }) => ({
        url: `/?page=${pageParam}`,
        method: 'GET',
        params: filters,
      }),
      transformResponse: (response) => ({
        data: response?.data?.data || [],
        links: response?.data?.links || {},
        meta: response?.data?.meta || {},
      }),
      infiniteQueryOptions: {
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
          const next = lastPage?.links?.next;
          if (!next) return undefined;
          const nextPage = new URL(next, 'http://dummy').searchParams.get('page');
          return Number(nextPage);
        },
      },
    }),
    createBankAccount: build.mutation({
      query: (body) => ({
        url: `${BANK_URL}/partnership_details/create`,
        method: 'POST',
        body,
      }),
    }),
    deactivateBankAccount: build.mutation({
      query: ({ id, new_main_detail_id }) => ({
        url: `${BANK_URL}/partnership_details/deactivate/${id}`,
        method: 'POST',
        body: { new_main_detail_id },
      }),
    }),
    setMainBankAccount: build.mutation({
      query: (id) => ({
        url: `${BANK_URL}/partnership_details/set-main/${id}`,
        method: 'POST',
      }),
    }),
    deleteBankAccount: build.mutation({
      query: (id) => ({
        url: `${BANK_URL}/partnership_details/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAccountsInfiniteQuery,
  useCreateBankAccountMutation,
  useDeactivateBankAccountMutation,
  useSetMainBankAccountMutation,
  useDeleteBankAccountMutation,
} = accountsApi;
