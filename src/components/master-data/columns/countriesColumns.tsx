'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { Country } from '@/types';

export const countriesColumns: ColumnDef<Country>[] = [
  {
    accessorKey: 'country_name',
    header: 'Country',
    cell: ({ row }) => (
      <div className="flex items-center">
        <Icon icon="mdi:flag" className="w-5 h-5 text-gray-400 mr-3" />
        <div className="text-sm font-medium text-gray-900">
          {row.getValue('country_name')}
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'country_code',
    header: 'Code',
    cell: ({ row }) => (
      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
        {row.getValue('country_code')}
      </span>
    ),
  },
  {
    accessorKey: 'capital',
    header: 'Capital',
    cell: ({ row }) => (
      <div className="text-sm text-gray-900">
        {row.getValue('capital') || '-'}
      </div>
    ),
  },
  {
    accessorKey: 'currency',
    header: 'Currency',
    cell: ({ row }) => (
      <div className="text-sm text-gray-900">
        {row.getValue('currency') || '-'}
      </div>
    ),
  },
  {
    accessorKey: 'language',
    header: 'Language',
    cell: ({ row }) => (
      <div className="text-sm text-gray-900">
        {row.getValue('language') || '-'}
      </div>
    ),
  },
  {
    accessorKey: 'is_active',
    header: 'Status',
    cell: ({ row }) => {
      const isActive = row.getValue('is_active') as boolean;
      return (
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          isActive 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {isActive ? 'Active' : 'Inactive'}
        </span>
      );
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const country = row.original;
      return (
        <div className="flex items-center space-x-2">
          <Link 
            href={`/dashboard/countries/edit/${country.country_id}`}
            className="text-primary-600 hover:text-primary-900"
          >
            <Icon icon="mdi:pencil" className="w-4 h-4" />
          </Link>
          <button className="text-red-600 hover:text-red-900">
            <Icon icon="mdi:delete" className="w-4 h-4" />
          </button>
        </div>
      );
    },
  },
];
