import { api } from './api';

export const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    createUser: build.mutation({
      query: (name) => ({
        url: '/users/new-user',
        method: 'POST',
        body: { name },
      }),
    }),
    addSquaresToUser: build.mutation({
      query: (id, ...body) => ({
        url: `/users/${id}/add-squares`,
        method: 'PATCH',
        body,
      }),
    }),
  }),
});

export const { useAddSquaresToUserMutation, useCreateUserMutation } = usersApi;
