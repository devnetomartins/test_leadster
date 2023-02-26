import React, {useState} from 'react'
import { Modal, Divider, TextField, Box, InputAdornment, IconButton, Tooltip, Icon, Typography} from '@mui/material';
import ContactForm from '../../ContactForm'
// import {
//     Container,
//   } from './style'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  padding: 10,
};

const NewContact = ({open, handleClose}) => {
  return(
    <Modal open={open} onClose={handleClose}>
      <Box style={{...style, width: '60vw', height: '80vh', backgroundColor: 'white', overflow: 'auto'}}>
        <Typography variant='h3' style={{textAlign: 'center'}}>Cadastrar contato</Typography>
        <Divider></Divider>
        <ContactForm action="create" />
      </Box>
    </Modal>
  )
}

export default NewContact
