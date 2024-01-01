import axios, { AxiosHeaderValue, AxiosResponse, HeadersDefaults } from 'axios';
import localStorage from 'redux-persist/es/storage';

const instance = axios.create(
  //  { baseURL: 'http://localhost:8000/auth/signup',}
  {baseURL: `${process.env.NEXT_PUBLIC_APP_API_ENDPOINT}/${process.env.NEXT_PUBLIC_APP_API_VERSION}`}
);
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 15000,


instance.interceptors.request.use(
	function (config) {
		// Do something before request is sent
		const accessToken = `Bearer token`;
		if (accessToken) {
			config.headers.Authorization = accessToken;
		}
		return config;
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error);
	}
);


instance.interceptors.response.use(function (response) {
    //Dispatch any action on success
    return response;
  }, function (error) {
      if(error.response.status === 401) {
        console.log("Token error");
       //Add Logic to 
             //1. Redirect to login page or 
             //2. Request refresh token
      }
    return Promise.reject(error);
  });

const responseBody = (response: AxiosResponse) => response.data.data;

const requests = {
  get: (url: string) => instance.get(url).then(responseBody),
  post: (url: string, body: object) => instance.post(url, body).then(responseBody),
  patch: (url: string, body: object) => instance.patch(url, body).then(responseBody),
  delete: (url: string) => instance.delete(url).then(responseBody),
};

export default requests;
