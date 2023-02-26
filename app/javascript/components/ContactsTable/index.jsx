import React, {useState} from 'react'
import { TextField, Box, InputAdornment, Tooltip, IconButton, CircularProgress } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';

// import {
//     Container,
//   } from './style'

const ContactsTable = ({contacts, handleNewContact}) => {
  const [searched, setSearched] = useState("")
  const [loading, setLoading] = useState(false)

  const maskString = (str, pattern) => {
    if(str == null)
      return;

    let i = 0;
    const padded = pattern.replace(/#/g, () => {
       return str[i++];
    });
    return padded;
 };

  const headers = [
    'Nome Completo',
    'Email',
    'CPF',
    'Data de nascimento',
    'Telefone',
    'WhatsApp',
    'Ações'
  ]

  const renderData = () => {
    if(contacts.length){


      const elements = contacts.map((contact) => {
        const parsedBirthdayDate = moment(contact.birthday_date, "YYYY-MM-DD").format("DD/MM/YYYY")

        return(
          <TableRow key={contact.email} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row" align="center">
              {contact.full_name}
            </TableCell>
            <TableCell align="center">{contact.email}</TableCell>
            <TableCell align="center">{maskString(contact.document_number, "###.###.###-##")}</TableCell>
            <TableCell align="center">{parsedBirthdayDate}</TableCell>
            <TableCell align="center">{maskString(contact.phone, "(##) #####-####")}</TableCell>
            <TableCell align="center">{'Sim'}</TableCell>
            <TableCell align="center">
              <IconButton>
                <EditIcon style={{color: "#DEB887"}} />
              </IconButton>
              <IconButton>
                <DeleteIcon style={{color: "red"}} />
              </IconButton>
            </TableCell>
          </TableRow>)
      })

      return(elements)
    }else{
      return(
        <TableRow>
          <TableCell colSpan={6} style={{textAlign: 'center'}}>
            Não existem contatos cadastrados
          </TableCell>
        </TableRow>)
    }

  }

  return(
    <TableContainer component={Paper}>
      <Box style={{display: 'flex', alignItems: 'center', marginLeft: '10px',marginTop: '5px'}}>
        <TextField
          id='plate-search'
          label='Informe o nome'
          value={searched}
          onChange={() => {}}
          style={{width: "90%"}}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Tooltip title='Cadastrar contato' placement='top'>
          <IconButton onClick={handleNewContact} style={{marginLeft: 'auto', marginRight: 'auto'}}>
            <PersonAddIcon fontSize='large' />
          </IconButton>
        </Tooltip>
      </Box>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {headers.map((header) => {
              return(<TableCell style={{fontWeight: '500', fontSize: '16px', color: '#586B74'}} align="center" key={header}>{header}</TableCell>)
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          { loading ?
            <TableCell colSpan={6} sx={{ textAlign: 'center' }}>
              <CircularProgress />
            </TableCell>
              : renderData()}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ContactsTable
