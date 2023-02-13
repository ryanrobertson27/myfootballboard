import { api } from './api';

export const boardApi = api.injectEndpoints({
  endpoints: (build) => ({
    createNewBoard: build.mutation({
      query: (body) => ({
        user: 'boards/new-board',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useCreateNewBoardMutation } = boardApi;
