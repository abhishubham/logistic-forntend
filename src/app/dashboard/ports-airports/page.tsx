'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreatePortAirportMutation, useSearchPortsAirportsQuery, useGetCitiesQuery } from '@/store/api/masterDataApi';
import { createPortAirportSchema, CreatePortAirportFormData, PortOrAirportType } from '@/lib/validations';
import { PortAirportSearchParams } from '@/types';
import MasterDataTable from '@/components/master-data/MasterDataTable';
import { portsAirportsColumns } from '@/components/master-data/columns/portsAirportsColumns';

export default function PortsAirportsPage() {
  const [showForm, setShowForm] = useState(false);
  const [searchParams, setSearchParams] = useState<PortAirportSearchParams>({
    page: 1,
    page_size: 25,
    sort_by: 'port_name',
    sort_dir: 'ASC',
  });
  const [searchTerm, setSearchTerm] = useState('');
  
  const createPortAirport = useCreatePortAirportMutation()[0];
  const { data: portsAirportsData, isLoading: isLoadingPortsAirports } = useSearchPortsAirportsQuery(searchParams);
  const { data: citiesData } = useGetCitiesQuery({});
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreatePortAirportFormData>({
    resolver: zodResolver(createPortAirportSchema),
  });

  const onSubmit = async (data: CreatePortAirportFormData) => {
    try {
      await createPortAirport(data).unwrap();
      reset();
      setShowForm(false);
    } catch (error) {
      console.error('Error creating port/airport:', error);
    }
  };

  const portsAirports = useMemo(() => portsAirportsData?.data || [], [portsAirportsData]);
  const pagination = useMemo(() => portsAirportsData?.data || { total: 0, page: 1, limit: 25, totalPages: 0 }, [portsAirportsData]);

  // Handle search
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setSearchParams(prev => ({
      ...prev,
      port_name: value || undefined,
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
  const cities = citiesData?.data?.data || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ports/Airports</h1>
          <p className="text-gray-600 mt-1">Manage ports and airports</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowForm(!showForm)}
          className="btn-primary flex items-center"
        >
          <Icon icon="mdi:plus" className="w-4 h-4 mr-2" />
          Add Port/Airport
        </motion.button>
      </div>

      {/* Add Port/Airport Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="card"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Port/Airport</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Port/Airport Name *
                </label>
                <input
                  {...register('port_name')}
                  className="input-field"
                  placeholder="Enter port/airport name"
                />
                {errors.port_name && (
                  <p className="mt-1 text-sm text-red-600">{errors.port_name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Port/Airport Code *
                </label>
                <input
                  {...register('port_code')}
                  className="input-field"
                  placeholder="e.g., JFK"
                />
                {errors.port_code && (
                  <p className="mt-1 text-sm text-red-600">{errors.port_code.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type *
                </label>
                <select {...register('type')} className="input-field">
                  <option value="">Select type</option>
                  {Object.values(PortOrAirportType).map((type) => (
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
                  City *
                </label>
                <select {...register('city_id', { valueAsNumber: true })} className="input-field">
                  <option value="">Select city</option>
                  {cities.map((city) => (
                    <option key={city.city_id} value={city.city_id}>
                      {city.city_name} ({city.city_code})
                    </option>
                  ))}
                </select>
                {errors.city_id && (
                  <p className="mt-1 text-sm text-red-600">{errors.city_id.message}</p>
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
                disabled={isLoadingPortsAirports}
                className="btn-primary disabled:opacity-50"
              >
                {isLoadingPortsAirports ? 'Creating...' : 'Create Port/Airport'}
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Ports/Airports List */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">All Ports/Airports</h3>
        </div>
        
        <MasterDataTable
          data={portsAirports}
          columns={portsAirportsColumns}
          isLoading={isLoadingPortsAirports}
          searchTerm={searchTerm}
          onSearchChange={handleSearch}
          placeholder="Search ports/airports..."
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
