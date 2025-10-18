'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { useSearchCountriesQuery } from '@/store/api/masterDataApi';
import { CountrySearchParams } from '@/types';
import MasterDataTable from '@/components/master-data/MasterDataTable';
import { countriesColumns } from '@/components/master-data/columns/countriesColumns';

export default function CountriesPage() {
  const [searchParams, setSearchParams] = useState<CountrySearchParams>({
    page: 1,
    page_size: 25,
    sort_by: 'country_name',
    sort_dir: 'ASC',
  });
  const [searchTerm, setSearchTerm] = useState('');
  
  const { data: countriesData, isLoading: isLoadingCountries, error } = useSearchCountriesQuery(searchParams);

  const countries = useMemo(() => countriesData?.data || [], [countriesData]);
  const pagination = useMemo(() => countriesData?.data || { total: 0, page: 1, limit: 25, totalPages: 0 }, [countriesData]);

  // Handle search
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setSearchParams(prev => ({
      ...prev,
      country_name: value || undefined,
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
          <h1 className="text-2xl font-bold text-gray-900">Countries</h1>
          <p className="text-gray-600 mt-1">Manage countries and regions</p>
        </div>
        <Link
          href="/dashboard/countries/create"
          className="btn-primary flex items-center"
        >
          <Icon icon="mdi:plus" className="w-4 h-4 mr-2" />
          Add Country
        </Link>
      </div>


      {/* Countries List */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">All Countries</h3>
        </div>
        
        <MasterDataTable
          data={countries}
          columns={countriesColumns}
          isLoading={isLoadingCountries}
          searchTerm={searchTerm}
          onSearchChange={handleSearch}
          placeholder="Search countries..."
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
