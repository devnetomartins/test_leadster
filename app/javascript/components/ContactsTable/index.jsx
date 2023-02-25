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
import MoreVertIcon from '@mui/icons-material/MoreVert';

// import {
//     Container,
//   } from './style'

const ContactsTable = () => {
  const [searched, setSearched] = useState("")
  const [loading, setLoading] = useState(false)
  function createData(
    name,
    email,
    document,
    birthday,
    phone
  ) {
    return { name, email, document, birthday, phone };
  }

  const headers = [
    'Nome Completo',
    'Email',
    'CPF',
    'Data de nascimento',
    'Telefone',
    'Ações'
  ]
  const rows = []
  // const rows = [
  //   createData('Frozen yoghurt', "test@gmail.com", '067.851.205-20', '20/10/2020', '74981364934'),
  //   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  //   createData('Eclair', 262, 16.0, 24, 6.0),
  //   createData('Cupcake', 305, 3.7, 67, 4.3),
  //   createData('Gingerbread', 356, 16.0, 49, 3.9),
  // ];

  const renderData = () => {
    if(rows.length){
      return(
        rows.map((row) => (
        <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          <TableCell component="th" scope="row" align="center">
            {row.name}
          </TableCell>
          <TableCell align="center">{row.email}</TableCell>
          <TableCell align="center">{row.document}</TableCell>
          <TableCell align="center">{row.birthday}</TableCell>
          <TableCell align="center">{row.phone}</TableCell>
          <TableCell align="center">
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </TableCell>
        </TableRow>)))
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
          <IconButton style={{marginLeft: 'auto', marginRight: 'auto'}}>
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
