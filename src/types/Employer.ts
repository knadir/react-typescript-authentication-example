export default interface IEmployerData {
  id?: number | null
  firstName: string
  lastName: string
  municipalityId?: number | null
  municipalityName?: string | null
}

export interface IEmployer {
  id?: number | null
  firstName: string
  lastName: string
  municipalityId?: number | null
}

export interface IEmployerType {
  id?: number | null
  firstName?: string
  lastName?: string
  municipality?: IMunicipality
}

export interface ISelectOption {
  value?: string | number | null
  name?: string
}

export type IMunicipalityId = number

export interface IMunicipality {
  id?: string | number | null
  name?: string
}

export interface IEditableEmployer {
  id?: number | null
  firstName?: string
  lastName?: string
  municipalityId?: IMunicipalityId
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

export interface IEmployerRequest {
  firstName?: string
  lastName?: string
  municipalityId?: IMunicipalityId
}
