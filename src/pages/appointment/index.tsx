import React from 'react';
import Calendar from '@/components/Callendar';
import { useCallback, useState } from 'react';
import appointmentService from '@/services/appointmentService';
import useFetch from '@/hooks/useFetch';
import Modal from '@/components/Modal';

interface Event {
  title: string;
  start: Date;
  end: Date;
}

const GetAppointments = () => {

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const getAvailableDates = useCallback(() => {
      return appointmentService.getAvailibity();
  }, []);

  const { data, error, isLoading, isError, isSuccess } = useFetch(getAvailableDates);

  console.log("Api Called",data);


  
  const events =  data?.map((date: string) => ({
    title: 'Available',
    start: new Date(date),
    end: new Date(date),
  }));

  const handleEventClick = (event: Event) => {
    if (event.title === 'Available') {
      setModalVisible(true)
      console.log('Available date clicked:', event);
    }
  };


  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="container mx-auto">
        <Calendar events={events} handleEventClick={handleEventClick} />
      </div>
    </div>
    <Modal isOpen={modalVisible} onClose={() => { setModalVisible(false) }} >
      <h1>Hello I am Modal</h1>
    </Modal>
    </div>
  );
};

export default GetAppointments;