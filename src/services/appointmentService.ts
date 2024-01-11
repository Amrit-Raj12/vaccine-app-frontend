/* eslint-disable import/no-anonymous-default-export */
import formDataSignUp from "@/types/register";
import requests from "./http";
import { formDataLogin } from "@/types/login";

class AuthService {
  getAvailibity() {
    return requests.get("/availability");
  }
  // verify(payload: string, signal: Record<string, unknown> = {}) {
  //   return requests.get(`/auth/verify/${payload}`);
  // }
  // login(payload: formDataLogin) {
  //   return requests.post("/auth/login", payload);
  // }
};

export default new AuthService();