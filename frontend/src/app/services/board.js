import { api } from './api';

export const boardApi = api.injectEndpoints({
  endpoints: (build) => ({
    createNewBoard: build.mutation({
      query: (body) => ({
        url: 'boards/new-board',
        method: 'POST',
        body,
      }),
    }),
    getBoardById: build.query({
      query: (id) => ({
        url: `boards/${id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useCreateNewBoardMutation, useGetBoardByIdQuery } = boardApi;
