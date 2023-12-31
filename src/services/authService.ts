/* eslint-disable import/no-anonymous-default-export */
import requests from "./http";

class AuthService {
  register(payload: Record<string, unknown>){
    return requests.post("/register", payload);
  }
  login(payload: Record<string, string>) {
    return requests.post("/auth/login", payload);
  }
};

export default new AuthService();
