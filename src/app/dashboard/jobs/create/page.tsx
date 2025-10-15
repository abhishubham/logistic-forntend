'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreateJobMutation } from '@/store/api/jobsApi';

const jobSchema = z.object({
  title: z.string().min(1, 'Job title is required'),
  description: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  assignedTo: z.string().min(1, 'Assigned to is required'),
  client: z.string().min(1, 'Client is required'),
  dueDate: z.string().min(1, 'Due date is required'),
  jobType: z.enum(['air_freight', 'sea_freight', 'road_freight', 'express', 'warehouse']),
  origin: z.string().min(1, 'Origin is required'),
  destination: z.string().min(1, 'Destination is required'),
  estimatedValue: z.number().optional(),
  specialInstructions: z.string().optional(),
});

type JobFormData = z.infer<typeof jobSchema>;

export default function CreateJobPage() {
  const router = useRouter();
  const [createJob, { isLoading }] = useCreateJobMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
  });

  const onSubmit = async (data: JobFormData) => {
    try {
      await createJob(data).unwrap();
      router.push('/dashboard/jobs');
    } catch (error) {
      console.error('Error creating job:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <Icon icon="mdi:arrow-left" className="mr-1" />
          Back to Jobs
        </button>
        <h1 className="text-2xl font-semibold text-gray-900">Create New Job</h1>
        <p className="text-gray-600 mt-1">Add a new logistics job to the system</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="card"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Title *
                </label>
                <input
                  {...register('title')}
                  type="text"
                  className="input-field"
                  placeholder="Enter job title"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Type *
                </label>
                <select {...register('jobType')} className="input-field">
                  <option value="">Select job type</option>
                  <option value="air_freight">Air Freight</option>
                  <option value="sea_freight">Sea Freight</option>
                  <option value="road_freight">Road Freight</option>
                  <option value="express">Express Delivery</option>
                  <option value="warehouse">Warehouse</option>
                </select>
                {errors.jobType && (
                  <p className="mt-1 text-sm text-red-600">{errors.jobType.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority *
                </label>
                <select {...register('priority')} className="input-field">
                  <option value="">Select priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
                {errors.priority && (
                  <p className="mt-1 text-sm text-red-600">{errors.priority.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Due Date *
                </label>
                <input
                  {...register('dueDate')}
                  type="date"
                  className="input-field"
                />
                {errors.dueDate && (
                  <p className="mt-1 text-sm text-red-600">{errors.dueDate.message}</p>
                )}
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                {...register('description')}
                rows={3}
                className="input-field"
                placeholder="Enter job description"
              />
            </div>
          </div>

          {/* Assignment & Client */}
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Assignment & Client</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Assigned To *
                </label>
                <select {...register('assignedTo')} className="input-field">
                  <option value="">Select user</option>
                  {/* TODO: Populate with actual users from API */}
                  <option value="john-doe">John Doe</option>
                  <option value="jane-smith">Jane Smith</option>
                  <option value="mike-johnson">Mike Johnson</option>
                </select>
                {errors.assignedTo && (
                  <p className="mt-1 text-sm text-red-600">{errors.assignedTo.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Client *
                </label>
                <input
                  {...register('client')}
                  type="text"
                  className="input-field"
                  placeholder="Enter client name"
                />
                {errors.client && (
                  <p className="mt-1 text-sm text-red-600">{errors.client.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Logistics Details */}
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Logistics Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Origin *
                </label>
                <input
                  {...register('origin')}
                  type="text"
                  className="input-field"
                  placeholder="Enter origin location"
                />
                {errors.origin && (
                  <p className="mt-1 text-sm text-red-600">{errors.origin.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Destination *
                </label>
                <input
                  {...register('destination')}
                  type="text"
                  className="input-field"
                  placeholder="Enter destination location"
                />
                {errors.destination && (
                  <p className="mt-1 text-sm text-red-600">{errors.destination.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Estimated Value
                </label>
                <input
                  {...register('estimatedValue', { valueAsNumber: true })}
                  type="number"
                  step="0.01"
                  className="input-field"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Special Instructions
              </label>
              <textarea
                {...register('specialInstructions')}
                rows={3}
                className="input-field"
                placeholder="Enter any special instructions or requirements"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6">
            <button
              type="button"
              onClick={() => router.back()}
              className="btn-secondary"
            >
              Cancel
            </button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="btn-primary disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Icon icon="mdi:loading" className="animate-spin mr-2" />
                  Creating...
                </>
              ) : (
                'Create Job'
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
