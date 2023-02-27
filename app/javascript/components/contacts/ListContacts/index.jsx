import React, {useState} from 'react'
import { Typography, TextField, Box, InputAdornment, IconButton, Tooltip, Icon} from '@mui/material';
import Header from '../../header'
import ContactsTable from '../../ContactsTable'
import NewContact from '../../contacts/NewContact'
import EditContact from '../../contacts/EditContact'
// import {
//     Container,
//   } from './style'

const ListContacts = ({userEmail, contacts, totalPages}) => {
  const [openNewContact, setOpenNewContact] = useState(false)
  const [openEditContact, setOpenEditContact] = useState(false)
  const [contactId, setContactId] = useState('')

  return(
    <Box sx={{ flexGrow: 1 }}>
      <Header />
      <NewContact open={openNewContact} handleClose={() => {setOpenNewContact(false)}}/>
      <EditContact open={openEditContact} contactId={contactId} handleClose={() => {setOpenEditContact(false)}} />
      <Box style={{display: "flex", flexDirection: "column", alignItems: 'center', backgroundColor: "#D4D4D4", width: "100%", position: 'absolute', height: '100%'}}>
        <Typography style={{marginTop: '1rem'}}>{`Olá ${userEmail}, abaixo você pode cadastrar seus contatos.`}</Typography>
        <Box style={{width: "80vw", marginTop: "3rem"}}>
          <ContactsTable totalPages={totalPages} contacts={contacts} setContactId={setContactId} handleEditContact={() => { setOpenEditContact(true) }} handleNewContact={() => {setOpenNewContact(true)}} />
        </Box>
      </Box>
    </Box>
  )
}

export default ListContacts
