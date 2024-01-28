/* eslint-disable react/no-unescaped-entities */
import { Icon, Select } from '@chakra-ui/react'

import {
  ColumnSort,
  OnChangeFn,
  SortingState,
  VisibilityState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { AppointmentsPropType, tablePropType } from '@/types/appointment';
import moment from 'moment';
import { tableDataRange } from '@/constants/appointments';
import { ChevronLeftIcon, ChevronRightIcon, ArrowLeftIcon, ArrowRightIcon, TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { useState } from 'react';

const columnHelper = createColumnHelper<AppointmentsPropType>()

const columns = [
  columnHelper.accessor('_id', {
    header: () => `Id`,
    cell: info => `#${info.getValue()}`,
  }),
  columnHelper.accessor(row => row.name, {
    id: 'name',
    cell: info => <h3>{info.getValue()}</h3>,
    header: () => <span>Name</span>,
  }),
  columnHelper.accessor('status', {
    header: () => 'Status',
    cell: info => info.renderValue(),
  }),
  columnHelper.accessor('vaccine', {
    header: () => <span>Vaccine</span>,
  }),
  columnHelper.accessor('date', {
    header: 'Appointment Date',
    cell: props => <h5>{moment(props.renderValue()).format('YYYY-MM-DD')}</h5>
  }),
]

function Table({ data, pagination, setPagination, links }: tablePropType) {
  const [sorting, setSorting] = useState<ColumnSort[]>([]);
  

  const table = useReactTable({
    data,
    columns,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting: sorting,
    },
    onSortingChange: setSorting,
  },);

  const handleSelectChange = (data: string) => {
    setPagination((prv) => ({ ...prv, limit: data }))
  };

  console.log(links);

  const getPaginationDetails = () => {
    const from = (parseInt(pagination?.page) - 1) * parseInt(pagination?.limit) + 1;
    const to = (parseInt(pagination?.page) * parseInt(pagination?.limit) > parseInt(pagination?.totalItems) ? parseInt(pagination?.totalItems) : parseInt(pagination?.page) * parseInt(pagination?.limit));
    return { from, to };
  };

  return (
    <div style={{ width: '85%', border: '1px solid red', margin: '90px' }}>
      <table className=' w-full border-x-neutral-300 border'>
        <thead className='m-5'>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header, idx) => (
                <th key={idx} className=' bg-slate-400' onClick={header.column.getToggleSortingHandler()}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )
                  }
                  {
                    { asc: '🔼', desc: '🔽' }[
                    header.column.getIsSorted() as string ?? null
                    ]
                  }

               
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {!!data?.length && table?.getRowModel().rows.map(row => (
            <tr key={row.id} className=' h-10 py-3'>
              {row.getVisibleCells().map((cell, idx) => (
                <td key={idx} className='text-center'>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>

      </table>
      <div className='flex'>
        <div className='ml-auto w-8/12  border-lime-700 border flex'>
          <div className='flex h-12 justify-center align-middle px-2'>

            <p className='mr-5 self-center font-medium'>Row Per page</p>
            <div className='mr-5 self-center'>
              <Select defaultValue={pagination?.limit} onChange={(event) => handleSelectChange(event.target.value)}>
                {tableDataRange.map((row, idx) => <option key={idx} value={row}>{row}</option>)}
              </Select>
            </div>
          </div>


          <p className='mr-5 self-center font-medium'>{getPaginationDetails().from} - {getPaginationDetails().to} of {pagination?.totalItems}</p>
          <button
            onClick={() => setPagination((prv) => ({ ...prv, page: '1' }))}
          >

            <Icon as={ArrowLeftIcon} />
          </button>
          <button
            disabled={!!links?.next}
            onClick={() => setPagination((prv) => ({ ...prv, page: (parseInt(pagination?.page) - 1).toString() }))}
          >
            <Icon as={ChevronLeftIcon} />
          </button>

          <button disabled={!!links?.prev}
            onClick={() => setPagination((prv) => ({ ...prv, page: (parseInt(pagination?.page) + 1).toString() }))}
          >
            <Icon as={ChevronRightIcon} />
          </button>
          <button
            // disabled={!table.getCanNextPage()}
            onClick={() => setPagination((prv) => ({ ...prv, page: pagination?.totalPage }))}
          >
            <Icon as={ArrowRightIcon} />
          </button>

        </div>
      </div>

    </div>
  )
}
export default Table;