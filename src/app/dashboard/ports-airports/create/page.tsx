'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const portAirportSchema = z.object({
  port_name: z.string().min(1, 'Port/Airport name is required'),
  port_code: z.string().min(2, 'Port/Airport code is required'),
  type: z.enum(['port', 'airport']),
  city_id: z.number().min(1, 'City is required'),
});

type PortAirportFormData = z.infer<typeof portAirportSchema>;

export default function CreatePortAirportPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PortAirportFormData>({
    resolver: zodResolver(portAirportSchema),
  });

  const onSubmit = async (data: PortAirportFormData) => {
    try {
      setIsLoading(true);
      // TODO: Implement API call to create port/airport
      console.log('Creating port/airport:', data);
      router.push('/dashboard/ports-airports');
    } catch (error) {
      console.error('Error creating port/airport:', error);
    } finally {
      setIsLoading(false);
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
          Back to Ports/Airports
        </button>
        <h1 className="text-2xl font-semibold text-gray-900">Create New Port/Airport</h1>
        <p className="text-gray-600 mt-1">Add a new port or airport to the system</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="card"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Port/Airport Name *
              </label>
              <input
                {...register('port_name')}
                type="text"
                className="input-field"
                placeholder="Enter port or airport name"
              />
              {errors.port_name && (
                <p className="mt-1 text-sm text-red-600">{errors.port_name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Port/Airport Code *
              </label>
              <input
                {...register('port_code')}
                type="text"
                className="input-field"
                placeholder="e.g., JFK, LAX, SIN"
              />
              {errors.port_code && (
                <p className="mt-1 text-sm text-red-600">{errors.port_code.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type *
              </label>
              <select {...register('type')} className="input-field">
                <option value="">Select type</option>
                <option value="port">Port</option>
                <option value="airport">Airport</option>
              </select>
              {errors.type && (
                <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City *
              </label>
              <select {...register('city_id', { valueAsNumber: true })} className="input-field">
                <option value="">Select city</option>
                {/* TODO: Populate with actual cities from API */}
                <option value={1}>New York</option>
                <option value={2}>Los Angeles</option>
                <option value={3}>London</option>
                <option value={4}>Mumbai</option>
                <option value={5}>Singapore</option>
              </select>
              {errors.city_id && (
                <p className="mt-1 text-sm text-red-600">{errors.city_id.message}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t">
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
                'Create Port/Airport'
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
