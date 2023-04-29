export default interface IMunicipalityData {
  id?: number | null
  name: string
  countyId?: number | null
  countyName?: string | null
}

export interface IMunicipality {
  id?: number | null
  name: string
  countyId?: number | null
}

export interface IMunicipalityType {
  id?: number | null
  name?: string
  county?: ICounty
}

export interface ISelectOption {
  value?: string | number | null
  name?: string
}

export type ICountyId = number

export interface ICounty {
  id?: string | number | null
  name?: string
}

export interface IEditableMunicipality {
  id?: number | null
  name?: string
  countyId?: ICountyId
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

export interface IMunicipalityRequest {
  name?: string
  countyId?: ICountyId
}
