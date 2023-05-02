import axios from "axios";
import authHeader from "./auth-header";
import ICountyData from '../types/County'

const API_URL = "http://localhost:2020/api/";

const getAll = () => {
  return axios.get<Array<ICountyData>>(API_URL + "counties/getAll", { headers: authHeader() });
};

const get = (id: any) => {
  return axios.get<ICountyData>(API_URL + `counties/${id}`, { headers: authHeader() });
};

const create = (data: ICountyData) => {
  return axios.post(API_URL + "counties", data, { headers: authHeader() });
};

const remove = (id: any) => {
  return axios.delete(API_URL +`counties/${id}`, { headers: authHeader() });
};

const update = (id: any, data: ICountyData) => {
  return axios.put(API_URL + `counties/${id}`, data, { headers: authHeader() });
};

const findByCountyName = (name: string) => {
  return axios.get<Array<ICountyData>>(API_URL + '/counties?name=${name}', { headers: authHeader() });
};

const findByEntityId = (entityId: any) => {
  return axios.get<Array<ICountyData>>(API_URL + `entities/${entityId}/counties`, { headers: authHeader() });
};

const CountyService = {
  getAll,
  get,
  create,
  update,
  remove,
  findByCountyName,
  findByEntityId,
}

export default CountyService

