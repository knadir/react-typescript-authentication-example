// import namor from '@ggascoigne/namor'

// export type Person = {
//   firstName: string
//   lastName: string
//   age: number
//   visits: number
//   progress: number
//   status: string
// }

export type Entities = {
  id: number
  name: string
}

export type County = {
  id: number
  name: string
  entitiesId: number
}

export type Municipality = {
  id: number
  name: string
  countyId: number
}

const range = (len: number) => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

// const newPerson = (): Person => {
//   const statusChance = Math.random()
//   return {
//     firstName: namor.generate({ words: 1, saltLength: 0 }),
//     lastName: namor.generate({ words: 1, saltLength: 0, subset: 'manly' }),
//     age: Math.floor(Math.random() * 30),
//     visits: Math.floor(Math.random() * 100),
//     progress: Math.floor(Math.random() * 100),
//     status: statusChance > 0.66 ? 'relationship' : statusChance > 0.33 ? 'complicated' : 'single',
//   }
// }

const newEntities = (): Entities => ({
  id: /*Math.floor(Math.random() * 30)*/0,
  name: /*namor.generate({ words: 1, saltLength: 0, subset: 'manly' })*/'',
})

const newCounty = (): County => ({
  id: /*Math.floor(Math.random() * 30)*/0,
  name: /*namor.generate({ words: 1, saltLength: 0, subset: 'manly' })*/'',
  entitiesId: /*Math.floor(Math.random() * 30)*/0,
})

const newMunicipality = (): Municipality => ({
  id: /*Math.floor(Math.random() * 30)*/0,
  name: /*namor.generate({ words: 1, saltLength: 0, subset: 'manly' })*/'',
  countyId: /*Math.floor(Math.random() * 30)*/0,
})


// export type DataBaseData = Person & {
//   subRows?: DataBaseData[]
// }

export type DataBaseDataEntities = Entities & {
  subRows?: DataBaseDataEntities[]
}

export type DataBaseDataCounty = County & {
  subRows?: DataBaseDataCounty[]
}

export type DataBaseDataMunicipality = Municipality & {
  subRows?: DataBaseDataMunicipality[]
}

// export function makeData(...lens: number[]): DataBaseData[] {
//   const makeDataLevel = (depth = 0): DataBaseData[] => {
//     const len = lens[depth]
//     return range(len).map(() => ({
//       ...newPerson(),
//       subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
//     }))
//   }

//   return makeDataLevel()
// }

export function makeDataEntities(...lens: number[]): DataBaseDataEntities[] {
  const makeDataLevelEntities = (depth = 0): DataBaseDataEntities[] => {
    const len = lens[depth]
    return range(len).map(() => ({
      ...newEntities(),
      subRows: lens[depth + 1] ? makeDataLevelEntities(depth + 1) : undefined,
    }))
  }

  return makeDataLevelEntities()
}

export function makeDataCounty(...lens: number[]): DataBaseDataCounty[] {
  const makeDataLevelCounty = (depth = 0): DataBaseDataCounty[] => {
    const len = lens[depth]
    return range(len).map(() => ({
      ...newCounty(),
      subRows: lens[depth + 1] ? makeDataLevelCounty(depth + 1) : undefined,
    }))
  }

  return makeDataLevelCounty()
}

export function makeDataMunicipality(...lens: number[]): DataBaseDataMunicipality[] {
  const makeDataLevelMunicipality = (depth = 0): DataBaseDataMunicipality[] => {
    const len = lens[depth]
    return range(len).map(() => ({
      ...newMunicipality(),
      subRows: lens[depth + 1] ? makeDataLevelMunicipality(depth + 1) : undefined,
    }))
  }

  return makeDataLevelMunicipality()
}
