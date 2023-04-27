import axios from "axios";
import authHeader from "./auth-header";
import IEntityData from '../types/Entity'

const API_URL = "http://localhost:2020/api/";

const getAll = () => {
  return axios.get<Array<IEntityData>>(API_URL + "entities/getAll", { headers: authHeader() });
};

const get = (id: any) => {
  return axios.get<IEntityData>(API_URL + `entities/${id}`, { headers: authHeader() });
};

const create = (data: IEntityData) => {
  return axios.post(API_URL + "entities", data, { headers: authHeader() });
};

const remove = (id: any) => {
  return axios.delete(API_URL +`entities/${id}`, { headers: authHeader() });
};

const update = (id: any, data: IEntityData) => {
  return axios.put(API_URL + `entities/${id}`, data, { headers: authHeader() });
};

const findByEntityName = (name: string) => {
  return axios.get<Array<IEntityData>>(API_URL + '/entities?name=${name}', { headers: authHeader() });
};

const EntityService = {
  getAll,
  get,
  create,
  update,
  remove,
  findByEntityName,
}

export default EntityService

