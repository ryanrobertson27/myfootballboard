import { useRevalidator } from 'react-router-dom';
import { api } from './api';

export const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query({
      query: () => 'users',
      provideTags: ['User'],
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
      query: (email) => ({
        url: `/users/${email}/boards`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useAddSquaresToUserMutation,
  useCreateUserMutation,
  useGetUsersQuery,
  useGetBoardsByUserEmailQuery,
  useRegisterUserMutation,
} = usersApi;
