'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreatePartyMutation, useGetPartiesQuery } from '@/store/api/masterDataApi';
import { createPartySchema, CreatePartyFormData, PartyType } from '@/lib/validations';

export default function PartiesPage() {
  const [showForm, setShowForm] = useState(false);
  const [createParty, { isLoading }] = useCreatePartyMutation();
  const { data: partiesData, isLoading: isLoadingParties } = useGetPartiesQuery({});
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreatePartyFormData>({
    resolver: zodResolver(createPartySchema),
  });

  const onSubmit = async (data: CreatePartyFormData) => {
    try {
      await createParty(data).unwrap();
      reset();
      setShowForm(false);
    } catch (error) {
      console.error('Error creating party:', error);
    }
  };

  const parties = partiesData?.data?.data || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Parties</h1>
          <p className="text-gray-600 mt-1">Manage parties and contacts</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowForm(!showForm)}
          className="btn-primary flex items-center"
        >
          <Icon icon="mdi:plus" className="w-4 h-4 mr-2" />
          Add Party
        </motion.button>
      </div>

      {/* Add Party Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="card"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Party</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Party Name *
                </label>
                <input
                  {...register('name')}
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
                  className="input-field"
                  placeholder="Enter short name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type *
                </label>
                <select {...register('type')} className="input-field">
                  <option value="">Select type</option>
                  {Object.values(PartyType).map((type) => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
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
                  className="input-field"
                  placeholder="Enter contact person"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  {...register('phone')}
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Billing Address
                </label>
                <textarea
                  {...register('billing_address')}
                  className="input-field"
                  rows={3}
                  placeholder="Enter billing address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Corporate Address
                </label>
                <textarea
                  {...register('corporate_address')}
                  className="input-field"
                  rows={3}
                  placeholder="Enter corporate address"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Credit Limit
                </label>
                <input
                  {...register('credit_limit', { valueAsNumber: true })}
                  type="number"
                  step="0.01"
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
                  placeholder="0"
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
                  min="0"
                  max="100"
                  className="input-field"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                {...register('tds_applicable')}
                type="checkbox"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                TDS Applicable
              </label>
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
                {isLoading ? 'Creating...' : 'Create Party'}
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Parties List */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">All Parties</h3>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Icon
                icon="mdi:magnify"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search parties..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        </div>

        {isLoadingParties ? (
          <div className="text-center py-8">
            <Icon icon="mdi:loading" className="animate-spin w-8 h-8 text-primary-600 mx-auto" />
            <p className="text-gray-600 mt-2">Loading parties...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Credit Limit
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
                {parties.map((party) => (
                  <tr key={party.party_id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{party.name}</div>
                        {party.short_name && (
                          <div className="text-sm text-gray-500">{party.short_name}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-primary-100 text-primary-800">
                        {party.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{party.contact_person || '-'}</div>
                      <div className="text-sm text-gray-500">{party.email || party.phone || '-'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${parseFloat(party.credit_limit).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        party.is_active 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {party.is_active ? 'Active' : 'Inactive'}
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
