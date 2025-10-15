'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateCarrierMutation, useGetCarriersQuery } from '@/store/api/masterDataApi';
import { createCarrierSchema, CreateCarrierFormData, CarrierType } from '@/lib/validations';

export default function CarriersPage() {
  const [showForm, setShowForm] = useState(false);
  const [createCarrier, { isLoading }] = useCreateCarrierMutation();
  const { data: carriersData, isLoading: isLoadingCarriers } = useGetCarriersQuery({});
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateCarrierFormData>({
    resolver: zodResolver(createCarrierSchema),
  });

  const onSubmit = async (data: CreateCarrierFormData) => {
    try {
      await createCarrier(data).unwrap();
      reset();
      setShowForm(false);
    } catch (error) {
      console.error('Error creating carrier:', error);
    }
  };

  const carriers = carriersData?.data?.data || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Carriers</h1>
          <p className="text-gray-600 mt-1">Manage transportation carriers</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowForm(!showForm)}
          className="btn-primary flex items-center"
        >
          <Icon icon="mdi:plus" className="w-4 h-4 mr-2" />
          Add Carrier
        </motion.button>
      </div>

      {/* Add Carrier Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="card"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Carrier</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Carrier Name *
                </label>
                <input
                  {...register('carrier_name')}
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
                  className="input-field"
                  placeholder="e.g., FEDEX"
                />
                {errors.carrier_code && (
                  <p className="mt-1 text-sm text-red-600">{errors.carrier_code.message}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type *
                </label>
                <select {...register('type')} className="input-field">
                  <option value="">Select type</option>
                  {Object.values(CarrierType).map((type) => (
                    <option key={type} value={type}>
                      {type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </option>
                  ))}
                </select>
                {errors.type && (
                  <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary disabled:opacity-50"
              >
                {isLoading ? 'Creating...' : 'Create Carrier'}
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Carriers List */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">All Carriers</h3>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Icon
                icon="mdi:magnify"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search carriers..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        </div>

        {isLoadingCarriers ? (
          <div className="text-center py-8">
            <Icon icon="mdi:loading" className="animate-spin w-8 h-8 text-primary-600 mx-auto" />
            <p className="text-gray-600 mt-2">Loading carriers...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Carrier
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {carriers.map((carrier) => (
                  <tr key={carrier.carrier_id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Icon icon="mdi:truck" className="w-5 h-5 text-gray-400 mr-3" />
                        <div className="text-sm font-medium text-gray-900">{carrier.carrier_name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {carrier.carrier_code}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-primary-100 text-primary-800">
                        {carrier.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        carrier.is_active 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {carrier.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-primary-600 hover:text-primary-900 mr-3">
                        <Icon icon="mdi:pencil" className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Icon icon="mdi:delete" className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
