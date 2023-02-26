import React, {useState} from 'react'
import { Typography, TextField, Box, InputAdornment, IconButton, Tooltip, Icon} from '@mui/material';
import Header from '../../header'
import ContactsTable from '../../ContactsTable'
// import {
//     Container,
//   } from './style'

const ListContacts = ({contacts}) => {
  return(
    <Box sx={{ flexGrow: 1 }}>
      <Header />
      <Box style={{display: "flex", flexDirection: "column", alignItems: 'center', backgroundColor: "#D4D4D4", width: "100%", height: "100vh"}}>
        <Typography style={{marginTop: '1rem'}}>Olá Agostinho, abaixo você pode cadastrar seus contatos.</Typography>
        <Box style={{width: "80vw", marginTop: "3rem"}}>
          <ContactsTable contacts={contacts} />
        </Box>
      </Box>
    </Box>
  )
}

export default ListContacts
