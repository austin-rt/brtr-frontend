import Client from './api'

export const SignInUser = async (data) => {
  try {
    const res = await Client.post('/token/', data)
    localStorage.setItem('token', res.data.token)
    return res.data.user
  } catch (error) {
    throw error
  }
}

export const RegisterUser = async (data) => {
  try {
    const res = await Client.post('/users/', data)
    return res.data
  } catch (error) {
    throw error
  }
}

export const CheckSession = async () => {
  try {
    const res = await Client.get('/session/')
    return res.data
  } catch (error) {
    throw error
  }
}
