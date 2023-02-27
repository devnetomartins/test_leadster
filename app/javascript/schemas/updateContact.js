import * as yup from 'yup'

const updateContactSchema = yup.object({
  full_name: yup.string().required('É necessário informar o nome completo'),
  document_number: yup.string().required('É necessário informar o cpf'),
  email: yup.string().email('Informe um email válido').required('É necessário informar o email'),
  phones: yup.array().of(yup.object().shape({number: yup.string().required('É necessário informar o telefone')})),
  address: yup.object().shape({
    zipcode: yup.string().required('É necessário informar o CEP'),
    neighborhood: yup.string().required('É necessário informar o bairro'),
    city: yup.string().required('É necessário informar a cidade'),
    state: yup.string().required('É necessário informar o estado'),
    street: yup.string().required('É necessário informar a rua'),
  })
})

export default updateContactSchema

