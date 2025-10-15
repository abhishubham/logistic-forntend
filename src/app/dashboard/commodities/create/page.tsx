'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const commoditySchema = z.object({
  commodity_name: z.string().min(1, 'Commodity name is required'),
  commodity_code: z.string().min(2, 'Commodity code is required'),
  category: z.string().optional(),
});

type CommodityFormData = z.infer<typeof commoditySchema>;

export default function CreateCommodityPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CommodityFormData>({
    resolver: zodResolver(commoditySchema),
  });

  const onSubmit = async (data: CommodityFormData) => {
    try {
      setIsLoading(true);
      // TODO: Implement API call to create commodity
      console.log('Creating commodity:', data);
      router.push('/dashboard/commodities');
    } catch (error) {
      console.error('Error creating commodity:', error);
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
          Back to Commodities
        </button>
        <h1 className="text-2xl font-semibold text-gray-900">Create New Commodity</h1>
        <p className="text-gray-600 mt-1">Add a new commodity to the system</p>
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
                Commodity Name *
              </label>
              <input
                {...register('commodity_name')}
                type="text"
                className="input-field"
                placeholder="Enter commodity name"
              />
              {errors.commodity_name && (
                <p className="mt-1 text-sm text-red-600">{errors.commodity_name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Commodity Code *
              </label>
              <input
                {...register('commodity_code')}
                type="text"
                className="input-field"
                placeholder="e.g., ELEC, TEXT, FOOD"
              />
              {errors.commodity_code && (
                <p className="mt-1 text-sm text-red-600">{errors.commodity_code.message}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <input
                {...register('category')}
                type="text"
                className="input-field"
                placeholder="e.g., Electronics, Textiles, Food & Beverages"
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
                'Create Commodity'
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
