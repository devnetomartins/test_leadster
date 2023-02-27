import React, {useState, useEffect} from 'react'
import { Modal, Divider, TextField, Box, InputAdornment, IconButton, Tooltip, Icon, Typography} from '@mui/material';
import ContactForm from '../../ContactForm'
import * as Contact from "../../../services/internalApi/contact"

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

const EditContact = ({open, handleClose, contactId}) => {
  const [contact, setContact] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      await Contact.showContact(contactId).then((response) => {
        setContact(response.data)
        setLoading(false)
      })
    }
    if(contactId)
      fetchData()
  }, [contactId]);

  return(
    <Modal open={open} onClose={handleClose}>
      <Box style={{...style, width: '60vw', height: '80vh', backgroundColor: 'white', overflow: 'auto'}}>
        <Typography variant='h3' style={{textAlign: 'center'}}>Editar contato</Typography>
        <Divider></Divider>
        { (loading || !contact) ? null : <ContactForm contact={contact} action="update" /> }
      </Box>
    </Modal>
  )
}

export default EditContact
