import InternalApiClient from './client'

export const createContact = async (payload) => {
  const client = new InternalApiClient()

  return client.post('/contacts', payload)
}

export const updateContact = async (id, payload) => {
  const client = new InternalApiClient()

  return client.put(`/contacts/${id}`, payload)
}

export const showContact = async (id) => {
  const client = new InternalApiClient()

  return client.get(`/contacts/${id}`)
}

export const deleteContact = async (id) => {
  const client = new InternalApiClient()

  return client.delete(`/contacts/${id}`)
}

export const searchContacts = async (name, page) => {
  const client = new InternalApiClient()

  return client.get(`/contacts/search/?full_name=${name}&page=${page}`)
}
