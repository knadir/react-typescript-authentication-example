import axios from "axios";
import authHeader from "./auth-header";
import IEmployerData from '../types/Employer'

const API_URL = "http://localhost:2020/api/";

const getAll = () => {
  return axios.get<Array<IEmployerData>>(API_URL + "employers/getAll", { headers: authHeader() });
};

const get = (id: any) => {
  return axios.get<IEmployerData>(API_URL + `employers/${id}`, { headers: authHeader() });
};

const create = (data: IEmployerData) => {
  return axios.post(API_URL + "employers", data, { headers: authHeader() });
};

const remove = (id: any) => {
  return axios.delete(API_URL +`employers/${id}`, { headers: authHeader() });
};

const update = (id: any, data: IEmployerData) => {
  return axios.put(API_URL + `employers/${id}`, data, { headers: authHeader() });
};

const findByEmployerName = (name: string) => {
  return axios.get<Array<IEmployerData>>(API_URL + '/employers?name=${name}', { headers: authHeader() });
};

const EmployerService = {
  getAll,
  get,
  create,
  update,
  remove,
  findByEmployerName,
}

export default EmployerService

