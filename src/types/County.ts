import { IEntity } from "./Entity"

export default interface ICountyData {
  id?: number | null
  name: string
  entityId?: number | null
  entityName?: string | null
}

export interface ICounty {
  id?: number | null
  name?: string
  entityId?: number | null
}

export interface ICountyType {
  id?: number | null
  name?: string
  entity?: IEntity
}

export interface ISelectOption {
  value?: string | number | null
  name?: string
}

export type IEntityId = number

export interface IEntitiy {
  id?: string | number | null
  name?: string
}

export interface IEditableCounty {
  id?: number | null
  name?: string
  entityId?: IEntityId
  isNew: boolean
}

export interface IFieldError {
  field: string
  message: string
}

interface IFieldErrors {
  [index: string]: IFieldError
}

export interface IError {
  fieldErrors: IFieldErrors
}

export interface ICountyRequest {
  name?: string
  entityId?: IEntityId
}
