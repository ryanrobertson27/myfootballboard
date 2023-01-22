import { api } from './api';

export const squaresApi = api.injectEndpoints({
  endpoints: (build) => ({
    getSquares: build.query({
      query: () => 'squares',
    }),
    updateSquare: build.mutation({
      query: ({ id, ...patch }) => ({
        url: `/update/${id}`,
        method: 'PATCH',
        body: patch,
      }),
    }),
  }),
});

export const { useGetSquaresQuery, useUpdateSquareMutation } = squaresApi;
