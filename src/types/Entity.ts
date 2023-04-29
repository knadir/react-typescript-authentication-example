export default interface IEntityData {
  id?: number | null
  name: string
}

export interface IEntity {
  id?: number | null
  name?: string
}

export interface IEntityType {
  id?: number | null
  name?: string
}

export interface ISelectOption {
  value?: string | number | null
  name?: string
}

export type IEntityId = number

export interface IEntity {
  id?: number | null
  name?: string
}

export interface IEditableEntity {
  id?: number | null
  name?: string
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

export interface IEntityRequest {
  name?: string
}
