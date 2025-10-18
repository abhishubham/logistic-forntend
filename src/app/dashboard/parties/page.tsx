'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreatePartyMutation, useSearchPartiesQuery } from '@/store/api/masterDataApi';
import { createPartySchema, CreatePartyFormData, PartyType } from '@/lib/validations';
import { PartySearchParams } from '@/types';
import MasterDataTable from '@/components/master-data/MasterDataTable';
import { partiesColumns } from '@/components/master-data/columns/partiesColumns';

export default function PartiesPage() {
  const [showForm, setShowForm] = useState(false);
  const [searchParams, setSearchParams] = useState<PartySearchParams>({
    page: 1,
    page_size: 25,
    sort_by: 'name',
    sort_dir: 'ASC',
  });
  const [searchTerm, setSearchTerm] = useState('');
  
  const createParty = useCreatePartyMutation()[0];
  const { data: partiesData, isLoading: isLoadingParties } = useSearchPartiesQuery(searchParams);
  
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

  const parties = useMemo(() => partiesData?.data || [], [partiesData]);
  const pagination = useMemo(() => partiesData?.data || { total: 0, page: 1, limit: 25, totalPages: 0 }, [partiesData]);

  // Handle search
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setSearchParams(prev => ({
      ...prev,
      name: value || undefined,
      page: 1, // Reset to first page when searching
    }));
  };

  // Handle pagination
  const handlePageChange = (page: number) => {
    setSearchParams(prev => ({ ...prev, page }));
  };

  // Handle sorting
  const handleSort = (sortBy: string) => {
    setSearchParams(prev => ({
      ...prev,
      sort_by: sortBy,
      sort_dir: prev.sort_by === sortBy && prev.sort_dir === 'ASC' ? 'DESC' : 'ASC',
    }));
  };

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
                disabled={isLoadingParties}
                className="btn-primary disabled:opacity-50"
              >
                {isLoadingParties ? 'Creating...' : 'Create Party'}
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Parties List */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">All Parties</h3>
        </div>
        
        <MasterDataTable
          data={parties}
          columns={partiesColumns}
          isLoading={isLoadingParties}
          searchTerm={searchTerm}
          onSearchChange={handleSearch}
          placeholder="Search parties..."
          total={pagination.total}
          page={pagination.page}
          pageSize={pagination.limit}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
          onSort={handleSort}
          currentSort={searchParams.sort_by}
          currentSortDir={searchParams.sort_dir}
        />
      </div>
    </div>
  );
}
