import { api } from './api';

export const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query({
      query: () => 'users',
      provideTags: ['User'],
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
  }),
});

export const {
  useAddSquaresToUserMutation,
  useCreateUserMutation,
  useGetUsersQuery,
} = usersApi;
