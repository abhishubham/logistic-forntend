'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const carrierSchema = z.object({
  carrier_name: z.string().min(1, 'Carrier name is required'),
  carrier_code: z.string().min(2, 'Carrier code is required'),
  type: z.enum(['airline', 'shipping_line', 'trucking', 'railway']),
});

type CarrierFormData = z.infer<typeof carrierSchema>;

export default function CreateCarrierPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CarrierFormData>({
    resolver: zodResolver(carrierSchema),
  });

  const onSubmit = async (data: CarrierFormData) => {
    try {
      setIsLoading(true);
      // TODO: Implement API call to create carrier
      console.log('Creating carrier:', data);
      router.push('/dashboard/carriers');
    } catch (error) {
      console.error('Error creating carrier:', error);
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
          Back to Carriers
        </button>
        <h1 className="text-2xl font-semibold text-gray-900">Create New Carrier</h1>
        <p className="text-gray-600 mt-1">Add a new carrier to the system</p>
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
                Carrier Name *
              </label>
              <input
                {...register('carrier_name')}
                type="text"
                className="input-field"
                placeholder="Enter carrier name"
              />
              {errors.carrier_name && (
                <p className="mt-1 text-sm text-red-600">{errors.carrier_name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Carrier Code *
              </label>
              <input
                {...register('carrier_code')}
                type="text"
                className="input-field"
                placeholder="e.g., FEDEX, UPS, DHL"
              />
              {errors.carrier_code && (
                <p className="mt-1 text-sm text-red-600">{errors.carrier_code.message}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Carrier Type *
              </label>
              <select {...register('type')} className="input-field">
                <option value="">Select carrier type</option>
                <option value="airline">Airline</option>
                <option value="shipping_line">Shipping Line</option>
                <option value="trucking">Trucking</option>
                <option value="railway">Railway</option>
              </select>
              {errors.type && (
                <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
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
                'Create Carrier'
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
