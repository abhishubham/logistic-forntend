'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreateJobMutation } from '@/store/api/jobsApi';
import { 
  useGetPartiesQuery, 
  useGetCarriersQuery, 
  useGetPortsAirportsQuery 
} from '@/store/api/masterDataApi';

const jobSchema = z.object({
  job_number: z.string().min(1, 'Job number is required'),
  job_type: z.enum(['export', 'import']),
  shipper_id: z.number().min(1, 'Shipper is required'),
  consignee_id: z.number().min(1, 'Consignee is required'),
  notify_party_id: z.number().optional(),
  carrier_id: z.number().min(1, 'Carrier is required'),
  origin_port_id: z.number().min(1, 'Origin port is required'),
  destination_port_id: z.number().min(1, 'Destination port is required'),
  loading_port_id: z.number().optional(),
  discharge_port_id: z.number().optional(),
  sales_person_id: z.string().optional(),
  job_date: z.string().min(1, 'Job date is required'),
  status: z.enum(['open', 'invoiced', 'closed']).optional(),
  gross_weight: z.number().optional(),
  chargeable_weight: z.number().optional(),
  package_count: z.number().optional(),
  eta: z.string().optional(),
  etd: z.string().optional(),
});

type JobFormData = z.infer<typeof jobSchema>;

export default function CreateJobPage() {
  const router = useRouter();
  const [createJob, { isLoading }] = useCreateJobMutation();

  // Fetch master data for dropdowns
  const { data: partiesResponse } = useGetPartiesQuery({ page: 1, limit: 100 });
  const { data: carriersResponse } = useGetCarriersQuery({ page: 1, limit: 100 });
  const { data: portsResponse } = useGetPortsAirportsQuery({ page: 1, limit: 100 });

  const parties = partiesResponse?.data?.data || [];
  const carriers = carriersResponse?.data?.data || [];
  const ports = portsResponse?.data?.data || [];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      status: 'open',
    },
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
                  Job Number *
                </label>
                <input
                  {...register('job_number')}
                  type="text"
                  className="input-field"
                  placeholder="Enter job number"
                />
                {errors.job_number && (
                  <p className="mt-1 text-sm text-red-600">{errors.job_number.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Type *
                </label>
                <select {...register('job_type')} className="input-field">
                  <option value="">Select job type</option>
                  <option value="export">Export</option>
                  <option value="import">Import</option>
                </select>
                {errors.job_type && (
                  <p className="mt-1 text-sm text-red-600">{errors.job_type.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Date *
                </label>
                <input
                  {...register('job_date')}
                  type="date"
                  className="input-field"
                />
                {errors.job_date && (
                  <p className="mt-1 text-sm text-red-600">{errors.job_date.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select {...register('status')} className="input-field">
                  <option value="open">Open</option>
                  <option value="invoiced">Invoiced</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>
          </div>

          {/* Parties */}
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Parties</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Shipper *
                </label>
                <select {...register('shipper_id', { valueAsNumber: true })} className="input-field">
                  <option value="">Select shipper</option>
                  {parties.map((party) => (
                    <option key={party.party_id} value={party.party_id}>
                      {party.name}
                    </option>
                  ))}
                </select>
                {errors.shipper_id && (
                  <p className="mt-1 text-sm text-red-600">{errors.shipper_id.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Consignee *
                </label>
                <select {...register('consignee_id', { valueAsNumber: true })} className="input-field">
                  <option value="">Select consignee</option>
                  {parties.map((party) => (
                    <option key={party.party_id} value={party.party_id}>
                      {party.name}
                    </option>
                  ))}
                </select>
                {errors.consignee_id && (
                  <p className="mt-1 text-sm text-red-600">{errors.consignee_id.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notify Party
                </label>
                <select {...register('notify_party_id', { valueAsNumber: true })} className="input-field">
                  <option value="">Select notify party (optional)</option>
                  {parties.map((party) => (
                    <option key={party.party_id} value={party.party_id}>
                      {party.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sales Person
                </label>
                <input
                  {...register('sales_person_id')}
                  type="text"
                  className="input-field"
                  placeholder="Enter sales person ID (optional)"
                />
              </div>
            </div>
          </div>

          {/* Logistics Details */}
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Logistics Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Carrier *
                </label>
                <select {...register('carrier_id', { valueAsNumber: true })} className="input-field">
                  <option value="">Select carrier</option>
                  {carriers.map((carrier) => (
                    <option key={carrier.carrier_id} value={carrier.carrier_id}>
                      {carrier.carrier_name}
                    </option>
                  ))}
                </select>
                {errors.carrier_id && (
                  <p className="mt-1 text-sm text-red-600">{errors.carrier_id.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Origin Port *
                </label>
                <select {...register('origin_port_id', { valueAsNumber: true })} className="input-field">
                  <option value="">Select origin port</option>
                  {ports.map((port) => (
                    <option key={port.port_id} value={port.port_id}>
                      {port.port_name} ({port.port_code})
                    </option>
                  ))}
                </select>
                {errors.origin_port_id && (
                  <p className="mt-1 text-sm text-red-600">{errors.origin_port_id.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Destination Port *
                </label>
                <select {...register('destination_port_id', { valueAsNumber: true })} className="input-field">
                  <option value="">Select destination port</option>
                  {ports.map((port) => (
                    <option key={port.port_id} value={port.port_id}>
                      {port.port_name} ({port.port_code})
                    </option>
                  ))}
                </select>
                {errors.destination_port_id && (
                  <p className="mt-1 text-sm text-red-600">{errors.destination_port_id.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Loading Port
                </label>
                <select {...register('loading_port_id', { valueAsNumber: true })} className="input-field">
                  <option value="">Select loading port (optional)</option>
                  {ports.map((port) => (
                    <option key={port.port_id} value={port.port_id}>
                      {port.port_name} ({port.port_code})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Discharge Port
                </label>
                <select {...register('discharge_port_id', { valueAsNumber: true })} className="input-field">
                  <option value="">Select discharge port (optional)</option>
                  {ports.map((port) => (
                    <option key={port.port_id} value={port.port_id}>
                      {port.port_name} ({port.port_code})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Weight & Package Information */}
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Weight & Package Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gross Weight (kg)
                </label>
                <input
                  {...register('gross_weight', { valueAsNumber: true })}
                  type="number"
                  step="0.01"
                  className="input-field"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Chargeable Weight (kg)
                </label>
                <input
                  {...register('chargeable_weight', { valueAsNumber: true })}
                  type="number"
                  step="0.01"
                  className="input-field"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Package Count
                </label>
                <input
                  {...register('package_count', { valueAsNumber: true })}
                  type="number"
                  className="input-field"
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Important Dates</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ETD (Estimated Time of Departure)
                </label>
                <input
                  {...register('etd')}
                  type="datetime-local"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ETA (Estimated Time of Arrival)
                </label>
                <input
                  {...register('eta')}
                  type="datetime-local"
                  className="input-field"
                />
              </div>
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
