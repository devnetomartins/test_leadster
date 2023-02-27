import React from 'react'
import { Typography, TextField, Box, Divider, Select, MenuItem} from '@mui/material';
import { Field } from 'formik'
import InputMask from 'react-input-mask';
import { FormHelperText } from '@mui/material';
import states from '../../utils/states';
import * as FetchAddress from '../../services/viaCep/fetchAddress'

const AddressInputs = ({values, setFieldValue, styles}) => {
  const fetchAddress = async () => {
    const cleanedZipcode = values.address.zipcode.replace(/\D/g, "");

    if(cleanedZipcode.length == 8){
      console.log("zipcode pronto para viacep", cleanedZipcode)

      await FetchAddress.searchAddressByZipcode(cleanedZipcode).then((response) => {
        setFieldValue('address.street', response.data.logradouro)
        setFieldValue('address.neighborhood', response.data.bairro)
        setFieldValue('address.city', response.data.localidade)
        setFieldValue('address.state', response.data.uf)
      })
    }
  }

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
                <>
                  <Select
                    name="address.state"
                    value={form.values.address?.state || ''}
                    label="Age"
                    style={{ width: '97%' }}
                    error={form.touched.address?.state && Boolean(form.errors.address?.state)}
                    MenuProps={{style: {maxHeight: 200}}}
                    onChange={form.handleChange}>
                      { states.map((state, index) => {
                        return(<MenuItem key={`state_${index}`} value={state.nameShort}>{state.name}</MenuItem>)
                      }) }
                  </Select>
                  <FormHelperText style={{marginLeft: '14px', color: 'red'}}>{form.touched.address?.state && form.errors.address?.state}</FormHelperText>
                </>
              )
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
                    onChange={async (e,v) =>{
                      fetchAddress()
                      form.handleChange("address.zipcode")(e)
                    }}
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
