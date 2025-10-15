'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const partySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  short_name: z.string().optional(),
  type: z.enum(['consignee', 'shipper', 'carrier', 'vendor']),
  billing_address: z.string().optional(),
  corporate_address: z.string().optional(),
  credit_limit: z.number().optional(),
  credit_days: z.number().optional(),
  tds_rate: z.number().optional(),
  tds_applicable: z.boolean().optional(),
  contact_person: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
});

type PartyFormData = z.infer<typeof partySchema>;

export default function CreatePartyPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PartyFormData>({
    resolver: zodResolver(partySchema),
  });

  const onSubmit = async (data: PartyFormData) => {
    try {
      setIsLoading(true);
      // TODO: Implement API call to create party
      console.log('Creating party:', data);
      router.push('/dashboard/parties');
    } catch (error) {
      console.error('Error creating party:', error);
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
          Back to Parties
        </button>
        <h1 className="text-2xl font-semibold text-gray-900">Create New Party</h1>
        <p className="text-gray-600 mt-1">Add a new party to the system</p>
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
                Party Name *
              </label>
              <input
                {...register('name')}
                type="text"
                className="input-field"
                placeholder="Enter party name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Short Name
              </label>
              <input
                {...register('short_name')}
                type="text"
                className="input-field"
                placeholder="Enter short name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Party Type *
              </label>
              <select {...register('type')} className="input-field">
                <option value="">Select type</option>
                <option value="consignee">Consignee</option>
                <option value="shipper">Shipper</option>
                <option value="carrier">Carrier</option>
                <option value="vendor">Vendor</option>
              </select>
              {errors.type && (
                <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Person
              </label>
              <input
                {...register('contact_person')}
                type="text"
                className="input-field"
                placeholder="Enter contact person name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                {...register('phone')}
                type="tel"
                className="input-field"
                placeholder="Enter phone number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                {...register('email')}
                type="email"
                className="input-field"
                placeholder="Enter email address"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Billing Address
            </label>
            <textarea
              {...register('billing_address')}
              rows={3}
              className="input-field"
              placeholder="Enter billing address"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Corporate Address
            </label>
            <textarea
              {...register('corporate_address')}
              rows={3}
              className="input-field"
              placeholder="Enter corporate address"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Credit Limit
              </label>
              <input
                {...register('credit_limit', { valueAsNumber: true })}
                type="number"
                className="input-field"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Credit Days
              </label>
              <input
                {...register('credit_days', { valueAsNumber: true })}
                type="number"
                className="input-field"
                placeholder="30"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                TDS Rate (%)
              </label>
              <input
                {...register('tds_rate', { valueAsNumber: true })}
                type="number"
                step="0.01"
                className="input-field"
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              {...register('tds_applicable')}
              type="checkbox"
              className="mr-2 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <label className="text-sm text-gray-700">TDS Applicable</label>
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
                'Create Party'
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
