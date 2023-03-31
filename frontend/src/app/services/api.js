import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/' }),
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
} = api
