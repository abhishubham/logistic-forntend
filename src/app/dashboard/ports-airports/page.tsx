'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreatePortAirportMutation, useGetPortsAirportsQuery, useGetCitiesQuery } from '@/store/api/masterDataApi';
import { createPortAirportSchema, CreatePortAirportFormData, PortOrAirportType } from '@/lib/validations';

export default function PortsAirportsPage() {
  const [showForm, setShowForm] = useState(false);
  const [createPortAirport, { isLoading }] = useCreatePortAirportMutation();
  const { data: portsAirportsData, isLoading: isLoadingPortsAirports } = useGetPortsAirportsQuery({});
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

  const portsAirports = portsAirportsData?.data?.data || [];
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
                disabled={isLoading}
                className="btn-primary disabled:opacity-50"
              >
                {isLoading ? 'Creating...' : 'Create Port/Airport'}
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Ports/Airports List */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">All Ports/Airports</h3>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Icon
                icon="mdi:magnify"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search ports/airports..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        </div>

        {isLoadingPortsAirports ? (
          <div className="text-center py-8">
            <Icon icon="mdi:loading" className="animate-spin w-8 h-8 text-primary-600 mx-auto" />
            <p className="text-gray-600 mt-2">Loading ports/airports...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Port/Airport
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    City
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
                {portsAirports.map((portAirport) => (
                  <tr key={portAirport.port_id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Icon 
                          icon={portAirport.type === 'airport' ? 'mdi:airplane' : 'mdi:anchor'} 
                          className="w-5 h-5 text-gray-400 mr-3" 
                        />
                        <div className="text-sm font-medium text-gray-900">{portAirport.port_name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {portAirport.port_code}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        portAirport.type === 'airport' 
                          ? 'bg-purple-100 text-purple-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {portAirport.type.charAt(0).toUpperCase() + portAirport.type.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {portAirport.city?.city_name || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        portAirport.is_active 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {portAirport.is_active ? 'Active' : 'Inactive'}
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
