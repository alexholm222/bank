import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import qs from 'qs';

const token = document.getElementById('root_bank')?.getAttribute('token');
const baseURL = process.env.REACT_APP_BASE_URL;

export const tableDataApiActions = createApi({
  reducerPath: 'apiActions',
  tagTypes: ['bank', 'extractions', 'accounts'],

  baseQuery: async (args, api, extraOptions) => {
    const { url, method = 'GET', params, body, headers } = args;

    const serializedParams = qs.stringify(params, {
      encode: true,
      arrayFormat: 'brackets',
    });

    const fullUrl = serializedParams ? `${url}?${serializedParams}` : url;

    return fetchBaseQuery({
      baseUrl: baseURL,
      prepareHeaders: (headers) => {
        if (token) headers.set('Authorization', token);
        headers.set('Accept', 'application/json');
        headers.set('Content-Type', 'application/json');
        return headers;
      },
    })({ url: fullUrl, method, body, headers }, api, extraOptions);
  },

  endpoints: (build) => ({
    getTableData: build.infiniteQuery({
      serializeQueryArgs: ({ queryArgs }) => {
        const { tab, filters } = queryArgs;
        const filterKey = qs.stringify(filters, {
          encode: false,
          arrayFormat: 'brackets',
          sort: (a, b) => a.localeCompare(b),
        });
        return `${tab}-${filterKey}`;
      },
      infiniteQueryOptions: {
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
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
          if (tab === 2) return '/extractions';
          if (tab === 3) return '/accounts';
          return '/';
        })();

        const cleanedFilters = Object.entries(filters || {}).reduce((acc, [key, value]) => {
          if (Array.isArray(value) && value.length > 0) {
            acc[key] = value.join(',');
          } else if (value !== undefined && value !== '') {
            acc[key] = value;
          }
          return acc;
        }, {});

        return {
          url: endpoint,
          method: 'GET',
          params: {
            page: pageParam,
            filter: cleanedFilters,
          },
          tab,
        };
      },

      transformResponse: (response, meta, arg) => {
        const safeData = response?.data?.data || [];
        const safeLinks = response?.data?.links || {};
        const safeMeta = response?.data?.meta || {};
        const tab = arg?.tab;

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
