export default interface ICountyData {
  id?: number | null
  name: string
}

export interface ICounty {
  id?: number | null
  name?: string
}

export interface ICountyType {
  id?: number | null
  name?: string
}

export interface ISelectOption {
  value?: string | number | null
  name?: string
}

export type ICountiesId = number

export interface ICounties {
  id?: string | number | null
  name?: string
}

export interface IEditableCounty {
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

export interface ICountyRequest {
  name?: string
}
