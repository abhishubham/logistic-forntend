'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const countrySchema = z.object({
  country_name: z.string().min(1, 'Country name is required'),
  country_code: z.string().min(2, 'Country code is required').max(3, 'Country code must be 2-3 characters'),
  capital: z.string().optional(),
  currency: z.string().optional(),
  language: z.string().optional(),
});

type CountryFormData = z.infer<typeof countrySchema>;

export default function CreateCountryPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CountryFormData>({
    resolver: zodResolver(countrySchema),
  });

  const onSubmit = async (data: CountryFormData) => {
    try {
      setIsLoading(true);
      // TODO: Implement API call to create country
      console.log('Creating country:', data);
      router.push('/dashboard/countries');
    } catch (error) {
      console.error('Error creating country:', error);
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
          Back to Countries
        </button>
        <h1 className="text-2xl font-semibold text-gray-900">Create New Country</h1>
        <p className="text-gray-600 mt-1">Add a new country to the system</p>
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
                Country Name *
              </label>
              <input
                {...register('country_name')}
                type="text"
                className="input-field"
                placeholder="Enter country name"
              />
              {errors.country_name && (
                <p className="mt-1 text-sm text-red-600">{errors.country_name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country Code *
              </label>
              <input
                {...register('country_code')}
                type="text"
                className="input-field"
                placeholder="e.g., US, IN, GB"
                maxLength={3}
              />
              {errors.country_code && (
                <p className="mt-1 text-sm text-red-600">{errors.country_code.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Capital
              </label>
              <input
                {...register('capital')}
                type="text"
                className="input-field"
                placeholder="Enter capital city"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Currency
              </label>
              <input
                {...register('currency')}
                type="text"
                className="input-field"
                placeholder="e.g., USD, INR, EUR"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Language
              </label>
              <input
                {...register('language')}
                type="text"
                className="input-field"
                placeholder="e.g., English, Hindi, Spanish"
              />
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
                'Create Country'
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
