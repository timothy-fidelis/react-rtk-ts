import { faker } from '@faker-js/faker';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { User } from '../slices/usersSlice';

export type Album = {
  id: number;
  title: string;
  userId: number;
};

const pause = (duration: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

export const albumsApi = createApi({
  reducerPath: 'albums',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3005',
    fetchFn: async (...args) => {
      await pause(1000);
      return fetch(...args);
    },
  }),
  tagTypes: ['Album'],
  endpoints: (builder) => ({
    fetchAlbums: builder.query<Album[], User>({
      providesTags: (result, error, user) => [{ type: 'Album', id: user.id }],
      query: (user) => ({
        url: '/albums',
        params: {
          userId: user.id,
        },
        method: 'GET',
      }),
    }),
    addAlbum: builder.mutation<Album, User>({
      invalidatesTags: (result, error, user) => [{ type: 'Album', id: user.id }],
      query: (user) => ({
        url: '/albums',
        method: 'POST',
        body: {
          userId: user.id,
          title: faker.commerce.productName(),
        },
      }),
    }),
  }),
});

export const { useFetchAlbumsQuery, useAddAlbumMutation } = albumsApi;
