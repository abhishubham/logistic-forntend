import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiResponse, PaginationParams, PaginatedResponse } from '@/types';

export interface Job {
  id: string;
  jobNumber: string;
  title: string;
  description?: string;
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignedTo: string;
  client: string;
  jobType: 'air_freight' | 'sea_freight' | 'road_freight' | 'express' | 'warehouse';
  origin: string;
  destination: string;
  estimatedValue?: number;
  specialInstructions?: string;
  createdAt: string;
  dueDate: string;
  updatedAt: string;
}

export interface CreateJobRequest {
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignedTo: string;
  client: string;
  dueDate: string;
  jobType: 'air_freight' | 'sea_freight' | 'road_freight' | 'express' | 'warehouse';
  origin: string;
  destination: string;
  estimatedValue?: number;
  specialInstructions?: string;
}

export interface UpdateJobRequest {
  title?: string;
  description?: string;
  status?: 'open' | 'in_progress' | 'completed' | 'cancelled';
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  assignedTo?: string;
  client?: string;
  dueDate?: string;
  jobType?: 'air_freight' | 'sea_freight' | 'road_freight' | 'express' | 'warehouse';
  origin?: string;
  destination?: string;
  estimatedValue?: number;
  specialInstructions?: string;
}

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL as string,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as any).auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const jobsApi = createApi({
  reducerPath: 'jobsApi',
  baseQuery,
  tagTypes: ['Job'],
  endpoints: (builder) => ({
    getJobs: builder.query<ApiResponse<PaginatedResponse<Job>>, PaginationParams>({
      query: (params) => ({
        url: '/jobs',
        params,
      }),
      providesTags: ['Job'],
    }),
    getJobById: builder.query<ApiResponse<Job>, string>({
      query: (id) => `/jobs/${id}`,
      providesTags: ['Job'],
    }),
    createJob: builder.mutation<ApiResponse<Job>, CreateJobRequest>({
      query: (jobData) => ({
        url: '/jobs',
        method: 'POST',
        body: jobData,
      }),
      invalidatesTags: ['Job'],
    }),
    updateJob: builder.mutation<ApiResponse<Job>, { id: string; data: UpdateJobRequest }>({
      query: ({ id, data }) => ({
        url: `/jobs/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Job'],
    }),
    deleteJob: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `/jobs/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Job'],
    }),
    updateJobStatus: builder.mutation<ApiResponse<Job>, { id: string; status: Job['status'] }>({
      query: ({ id, status }) => ({
        url: `/jobs/${id}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['Job'],
    }),
  }),
});

export const {
  useGetJobsQuery,
  useGetJobByIdQuery,
  useCreateJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,
  useUpdateJobStatusMutation,
} = jobsApi;
