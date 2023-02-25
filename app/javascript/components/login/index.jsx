import React from 'react'
import { Typography, Box, Button, TextField } from '@mui/material';
// import {
//     Container,
//   } from './style'
import { useFormik } from 'formik'
import loginSchema from "../../schemas/login"
import * as Auth from "../../services/internalApi/auth"

const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { setFieldError }) => {
      await Auth.createSession({email: values.email, password: values.password}).then((response) => {
        window.location.href = response.data.location
      }).catch((error) => {
        setFieldError('email', 'Usuário ou senha inválidos!')
      })
    },
  })

  return(
    <Box style={{display: "flex", justifyContent: "center", backgroundColor: "#D4D4D4", width: "100%", height: "100vh"}}>
        <Box style={{alignSelf: "center",backgroundColor: "white", width: "35vw", height: "60vh", borderRadius: "10px", boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.05)"}}>
          <Box style={{marginTop: "5%"}}>
            <Typography style={{ textAlign: "center",fontFamily: 'Courier New', fontStyle: "normal", fontSize: "2rem"}}>Agenda de Contatos V1</Typography>
          </Box>
          <form style={{ display: "flex", flexDirection: "column", marginLeft: "10px", marginTop: "auto", marginBottom: "auto", height: "80%", justifyContent: "center"}} onSubmit={formik.handleSubmit}>
            <Box>
              <Typography>Informe suas credenciais para acessar a sua agenda</Typography>
            </Box>
            <Box>
              <Typography style={{fontSize: "20px"}} variant='subtitle1'>Email</Typography>
              <TextField id='email' name='email' variant='outlined' style={{ width: '92%', marginBottom: '10px' }}
              error={formik.touched.email && Boolean(formik.errors.email)}
              onChange={formik.handleChange} value={formik.values.email}
              helperText={formik.touched.email && formik.errors.email} />
            </Box>
            <Box>
              <Typography style={{fontSize: "20px"}} variant='subtitle1'>Senha</Typography>
              <TextField id='password' name='password' type="password" variant='outlined' style={{ width: '92%', marginBottom: '10px' }}
              error={formik.touched.password && Boolean(formik.errors.password)}
              onChange={formik.handleChange} value={formik.values.password}
              helperText={formik.touched.password && formik.errors.password} />
            </Box>
            <Box>
              <Button variant="contained" type='submit'>Entrar</Button>
            </Box>
          </form>
        </Box>
    </Box>
  )
}

export default Login
