import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const EXTRACTIONS_URL = '/bank/extracts';

export const extractionsApi = createApi({
  reducerPath: 'extractionsApi',
  tagTypes: ['EXTRACTIONS', 'EXTRACTION'],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers) => {
      const token = document.getElementById('root_bank')?.getAttribute('token');
      if (token) headers.set('Authorization', token);
      return headers;
    },
  }),
  endpoints: (build) => ({
    getExtractions: build.infiniteQuery({
      query: ({ queryArg, pageParam = 1 }) => ({
        url: `${EXTRACTIONS_URL}?page=${pageParam}`,
        method: 'GET',
        params: queryArg,
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
      providesTags: ['EXTRACTIONS'],
    }),

    uploadExtraction: build.mutation({
      query: (file) => {
        const formData = new FormData();
        formData.append('file', file);

        return {
          url: `${EXTRACTIONS_URL}/upload`,
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ['EXTRACTIONS'],
      transformResponse: (responseText) => {
        return { message: responseText };
      },
    }),
    getExtractionDownloadPath: build.query({
      query: ({ id }) => ({
        url: `${EXTRACTIONS_URL}/yadisk/${id}`,
        method: 'GET'
      }),
      transformResponse: (response) => response.data,
      providesTags: ['TRANSACTION'],
    }),
  }),
});

export const {
  useGetExtractionsInfiniteQuery,
  useUploadExtractionMutation,
  useGetExtractionDownloadPathQuery,
  useLazyGetExtractionDownloadPathQuery,
  useLazyGetTransactionsInfiniteQuery,
} = extractionsApi;
