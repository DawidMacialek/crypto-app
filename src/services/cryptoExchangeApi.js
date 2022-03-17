import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
  'x-rapidapi-host': 'coingecko.p.rapidapi.com',
  'x-rapidapi-key': '13b6972412msh71c98bc5fa06ed1p1a5173jsnf9bd7f8da1a4',
};
const baseUrl = 'https://coingecko.p.rapidapi.com';

const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoExchangeApi = createApi({
  reducerPath: 'cryptoExchangeApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoExchange: builder.query({
      query: () => createRequest('/exchanges'),
    }),
  }),
});

export const { useGetCryptoExchangeQuery } = cryptoExchangeApi;
