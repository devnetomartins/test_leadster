import React from 'react'
import { Typography, Toolbar, Button, AppBar } from '@mui/material';
import * as Auth from "../../services/internalApi/auth"
const Header = () => {

  const handleLogout = () => {
    Auth.deleteSession().then(() => {
      const baseUrl = document.getElementsByName('url_base')[0].content
      window.location.href = baseUrl
    })
  }

  return(
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Agenda de Contatos
        </Typography>
        <Button color="inherit" onClick={handleLogout}>Sair</Button>
      </Toolbar>
    </AppBar>
  )
}

export default Header
