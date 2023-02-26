import * as yup from 'yup'

const createNewContactSchema = yup.object({
  full_name: yup.string().required('É necessário informar o nome completo'),
  document_number: yup.string().required('É necessário informar o cpf'),
  email: yup.string().email('Informe um email válido').required('É necessário informar o email'),
  phones: yup.array().of(yup.object().shape({number: yup.string().required('É necessário informar o telefone')}))
})

export default createNewContactSchema

