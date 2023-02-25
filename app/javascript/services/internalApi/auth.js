import InternalApiClient from './client'

export const createSession = async (payload) => {
  const client = new InternalApiClient()

  return client.post('/users/sign_in', payload)
}
