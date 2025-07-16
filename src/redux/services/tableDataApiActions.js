import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const token = document.getElementById('root_bank')?.getAttribute('token');
const baseURL = process.env.REACT_APP_BASE_URL;

export const tableDataApiActions = createApi({
  reducerPath: 'apiActions',
  tagTypes: ['bank', 'extractions', 'accounts'],
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      if (token) {
        headers.set('Authorization', token);
      }
      headers.set('Accept', 'application/json');
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (build) => ({
    getTableData: build.infiniteQuery({
      serializeQueryArgs: ({ queryArgs }) => `${queryArgs.tab}-${queryArgs.search}`,

      infiniteQueryOptions: {
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages, lastPageParam) => {
          const hasNext = lastPage?.links?.next;
          if (!hasNext) return undefined;

          const nextPage = new URL(hasNext, 'http://dummy').searchParams.get('page');
          return Number(nextPage);
        },
      },

      query: ({ queryArg, pageParam = 1 }) => {
        const { tab, filters } = queryArg;
        const endpoint = (() => {
          if (tab === 1) return '/bank';
          if (tab === 2) return '/';
          if (tab === 3) return '/';
          return '/';
        })();

        return {
          url: `${endpoint}?page=${pageParam}`,
          method: 'GET',
          params: filters,
        };
      },

      transformResponse: (response, meta, arg) => {
        const safeData = response?.data?.data || [];
        const safeLinks = response?.data?.links || {};
        const safeMeta = response?.data?.meta || {};
        const tab = arg?.queryArg?.tab;

        return { data: safeData, links: safeLinks, meta: safeMeta, tab };
      },

      providesTags: (result, error, { queryArg }) => {
        const tab = queryArg?.tab;
        switch (tab) {
          case 1:
            return [{ type: 'bank' }];
          case 2:
            return [{ type: 'extractions' }];
          case 3:
            return [{ type: 'accounts' }];
          default:
            return [];
        }
      },
    }),
  }),
});

export const { useGetTableDataInfiniteQuery } = tableDataApiActions;
