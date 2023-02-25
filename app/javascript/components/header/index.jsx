import React from 'react'
import { Typography, Box,Toolbar, Button, AppBar, IconButton } from '@mui/material';

const Header = () => {

  return(
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Agenda de Contatos
        </Typography>
        <Button color="inherit">Sair</Button>
      </Toolbar>
    </AppBar>
  )
}

export default Header
