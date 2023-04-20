import axios from 'axios'

export default axios.create({
  // baseURL: 'http://localhost:8080/api',
  // baseURL: 'http://localhost:9966/petclinic/api',
  baseURL: 'http://localhost:2020',
  headers: {
    'Content-type': 'application/json',
  },
})
