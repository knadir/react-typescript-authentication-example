import axios from "axios";
import authHeader from "./auth-header";
import IMunicipalityData from '../types/Municipality'

const API_URL = "http://localhost:2020/api/";

const getAll = () => {
  return axios.get<Array<IMunicipalityData>>(API_URL + "municipalities/getAll", { headers: authHeader() });
};

const get = (id: any) => {
  return axios.get<IMunicipalityData>(API_URL + `municipalities/${id}`, { headers: authHeader() });
};

const create = (data: IMunicipalityData) => {
  return axios.post(API_URL + "municipalities", data, { headers: authHeader() });
};

const remove = (id: any) => {
  return axios.delete(API_URL +`municipalities/${id}`, { headers: authHeader() });
};

const update = (id: any, data: IMunicipalityData) => {
  return axios.put(API_URL + `municipalities/${id}`, data, { headers: authHeader() });
};

const findByMunicipalityName = (name: string) => {
  return axios.get<Array<IMunicipalityData>>(API_URL + '/municipalities?name=${name}', { headers: authHeader() });
};

const MunicipalityService = {
  getAll,
  get,
  create,
  update,
  remove,
  findByMunicipalityName,
}

export default MunicipalityService

