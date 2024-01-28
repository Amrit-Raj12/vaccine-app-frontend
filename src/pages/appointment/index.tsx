import React, { useCallback, useEffect, useState } from 'react';
import AppointmentTable from '../../components/Table';
import useFetch from '@/hooks/useFetch';
import appointmentService from '@/services/appointmentService';
import { defaultPagination } from '@/constants/appointments';


const Appointments = () => {

  const [pagination, setPagination] = useState(defaultPagination);
  // const [query, setQuery] = useState('');

  const getAllAppointments = useCallback(() => {
    const query = `${pagination.page ? `?page=${pagination.page}` : ''}${pagination.limit ? `&limit=${pagination.limit}` : ''}`;
    return appointmentService.getAllAppointments(query);
  }, [pagination]);

  const { data, error, isLoading, isError, isSuccess } =
    useFetch(getAllAppointments);

  // useEffect(() => {
  //   if (data?.pagination) {
  //     // console.log(data?.pagination);
  //     const apiData = { totalItems: data?.pagination.totalitems, currentPage: data?.pagination.page, dataPerPage: data?.pagination.limit }
  //     setPagination((prv) => ({ ...prv, apiData }));
  //   }
  // }, [data]);

  return (
    <div>
      <AppointmentTable data={data?.data} pagination={data?.pagination} setPagination={setPagination} links={data?.links} />
    </div>
  );
};

export default Appointments;