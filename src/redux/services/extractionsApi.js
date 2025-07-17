import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const extractionsApi = createApi({
  reducerPath: 'extractionsApi',
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
    getExtractions: build.infiniteQuery({
      query: ({ pageParam = 1, filters }) => ({
        url: `/bank?page=${pageParam}`,
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
  }),
});

export const { useGetExtractionsInfiniteQuery } = extractionsApi;
