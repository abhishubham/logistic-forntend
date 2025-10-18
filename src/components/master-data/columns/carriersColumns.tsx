'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Icon } from '@iconify/react';
import { Carrier } from '@/types';

export const carriersColumns: ColumnDef<Carrier>[] = [
  {
    accessorKey: 'carrier_name',
    header: 'Carrier',
    cell: ({ row }) => (
      <div className="flex items-center">
        <Icon icon="mdi:truck" className="w-5 h-5 text-gray-400 mr-3" />
        <div className="text-sm font-medium text-gray-900">
          {row.getValue('carrier_name')}
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'carrier_code',
    header: 'Code',
    cell: ({ row }) => (
      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
        {row.getValue('carrier_code')}
      </span>
    ),
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => (
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
        row.getValue('type') === 'airline' 
          ? 'bg-blue-100 text-blue-800' 
          : 'bg-green-100 text-green-800'
      }`}>
        {row.getValue('type')}
      </span>
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
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <button className="text-primary-600 hover:text-primary-900">
          <Icon icon="mdi:pencil" className="w-4 h-4" />
        </button>
        <button className="text-red-600 hover:text-red-900">
          <Icon icon="mdi:delete" className="w-4 h-4" />
        </button>
      </div>
    ),
  },
];
