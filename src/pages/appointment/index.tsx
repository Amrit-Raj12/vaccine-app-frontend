/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import AppointmentTable from '../../components/Table';
import useFetch from '@/hooks/useFetch';
import appointmentService from '@/services/appointmentService';
import { defaultPagination, statusData } from '@/constants/appointments';
import { Button, Input, InputGroup, InputLeftElement, InputRightAddon, InputRightElement, Menu, MenuButton, MenuItem, MenuList, Select, Text } from '@chakra-ui/react';
import { ChevronDownIcon, SearchIcon } from '@chakra-ui/icons';
import { useSelector } from 'react-redux';
import { TypedUseQuerySubscriptionResult } from '@reduxjs/toolkit/query/react';
import { IRootState } from '@/redux/store';


const Appointments = () => {
  const [pagination, setPagination] = useState(defaultPagination);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { operation } = useSelector((state: IRootState) => state.appointmentStore);



  const getAllAppointments = useCallback(() => {
    const query = `${pagination.page ? `?page=${pagination.page}` : ''}${pagination.limit ? `&limit=${pagination.limit}`
      : ''}${pagination.sort_by ? `&sort_by=${pagination.sort_by}`
        : ''}${pagination.sort_type ? `&sort_type=${pagination.sort_type}`
          : ''}${pagination.search ? `&search=${pagination.search}` : ''}${pagination.status == 'all' ? '' : `&status=${pagination.status}`}`;
    return appointmentService.getAllAppointments(query);
  }, [pagination.page, pagination.limit, pagination.sort_by, pagination.sort_type, pagination.search, pagination.status, operation]);

  const { data, error, isLoading, isError, isSuccess } =
    useFetch(getAllAppointments);

  const onChangeSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value.trim();

    // Clear any previous timeout
    if (debounceTimeoutRef.current !== null) {
      clearTimeout(debounceTimeoutRef.current);
    }

    // Set a new timeout to debounce the search
    debounceTimeoutRef.current = setTimeout(() => {
      setPagination((prev) => ({ ...prev, search: value }));
    }, 400);
  }, []);


  return (
    <div className=' bg-slate-100 mx-auto my-12 w-11/12 rounded-lg'>
      <div className='flex justify-between items-center mb-1 px-4 bg-white'>
        <Text as='b' className='p-4'>All Appointments</Text>
        <div className='flex w-2/3'>
          <InputGroup className='mr-4'>
            <Input onChange={onChangeSearch} type="text" placeholder="Search" />

            <InputRightElement
              pointerEvents="none"
            >
              <SearchIcon color="gray.300" /></InputRightElement>
          </InputGroup>

          <div className='w-2/6'>
            <Select onChange={({ target }) => setPagination(prv => ({ ...prv, status: target.value }))}>
              {statusData.map((item, id) => (
                <option value={item.toLowerCase()} key={id}>{item}</option>))}

            </Select>
          </div>
        </div>
      </div>
      <AppointmentTable data={data?.data} pagination={data?.pagination} setPagination={setPagination} links={data?.links} />
    </div>
  );
};

export default Appointments;