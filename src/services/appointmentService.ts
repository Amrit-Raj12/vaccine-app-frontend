/* eslint-disable import/no-anonymous-default-export */
import formDataSignUp from "@/types/register";
import requests from "./http";
import { formDataLogin } from "@/types/login";
import { AppointmentType } from "@/types/appointment";

class AuthService {
  getAvailibity() {
    return requests.get("/availability");
  }
  takeAppointment(payload: AppointmentType) {
    return requests.post(`/appointments`, payload);
  }
  getAllAppointments(query?: string) {
    return requests.get( query ? `/appointments${query}`: 'appointments' ); 
  };

};

export default new AuthService();