import axios from 'axios';
import {toast} from 'react-toastify'
import * as authService from './authService';
const { apiEndPoint } = process.env

axios.defaults.baseURL = 'https://radiant-hollows-74975.herokuapp.com';
console.log(process.env)

axios.defaults.headers.common['Authorization'] = authService.getJWT();
axios.defaults.headers.common['authorization'] = authService.getJWT();


export async function getAuthHeader(){
  return axios.defaults.headers.common;
}

axios.interceptors.response.use(null, error=>{
  const expectedError = (error.response && error.response.status >= 400 && error.response.status <= 500)
  if (!expectedError){
    toast.error('An unexpected error happened')
  }
  return Promise.reject(error)
})


export default {
  get:axios.get,
  post:axios.post,
  put:axios.put,
  delete:axios.delete
}