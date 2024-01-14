import React from "react";
import Calendar from "@/components/Callendar";
import { useCallback, useState } from "react";
import appointmentService from "@/services/appointmentService";
import useFetch from "@/hooks/useFetch";
import Modal from "@/components/Modal";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";

interface Event {
  title: string;
  start: Date;
  end: Date;
}

const GetAppointments = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string>();

  const getAvailableDates = useCallback(() => {
    return appointmentService.getAvailibity();
  }, []);

  const { data, error, isLoading, isError, isSuccess } =
    useFetch(getAvailableDates);

  console.log("Api Called", data);

  const events = data?.map((date: string) => ({
    title: "Available",
    start: new Date(date),
    end: new Date(date),
  }));

  const handleEventClick = (event: Event) => {
    if (event.title === "Available") {
      setModalVisible(true);
      const dateObject = new Date(event.end);

    // Format the date to a string that the input can understand
    const formattedDate = dateObject.toISOString().split('T')[0];

    // Set the formatted date as the initial value
    setSelectedDate(formattedDate);
      console.log("Available date clicked:", event);
    }
  };

  const vaccines = ["Pneumonia", "Covid", "Viral"];

  const AppointmentForm = () => (
    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
      <h1 className="text-xl font-bold leading-tight tracking-tight text-green-900 md:text-2xl">
        Book Your Slot
      </h1>
      <form className="space-y-4 md:space-y-6">
        <FormControl isRequired>
          <FormLabel className="block mb-2 text-sm font-medium text-green-900">
            Vaccine
          </FormLabel>
          <Select placeholder="Select option" onChange={(e) => console.log(e.target.value)}>
            {vaccines.map((item, index) => (
              <option value={item} key={index}>
                {item}
              </option>
            ))}
          </Select>
          <FormErrorMessage>Error</FormErrorMessage>
        </FormControl>

        <FormControl isRequired>
          <FormLabel className="block mb-2 text-sm font-medium text-green-900">
            Select Date
          </FormLabel>
          <Input value={selectedDate} onChange={(e) => console.log(e.target.value)} size="md" type="date" />
          <FormErrorMessage>Error</FormErrorMessage>
        </FormControl>

        <Button
          className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          mt={4}
          colorScheme="teal"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </div>
  );

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="container mx-auto">
          <Calendar events={events} handleEventClick={handleEventClick} />
        </div>
      </div>
      <Modal
        isOpen={modalVisible}
        onClose={() => {
          setModalVisible(false);
        }}
      >
        {AppointmentForm()}
      </Modal>
    </div>
  );
};

export default GetAppointments;
