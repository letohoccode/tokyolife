import axios, { AxiosError, AxiosInstance } from 'axios'
import { ClearAll, GetAccessToken, SaveAccessToken, SaveProfileUser } from './LocalStore'
import { Auth } from '../utils/Auth'

class http {
  instance: AxiosInstance
  accessToken: string
  constructor() {
    this.instance = axios.create({
      baseURL: 'http://localhost:8080/api/',
      timeout: 1000,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
    this.accessToken = GetAccessToken() as string
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.Authorization = `Bearer ${this.accessToken}`
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url == 'auth/login' || url == 'auth/register') {
          const data = response.data as Auth
          if (data.code != 201) {
            this.accessToken = data.token
            SaveAccessToken(data.token)
            SaveProfileUser(data.data)
          }
        } else if (url == 'auth/logout') {
          this.accessToken = ''
          ClearAll()
        }
        return response
      },
      (error: AxiosError) => {
        console.log(error)
        return Promise.reject(error)
      }
    )
  }
}
const Http = new http().instance
export default Http
