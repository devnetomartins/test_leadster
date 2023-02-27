import React, {useState, useEffect} from 'react'
import { Typography, TextField, Box, Divider, IconButton, Tooltip, Icon} from '@mui/material';
import { Field } from 'formik'
import InputMask from 'react-input-mask';
// import {
//     Container,
//   } from './style'

const AddressInputs = ({values, setFieldValue, styles}) => {
  useEffect(() => {
    values.address = {
      street: '',
      number: '',
      neighborhood: '',
      city: '',
      state: '',
      zipcode: ''
    }
  }, []);

  useEffect(() => {
    const cleanedZipcode = values.address.zipcode.replace(/\D/g, "");
    44700000
    if(cleanedZipcode.length == 8){
      console.log("zipcode pronto para viacep", cleanedZipcode)
      setFieldValue('address.number', "12")
      console.log
      values.zipcode = "1111111"
      //bate na viacep e traz endereço para ser preenchido
    }
  }, [values.address?.zipcode]);

  return(
    <Box style={{width: '100%', ...styles}}>
      <Divider />
      <Typography variant='subtitle1'>Endereço:</Typography>
      <Divider />
      <Box style={{display: 'flex', width: '100%', marginTop: '10px'}}>
        <Box style={{width: '50%'}}>
          <Typography style={{fontSize: "20px"}} variant='subtitle1'>Rua</Typography>
          <Field name="address.street">
            {({field, form, meta}) => {
              return(
              <TextField name='address.street' variant='outlined' style={{ width: '97%', marginBottom: '10px' }}
                error={form.touched.address?.street && Boolean(form.errors.address?.street)}
                onChange={form.handleChange} value={form.values.address?.street || ''}
                helperText={form.touched.address?.street && form.errors.address?.street} />)
            }}
          </Field>
        </Box>
        <Box style={{width: '50%'}}>
          <Typography style={{fontSize: "20px"}} variant='subtitle1'>Bairro</Typography>
          <Field name="address.neighborhood">
            {({field, form, meta}) => {
              return(
              <TextField name='address.neighborhood' variant='outlined' style={{ width: '97%', marginBottom: '10px' }}
                error={form.touched.address?.neighborhood && Boolean(form.errors.address?.neighborhood)}
                onChange={form.handleChange} value={form.values.address?.neighborhood || ''}
                helperText={form.touched.address?.neighborhood && form.errors.address?.neighborhood} />)
            }}
          </Field>
        </Box>
      </Box>
      <Box style={{display: 'flex', width: '100%', marginTop: '10px'}}>
        <Box style={{width: '50%'}}>
          <Typography style={{fontSize: "20px"}} variant='subtitle1'>Cidade</Typography>
          <Field name="address.city">
            {({field, form, meta}) => {
              return(
              <TextField name='address.city' variant='outlined' style={{ width: '97%', marginBottom: '10px' }}
                error={form.touched.address?.city && Boolean(form.errors.address?.city)}
                onChange={form.handleChange} value={form.values.address?.city || ''}
                helperText={form.touched.address?.city && form.errors.address?.city} />)
            }}
          </Field>
        </Box>
        <Box style={{width: '50%'}}>
          <Typography style={{fontSize: "20px"}} variant='subtitle1'>Estado</Typography>
          <Field name="address.state">
            {({field, form, meta}) => {
              return(
              <TextField name='address.state' variant='outlined' style={{ width: '97%', marginBottom: '10px' }}
                error={form.touched.address?.state && Boolean(form.errors.address?.state)}
                onChange={form.handleChange} value={form.values.address?.state || ''}
                helperText={form.touched.address?.state && form.errors.address?.state} />)
            }}
          </Field>
        </Box>
      </Box>
      <Box style={{display: 'flex', width: '100%', marginTop: '10px'}}>
        <Box style={{width: '50%'}}>
          <Typography style={{fontSize: "20px"}} variant='subtitle1'>CEP</Typography>
          <Field name="address.zipcode">
            {({field, form, meta}) => {
              return(
                <InputMask
                    mask="99999-999"
                    value={form.values.address?.zipcode || ''}
                    onChange={form.handleChange}
                    disabled={false}
                    maskChar=" "
                  >
                    {() => (<TextField name='address.zipcode' variant='outlined' style={{ width: '97%', marginBottom: '10px' }}
                              error={form.touched.address?.zipcode && Boolean(form.errors.address?.zipcode)}
                              helperText={form.touched.address?.zipcode && form.errors.address?.zipcode} />)}
                                </InputMask>
                                )
            }}
          </Field>
        </Box>
        <Box style={{width: '50%'}}>
          <Typography style={{fontSize: "20px"}} variant='subtitle1'>Numero</Typography>
          <Field name="address.number">
            {({field, form, meta}) => {
              return(
              <TextField name='address.number' variant='outlined' style={{ width: '97%', marginBottom: '10px' }}
                error={form.touched.address?.number && Boolean(form.errors.address?.number)}
                onChange={form.handleChange} value={form.values.address?.number || ''}
                helperText={form.touched.address?.number && form.errors.address?.number} />)
            }}
          </Field>
        </Box>
      </Box>
    </Box>
  )
}

export default AddressInputs
