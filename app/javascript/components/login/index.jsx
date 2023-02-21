import React from 'react'
import { Typography, Box, Button, TextField } from '@mui/material';
// import {
//     Container,
//   } from './style'


const Login = () => {
  return(
    <Box style={{display: "flex", justifyContent: "center", backgroundColor: "#D4D4D4", width: "100%", height: "100vh"}}>
        <Box style={{alignSelf: "center",backgroundColor: "white", width: "35vw", height: "60vh", borderRadius: "10px", boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.05)"}}>
          <Box style={{marginTop: "5%"}}>
            <Typography style={{ textAlign: "center",fontFamily: 'Courier New', fontStyle: "normal", fontSize: "2rem"}}>Agenda de Contatos V1</Typography>
          </Box>
          <Box style={{ display: "flex", flexDirection: "column", marginLeft: "10px", marginTop: "auto", marginBottom: "auto", height: "80%", justifyContent: "center",}}>
            <Box>
              <Typography>Informe suas credenciais para acessar a sua agenda</Typography>
            </Box>
            <Box>
              <Typography style={{fontSize: "20px"}} variant='subtitle1'>Email</Typography>
              <TextField variant='outlined' style={{ width: '92%', marginBottom: '10px' }} />
            </Box>
            <Box>
              <Typography style={{fontSize: "20px"}} variant='subtitle1'>Senha</Typography>
              <TextField variant='outlined' style={{ width: '92%', marginBottom: '10px' }} />
            </Box>
            <Box>
              <Button variant="contained">Entrar</Button>
            </Box>
          </Box>
        </Box>
    </Box>
  )
}

export default Login
