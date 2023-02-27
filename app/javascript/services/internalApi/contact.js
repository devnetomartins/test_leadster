import InternalApiClient from './client'

export const createContact = async (payload) => {
  const client = new InternalApiClient()

  return client.post('/contacts', payload)
}

export const showContact = async (id) => {
  const client = new InternalApiClient()

  return client.get(`/contacts/${id}`)
}

export const deleteContact = async (id) => {
  const client = new InternalApiClient()

  return client.delete(`/contacts/${id}`)
}
