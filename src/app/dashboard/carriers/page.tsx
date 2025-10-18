'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateCarrierMutation, useSearchCarriersQuery } from '@/store/api/masterDataApi';
import { createCarrierSchema, CreateCarrierFormData, CarrierType } from '@/lib/validations';
import { CarrierSearchParams } from '@/types';
import MasterDataTable from '@/components/master-data/MasterDataTable';
import { carriersColumns } from '@/components/master-data/columns/carriersColumns';

export default function CarriersPage() {
  const [showForm, setShowForm] = useState(false);
  const [searchParams, setSearchParams] = useState<CarrierSearchParams>({
    page: 1,
    page_size: 25,
    sort_by: 'carrier_name',
    sort_dir: 'ASC',
  });
  const [searchTerm, setSearchTerm] = useState('');
  
  const createCarrier = useCreateCarrierMutation()[0];
  const { data: carriersData, isLoading: isLoadingCarriers } = useSearchCarriersQuery(searchParams);
  
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

  const carriers = useMemo(() => carriersData?.data || [], [carriersData]);
  const pagination = useMemo(() => carriersData?.data || { total: 0, page: 1, limit: 25, totalPages: 0 }, [carriersData]);

  // Handle search
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setSearchParams(prev => ({
      ...prev,
      carrier_name: value || undefined,
      page: 1,
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
                disabled={isLoadingCarriers}
                className="btn-primary disabled:opacity-50"
              >
                {isLoadingCarriers ? 'Creating...' : 'Create Carrier'}
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Carriers List */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">All Carriers</h3>
        </div>
        
        <MasterDataTable
          data={carriers}
          columns={carriersColumns}
          isLoading={isLoadingCarriers}
          searchTerm={searchTerm}
          onSearchChange={handleSearch}
          placeholder="Search carriers..."
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
