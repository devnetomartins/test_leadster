import InternalApiClient from './client'

export const createContact = async (payload) => {
  const client = new InternalApiClient()

  return client.post('/contacts', payload)
}
