import React, {useState} from 'react'
import { Typography, TextField, Box, InputAdornment, IconButton, Tooltip, Icon} from '@mui/material';
import Header from '../../header'
import ContactsTable from '../../ContactsTable'
import NewContact from '../../contacts/NewContact'
// import {
//     Container,
//   } from './style'

const ListContacts = ({contacts}) => {
  const [openNewContact, setOpenNewContact] = useState(false)

  return(
    <Box sx={{ flexGrow: 1 }}>
      <Header />
      <NewContact open={openNewContact} handleClose={() => {setOpenNewContact(false)}}/>
      <Box style={{display: "flex", flexDirection: "column", alignItems: 'center', backgroundColor: "#D4D4D4", width: "100%", position: 'absolute', height: '100%'}}>
        <Typography style={{marginTop: '1rem'}}>Olá Agostinho, abaixo você pode cadastrar seus contatos.</Typography>
        <Box style={{width: "80vw", marginTop: "3rem"}}>
          <ContactsTable contacts={contacts} handleNewContact={() => {setOpenNewContact(true)}} />
        </Box>
      </Box>
    </Box>
  )
}

export default ListContacts
