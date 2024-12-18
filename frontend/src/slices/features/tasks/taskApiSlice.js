import { apiSlice } from "../../apislice/apiSlice";

const TASKS_URL = '/api/tasks';

const headers = (token) => ({
  Authorization: `Bearer ${token}`,
});

export const taskApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchTasks: builder.query({
      query: (token) => ({
        url: TASKS_URL,
        method: 'GET',
        headers: headers(token),
      }),
    }),
    createTask: builder.mutation({
      query: ({ data, token }) => ({
        url: TASKS_URL,
        method: 'POST',
        body: data,
        headers: headers(token),
      }),
    }),
    updateTask: builder.mutation({
      query: ({ data, token }) => ({
        url: `${TASKS_URL}/${data._id}`,
        method: 'PUT',
        body: data,
        headers: headers(token),
      }),
    }),
    deleteTask: builder.mutation({
      query: ({ id, token }) => ({
        url: `${TASKS_URL}/${id}`,
        method: 'DELETE',
        headers: headers(token),
      }),
    }),
  }),
});

export const {
  useFetchTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = taskApiSlice;
