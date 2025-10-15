'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const citySchema = z.object({
  city_name: z.string().min(1, 'City name is required'),
  city_code: z.string().min(2, 'City code is required'),
  country_id: z.number().min(1, 'Country is required'),
});

type CityFormData = z.infer<typeof citySchema>;

export default function CreateCityPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CityFormData>({
    resolver: zodResolver(citySchema),
  });

  const onSubmit = async (data: CityFormData) => {
    try {
      setIsLoading(true);
      // TODO: Implement API call to create city
      console.log('Creating city:', data);
      router.push('/dashboard/cities');
    } catch (error) {
      console.error('Error creating city:', error);
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
          Back to Cities
        </button>
        <h1 className="text-2xl font-semibold text-gray-900">Create New City</h1>
        <p className="text-gray-600 mt-1">Add a new city to the system</p>
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
                City Name *
              </label>
              <input
                {...register('city_name')}
                type="text"
                className="input-field"
                placeholder="Enter city name"
              />
              {errors.city_name && (
                <p className="mt-1 text-sm text-red-600">{errors.city_name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City Code *
              </label>
              <input
                {...register('city_code')}
                type="text"
                className="input-field"
                placeholder="e.g., NYC, LON, MUM"
              />
              {errors.city_code && (
                <p className="mt-1 text-sm text-red-600">{errors.city_code.message}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country *
              </label>
              <select {...register('country_id', { valueAsNumber: true })} className="input-field">
                <option value="">Select country</option>
                {/* TODO: Populate with actual countries from API */}
                <option value={1}>United States</option>
                <option value={2}>India</option>
                <option value={3}>United Kingdom</option>
                <option value={4}>Germany</option>
                <option value={5}>China</option>
              </select>
              {errors.country_id && (
                <p className="mt-1 text-sm text-red-600">{errors.country_id.message}</p>
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
                'Create City'
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
