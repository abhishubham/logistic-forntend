'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateCityMutation, useGetCitiesQuery, useSearchCitiesQuery } from '@/store/api/masterDataApi';
import { createCitySchema, CreateCityFormData } from '@/lib/validations';
import { CitySearchParams } from '@/types';
import MasterDataTable from '@/components/master-data/MasterDataTable';
import { citiesColumns } from '@/components/master-data/columns/citiesColumns';

export default function CitiesPage() {
  const [showForm, setShowForm] = useState(false);
  const [searchParams, setSearchParams] = useState<CitySearchParams>({
    page: 1,
    page_size: 25,
    sort_by: 'city_name',
    sort_dir: 'ASC',
  });
  const [searchTerm, setSearchTerm] = useState('');
  
  const createCity = useCreateCityMutation()[0];
  const { data: citiesData, isLoading: isLoadingCities } = useSearchCitiesQuery(searchParams);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateCityFormData>({
    resolver: zodResolver(createCitySchema),
  });

  const onSubmit = async (data: CreateCityFormData) => {
    try {
      await createCity(data).unwrap();
      reset();
      setShowForm(false);
    } catch (error) {
      console.error('Error creating city:', error);
    }
  };


  const cities = useMemo(() => citiesData?.data || [], [citiesData]);
  const pagination = useMemo(() => citiesData?.data || { total: 0, page: 1, limit: 25, totalPages: 0 }, [citiesData]);

  // Handle search
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setSearchParams(prev => ({
      ...prev,
      city_name: value || undefined,
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
          <h1 className="text-2xl font-bold text-gray-900">Cities</h1>
          <p className="text-gray-600 mt-1">Manage cities and locations</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowForm(!showForm)}
          className="btn-primary flex items-center"
        >
          <Icon icon="mdi:plus" className="w-4 h-4 mr-2" />
          Add City
        </motion.button>
      </div>

      {/* Add City Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="card"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New City</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City Name *
                </label>
                <input
                  {...register('city_name')}
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
                  className="input-field"
                  placeholder="e.g., NYC"
                />
                {errors.city_code && (
                  <p className="mt-1 text-sm text-red-600">{errors.city_code.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country ID *
                </label>
                <input
                  {...register('country_id', { valueAsNumber: true })}
                  type="number"
                  className="input-field"
                  placeholder="Enter country ID"
                />
                {errors.country_id && (
                  <p className="mt-1 text-sm text-red-600">{errors.country_id.message}</p>
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
                disabled={isLoadingCities}
                className="btn-primary disabled:opacity-50"
              >
                {isLoadingCities ? 'Creating...' : 'Create City'}
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Cities List */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">All Cities</h3>
        </div>
        
        <MasterDataTable
          data={cities}
          columns={citiesColumns}
          isLoading={isLoadingCities}
          searchTerm={searchTerm}
          onSearchChange={handleSearch}
          placeholder="Search cities..."
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
