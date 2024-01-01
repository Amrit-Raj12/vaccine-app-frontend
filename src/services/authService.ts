/* eslint-disable import/no-anonymous-default-export */
import formDataSignUp from "@/types/register";
import requests from "./http";

class AuthService {
  register(payload: formDataSignUp){
    return requests.post("/register", payload);
  }
  login(payload: Record<string, string>) {
    return requests.post("/auth/login", payload);
  }
};

export default new AuthService();
