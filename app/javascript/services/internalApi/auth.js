import InternalApiClient from './client'

export const createSession = async (payload) => {
  const client = new InternalApiClient()

  return client.post('/users/sign_in', payload)
}

export const deleteSession = async () => {
  const client = new InternalApiClient()

  return client.delete('/users/sign_out')
}
