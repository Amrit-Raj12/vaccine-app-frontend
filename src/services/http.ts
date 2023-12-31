import axios, { AxiosResponse } from 'axios';

// const token: string = localStorage.getItem("token") || "";
// axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

const instance = axios.create({
   baseURL: `${process.env.REACT_APP_API_BASE}/${process.env.REACT_APP_API_VERSION}`,
});

const responseBody = (response: AxiosResponse) => response.data.data;

const requests = {
  get: async (url: string) => instance.get(url).then(responseBody),
  post: async (url: string, body: object) => instance.post(url, body).then(responseBody),
  patch: async (url: string, body: object) => instance.patch(url, body).then(responseBody),
  delete: async (url: string) => instance.delete(url).then(responseBody),
};

export default requests;
