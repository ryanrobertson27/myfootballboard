import { api } from './api';

export const squaresApi = api.injectEndpoints({
  endpoints: (build) => ({
    getSquares: build.query({
      query: () => 'squares',
    }),
    updateSquare: build.mutation({
      query: (body) => ({
        url: `squares/update`,
        method: 'PATCH',
        body,
      }),
    }),
  }),
});

export const { useGetSquaresQuery, useUpdateSquareMutation } = squaresApi;
