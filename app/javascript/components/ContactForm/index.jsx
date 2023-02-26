import React, {useState} from 'react'
import { Button, TextField, Box, Typography} from '@mui/material';
import { useFormik, Formik, Form, Field } from 'formik'
import createNewContactSchema from "../../schemas/createContact"
import ContactPhones from "../ContactPhones"
import moment from 'moment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import InputMask from 'react-input-mask';
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

const ContactForm = ({showAddressForm}) => {
  const [date, setDate] = useState(null)

  return(
    <Formik initialValues={{
      full_name: '',
      document_number: '',
      birthday_date: '',
      email: '',
      phones: [{number: "", whatsapp: false }]
    }} validationSchema={createNewContactSchema} onSubmit={() => {}}>
      {({ values, touched, errors }) => (
        <Form style={{alignItems: 'center', display: 'flex', flexDirection: 'column', height: '93%'}}>
          <Box>
            <Typography>Informe abaixo os dados do contato</Typography>
          </Box>
          <Box style={{display: 'flex', width: '100%'}}>
            <Box style={{width: '50%'}}>
              <Typography style={{fontSize: "20px"}} variant='subtitle1'>Nome Completo</Typography>
              <Field name="full_name">
                {({field, form, meta}) => {
                  return(
                  <TextField name='full_name' variant='outlined' style={{ width: '97%', marginBottom: '10px' }}
                    error={form.touched.full_name && Boolean(form.errors.full_name)}
                    onChange={form.handleChange} value={form.values.full_name}
                    helperText={form.touched.full_name && form.errors.full_name} />)
                }}
              </Field>
            </Box>
            <Box style={{width: '50%'}}>
              <Typography style={{fontSize: "20px"}} variant='subtitle1'>Email</Typography>
              <Field name="email">
                {({field, form, meta}) => {
                  return(
                  <TextField name='email' variant='outlined' style={{ width: '97%', marginBottom: '10px' }}
                    error={form.touched.email && Boolean(form.errors.email)}
                    onChange={form.handleChange} value={form.values.email}
                    helperText={form.touched.email && form.errors.email} />)
                }}
              </Field>
            </Box>
          </Box>
          <Box style={{display: 'flex', width: '100%'}}>
            <Box style={{width: '50%'}}>
              <Typography style={{fontSize: "20px"}} variant='subtitle1'>CPF</Typography>
              <Field name="document_number">
                {({field, form, meta}) => {
                  return(
                    <InputMask
                        mask="999.999.999-99"
                        value={form.values.document_number}
                        onChange={form.handleChange}
                        disabled={false}
                        maskChar=" "
                      >
                        {() => (<TextField name='document_number' variant='outlined' style={{ width: '97%', marginBottom: '10px' }}
                                  error={form.touched.document_number && Boolean(form.errors.document_number)}
                                  helperText={form.touched.document_number && form.errors.document_number} />)}
                                    </InputMask>
                                    )
                }}
              </Field>
            </Box>
            <Box style={{width: '50%'}}>
              <Typography style={{fontSize: "20px"}} variant='subtitle1'>Data de aniversario</Typography>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <Field name="birthday_date">
                  {({field, form, meta}) => {
                    return(
                      <DatePicker
                        disableFuture
                        openTo="year"
                        views={["day", "month", "year"]}
                        value={date}
                        inputFormat="DD/MM/YYYY"
                        onChange={(newDate) => {
                          setDate(newDate);
                        }}
                        renderInput={(params) => <TextField name='birthday_date' style={{width: '97%'}} error={form.touched.birthday_date && Boolean(form.errors.birthday_date)}
                                                  onChange={form.handleChange} value={form.values.birthday_date}
                                                  helperText={form.touched.birthday_date && form.errors.birthday_date} {...params} />}
                      />)
                  }}
                </Field>
              </LocalizationProvider>
            </Box>
          </Box>
          <ContactPhones values={values} style={{display: 'flex', width: '100%'}} />
          <Box style={{marginTop: 'auto', paddingTop: '10px', paddingBottom: '15px', marginBottom: '20px'}}>
            <Button variant="contained" onClick={() => {
              console.log(values)
            }} type='submit'>Cadastrar</Button>
          </Box>
          <Button variant="contained" onClick={() => {
              values.address = { zipcode: ""}
            }} type='submit'>Add address</Button>
        </Form>
      )}
    </Formik>
  )
}

export default ContactForm
