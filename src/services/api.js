import Axios from 'axios'

export const BASE_URL = process.env.REACT_APP_BASE_URL

const Client = Axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    Authorization: localStorage.getItem('access_token')
      ? 'JWT ' + localStorage.getItem('access_token')
      : null,
    'Content-Type': 'application/json',
    accept: 'application/json'
  }
})

Client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default Client
