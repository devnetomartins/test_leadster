import * as yup from 'yup'

const loginValidationSchema = yup.object({
  email: yup.string().email('Informe um email válido').required('É necessário informar o email'),
  password: yup.string().required('É necessário informar a senha')
})

export default loginValidationSchema

