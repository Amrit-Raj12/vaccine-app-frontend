import appointmentService from '@/services/appointmentService';
import { Button, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader } from '@chakra-ui/react';
import React, { SetStateAction } from 'react';
import { useToast } from "@chakra-ui/react";
import { setAppointmentState } from '@/redux/appointmentSlice';
import { useDispatch } from 'react-redux';
import { ChildComponentProps } from '@/types/appointment';


const DeleteConfirmation = ({ setModalVisible, currentItem }: ChildComponentProps) => {
  const toast = useToast();
  const dispatch = useDispatch();

  const handleDelete = async (item: string) => {
    try {
      await appointmentService.cancelAppoinment(item);
      dispatch(setAppointmentState(item));
      toast({
        title: `Appointment Deleted Successfully`,
        position: 'top-right',
        status: 'success',
        isClosable: true,
      });
      setModalVisible((prv) => ({ ...prv, ['delete']: false }));

    } catch (error) {
      toast({
        title: `Something went wrong`,
        position: 'top-right',
        status: 'error',
        isClosable: true,
      })
    }
  };


  return (
    <div>
      <ModalContent>
        <ModalHeader>Delete Appointment</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Are you sure to delete this appointment?
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={() => setModalVisible((prv) => ({ ...prv, ['delete']: false }))}>
            Close
          </Button>
          <Button onClick={() => handleDelete(currentItem)} colorScheme="red" >Delete</Button>
        </ModalFooter>
      </ModalContent>
    </div>
  );
};

export default DeleteConfirmation;