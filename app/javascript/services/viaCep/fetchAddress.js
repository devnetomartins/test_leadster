import ViaCepClient from './client'

export const searchAddressByZipcode = async (zipcode) => {
  const client = new ViaCepClient()

  return client.get(`/ws/${zipcode}/json/`)
}
