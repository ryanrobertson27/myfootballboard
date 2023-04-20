import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Magic } from "magic-sdk";
const magic = new Magic(import.meta.env.VITE_MAGIC_PUBLISHABLE_KEY);

export const api = createApi({
  baseQuery: fetchBaseQuery({ 
    baseUrl: import.meta.env.VITE_SERVER_URL,
    prepareHeaders: async (headers, { getState }) => {
      const didToken = await magic.user.getIdToken();
      if(didToken) {
        headers.set('Authorization', `Bearer ${didToken}`)
      }
      headers.set('Content-Type', 'application/json')
      return headers
    },
  }),
  tagTypes: ['Square', 'Player', 'Board'],
  endpoints: (build) => ({
    // BOARD calls
    createNewBoard: build.mutation({
      query: (body) => ({
        url: 'boards/new-board',
        method: 'POST',
        body,
      }),
    }),
    getBoardWinnersById: build.query({
      query: (id) => ({
        url: `boards/${id}/winners`,
        method: 'GET',
      }),
      providesTags: ['Board']
    }),
    getBoardById: build.query({
      query: (id) => ({
        url: `boards/${id}`,
        method: 'GET',
      }),
      providesTags: ['Board']
    }),

    clearBoard: build.mutation({
      query: (boardId) => ({
        url: `boards/clear-board`,
        method: 'POST',
        body: { boardId },
      }),
      invalidatesTags: ['Square', 'Player']
    }),

    fillBoard: build.mutation({
      query: (boardId) => ({
        url: `boards/fill-board`,
        method: 'POST',
        body: { boardId },
      }),
      invalidatesTags: ['Square', 'Player']
    }),
    deleteBoardById: build.mutation({
      query: (boardId) => ({
        url: `boards/${boardId}`,
        method: 'DELETE',
      }),
    }),
    publishBoardById: build.mutation({
      query: (boardId) => ({
        url: `boards/${boardId}/publish-board`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Board']
    }),
    updateBoardWithGameData: build.mutation({
      query: (body) => ({
        url: `boards/update-board-with-game-data`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Board']
    }),

    randomizeGameNumbers: build.mutation({
      query: (boardId) => ({
        url: `boards/${boardId}/randomize-game-numbers`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Board']
    }),

    // Board Player Calls
    getBoardPlayersByBoardId: build.query({
      query: (boardId) => `players/${boardId}`,
      providesTags: ['Player']

    }),
    createNewBoardPlayer: build.mutation({
      query: (body) => ({
        url: 'players/new-player',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Square', 'Player']
    }),
    deleteBoardPlayerById: build.mutation({
      query: (playerId) => ({
        url: `players/${playerId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Player', 'Square']
    }),


    // Square Calls
    getSquares: build.query({
      query: () => 'squares',
    }),
    getSquaresByBoardId: build.query({
      query: (boardId) => `squares/${boardId}`,
      providesTags: ['Square']
    }),
    getSquareByUserId: build.query({
      query: (userId) => `squares/square/${userId}`
    }),
    updateSquare: build.mutation({
      query: (body) => ({
        url: `squares/update-owner`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Square'],
    }),

    // User Calls
    getUsers: build.query({
      query: () => 'users',
      provideTags: ['User'],
    }),
    getUserByEmail: build.query({
      query: (body) => ({
        url: 'users/user',
        method: "POST",
        body,
      })
    }),
    registerUser: build.mutation({
      query: (body) => ({
        url: '/users/register',
        method: 'POST',
        body,
      }),
    }),
    createUser: build.mutation({
      query: (body) => ({
        url: '/users/new-user',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    addSquaresToUser: build.mutation({
      query: (id, ...body) => ({
        url: `/users/${id}/add-squares`,
        method: 'PATCH',
        body,
      }),
    }),
    getBoardsByUserEmail: build.query({
      query: (body) => ({
        url: `/users/user/boards`,
        method: 'POST',
        body
      }),
    }),

    // Game Calls
    generateGame: build.query({
      query: (boardId) => ({
        url: `games/generate-game/${boardId}`,
        method: 'GET',
      }),
    }),
    getGameById: build.query({
      query: (gameId) => ({
        url: `games/${gameId}`,
        method: 'GET',
      })
    }),
  }),
});

export const { 
  useCreateNewBoardMutation, 
  useGetBoardByIdQuery, 
  useGetBoardPlayersByBoardIdQuery, 
  useCreateNewBoardPlayerMutation, 
  useGetSquaresQuery, 
  useUpdateSquareMutation, 
  useGetSquaresByBoardIdQuery, 
  useGetSquareByUserIdQuery,
  useAddSquaresToUserMutation,
  useCreateUserMutation,
  useGetUsersQuery,
  useGetBoardsByUserEmailQuery,
  useRegisterUserMutation,
  useGetUserByEmailQuery,
  useDeleteBoardPlayerByIdMutation,
  useLazyGenerateGameQuery,   
  useLazyGetGameByIdQuery,
  useClearBoardMutation,
  useFillBoardMutation,
  useDeleteBoardByIdMutation,
  usePublishBoardByIdMutation,
  useRandomizeGameNumbersMutation,
  useUpdateBoardWithGameDataMutation,
  useGetBoardWinnersByIdQuery,
} = api
