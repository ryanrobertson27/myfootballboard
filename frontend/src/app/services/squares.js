import { api } from './api';

export const squaresApi = api.injectEndpoints({
  tagTypes: ['Square'],
  endpoints: (build) => ({
    getSquares: build.query({
      query: () => 'squares',
      providesTags: ['Square'],
    }),
    updateSquare: build.mutation({
      query: (body) => ({
        url: `squares/update-owner`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Square'],
    }),
  }),
});

export const { useGetSquaresQuery, useUpdateSquareMutation } = squaresApi;
