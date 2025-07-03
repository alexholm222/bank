import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const token = document.getElementById('root_bank')?.getAttribute('token');
const baseURL = process.env.REACT_APP_BASE_URL;

export const apiActions = createApi({
  reducerPath: 'apiActions',
  tagTypes: ['list', 'detail'],
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? token : '',
      Accept: 'application/json',
    },
  }),
  endpoints: (build) => ({}),
});

// export const {} = apiActions;
