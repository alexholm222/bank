import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const TRANSACTIONS_URL = '/bank';

export const transactionsApi = createApi({
  reducerPath: 'transactionsApi',
  tagTypes: ['TRANSACTIONS'],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers) => {
      const token = document.getElementById('root_bank')?.getAttribute('token');
      if (token) headers.set('Authorization', token);

      return headers;
    },
  }),
  endpoints: (build) => ({
    getTransactions: build.infiniteQuery({
      infiniteQueryOptions: {
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
          const next = lastPage.links?.next;
          if (!next) return undefined;
          const nextPage = new URL(next, 'http://dummy').searchParams.get('page');
          return Number(nextPage);
        },
      },
      query: ({ queryArg, pageParam }) => ({
        url: `${TRANSACTIONS_URL}?page=${pageParam}`,
        method: 'GET',
        params: queryArg,
      }),
      transformResponse: (response) => ({
        data: response?.data?.data || [],
        links: response?.data?.links || {},
        meta: response?.data?.meta || {},
      }),

      providesTags: ['TRANSACTIONS'],
    }),
  }),
});

export const { useGetTransactionsInfiniteQuery } = transactionsApi;
