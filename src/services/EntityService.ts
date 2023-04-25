import http from '../http-common'
import IEntityData from '../types/Entity'

const getAll = () => http.get<Array<IEntityData>>('/entities')

const get = (id: any) => http.get<IEntityData>(`/entity/get/${id}`)

const create = (data: IEntityData) => http.post<IEntityData>('/entities', data)

const update = (id: any, data: IEntityData) => http.post<any>(`/entity/edit/${id}`, data)

const remove = (id: any) => http.delete<any>(`/entity/delete/${id}`)

const removeAll = () => http.delete<any>(`/entities`)

const findByEntityName = (name: string) => http.get<Array<IEntityData>>(`/entities?name=${name}`)

const EntityService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByEntityName,
}

export default EntityService
