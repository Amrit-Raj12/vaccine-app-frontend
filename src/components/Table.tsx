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
import { notSortableItems, tableDataRange } from '@/constants/appointments';
import { ChevronLeftIcon, ChevronRightIcon, ArrowLeftIcon, ArrowRightIcon, TriangleDownIcon, TriangleUpIcon, ArrowBackIcon, ArrowForwardIcon, ViewIcon } from '@chakra-ui/icons'
import { useCallback, useEffect, useState } from 'react';
import Modal from "@/components/Modal";


const columnHelper = createColumnHelper<AppointmentsPropType>()

const columns = [
  columnHelper.accessor('_id', {
    // header: () => `Id`,
    cell: info => `#${info.getValue().substring(info.getValue().length - 8)}`,
    header: () => <span>Appointment Id</span>,

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
    cell: props => <h5 className='mr-2'>{moment(props.renderValue()).format('YYYY-MM-DD')}</h5>
  }),
]

function Table({ data, pagination, setPagination, links }: tablePropType) {
  const [sorting, setSorting] = useState<ColumnSort[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const table = useReactTable({
    data,
    columns,
    // ui sorting
    // getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting
    },

    onSortingChange: setSorting,
  },);

  const handleSortChange = useCallback(() => {
    setPagination((prv) => ({ ...prv, sort_by: sorting[0]?.id, sort_type: sorting[0]?.desc ? 'dsc' : 'asc' }));
  }, [sorting, setPagination]);

  useEffect(() => {
    if (!notSortableItems.includes(sorting[0]?.id)) {
      handleSortChange()
    }
  }, [sorting]);

  const handleSelectChange = (data: string) => {
    setPagination((prv) => ({ ...prv, limit: data }))
  };

  // console.log(header.column);

  const getPaginationDetails = () => {
    const from = (parseInt(pagination?.page) - 1) * parseInt(pagination?.limit) + 1;
    const to = (parseInt(pagination?.page) * parseInt(pagination?.limit) > parseInt(pagination?.totalItems) ? parseInt(pagination?.totalItems) : parseInt(pagination?.page) * parseInt(pagination?.limit));
    return { from, to };
  };

  return (
    <div>
      <Modal
        isOpen={modalVisible}
        onClose={() => {
          setModalVisible(false);
        }}
      >
        <h1>Hello</h1>
      </Modal>
      <table className=' w-full border-x-neutral-100 border'>
        <thead className='p-5'>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header, idx) => (
                <th key={idx} className={`${!notSortableItems.includes(header.column.id) && 'cursor-pointer'} py-2 `} onClick={header.column.getToggleSortingHandler()}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )
                  }
                  {/* {  console.log(header.column) as ReactNode} */}
                  {!notSortableItems.includes(header.column.id) &&
                    { asc: <TriangleUpIcon w={3} h={3} />, desc: <TriangleDownIcon w={3} h={3} /> }
                    [
                    header.column.getIsSorted() as string
                    ]
                  }


                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className='bg-white'>
          {!!data?.length && table?.getRowModel().rows.map(row => (
            <tr key={row.id} className=' h-10 py-3 border border-gray-200'>
              {row.getVisibleCells().map((cell, idx) => (
                <td key={idx} className='text-center'>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
              <ViewIcon className='my-4 cursor-pointer' onClick={() => { setModalVisible(true); console.log(row) }} />
            </tr>
          ))}
        </tbody>

      </table>
      <div className='flex items-center py-2'>
        <div className='ml-auto w-12/12 flex'>
          <div className='flex h-12 justify-center align-middle px-2'>

            <p className='mr-5 self-center font-medium'>Row Per page</p>
            <div className='mr-5 self-center'>
              <Select defaultValue={pagination?.limit} onChange={(event) => handleSelectChange(event.target.value)}>
                {tableDataRange.map((row, idx) => <option key={idx} value={row}>{row}</option>)}
              </Select>
            </div>
          </div>

          <div className='ml-auto flex pr-2'>
            <p className='mr-5 self-center font-medium'>{getPaginationDetails().from} - {getPaginationDetails().to} of {pagination?.totalItems}</p>
            <button
              onClick={() => setPagination((prv) => ({ ...prv, page: '1' }))}
              className='px-1'
            >
              First Page
              {/* <Icon as={ArrowLeftIcon} /> */}
            </button>
            <button
              className='px-1'
              disabled={!links?.prev}
              onClick={() => setPagination((prv) => ({ ...prv, page: (parseInt(pagination?.page) - 1).toString() }))}
            >
              <Icon as={ArrowBackIcon} />
              {/* ArrowBackIcon */}
            </button>

            <button disabled={!links?.next}
              className='px-1'
              onClick={() => setPagination((prv) => ({ ...prv, page: (parseInt(pagination?.page) + 1).toString() }))}
            >
              <Icon as={ArrowForwardIcon} />
            </button>
            <button
              className='px-1'
              disabled={!links?.next}
              onClick={() => setPagination((prv) => ({ ...prv, page: pagination?.totalPage }))}
            >
              {/* <Icon as={ArrowRightIcon} /> */}
              Last Page
            </button>

          </div>
        </div>
      </div>

    </div>
  )
}
export default Table;