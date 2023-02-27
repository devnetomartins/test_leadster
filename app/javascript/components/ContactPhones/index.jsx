import React, {useState, useEffect} from 'react'
import { Typography, TextField, Box, Button, Checkbox, Tooltip} from '@mui/material';
import { Field, FieldArray } from 'formik'
import InputMask from 'react-input-mask';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const ContactPhones = ({values}) => {
  const phoneNumbers = values.phones.map((phone) => {
    return(phone.number)
  })
  const [phones, setPhones] = useState(phoneNumbers)
  const [phoneElements, setPhoneElements] = useState([])

  const buildPhoneElements = () => {
    return(phones.map((phone, index) => {
      return(
        <Box key={index} style={{width: '50%'}}>
          <Typography style={{fontSize: "20px"}} variant='subtitle1'>Telefone</Typography>
          <Box  style={{display: 'flex'}}>
            <Field name={`phones.${index}.number`} style={{ width: '97%', marginBottom: '10px' }}>
              {({field, form, meta}) => {
                const phoneValues = form.values?.phones?.length && form.values.phones[index] || {};
                const phoneErrors = form.errors?.phones?.length && form.errors.phones[index] || {};
                const phoneTouched = form.touched?.phones?.length && form.touched.phones[index] || {};

                return(
                  <InputMask
                  mask="(99) 99999-9999"
                  value={phoneValues.number || ''}
                  onChange={form.handleChange}
                  maskChar=" "
                >
                  {() => (<TextField name={`phones.${index}.number`}  variant='outlined' style={{ width: '97%', marginBottom: '10px' }}
                    error={phoneTouched.number && Boolean(phoneErrors.number)}
                    helperText={phoneTouched.number && phoneErrors.number} />)}
                </InputMask>
                )
              }}
            </Field>
            <Field name={`phones.${index}.whatsapp`} style={{ width: '97%', marginBottom: '10px' }}>
              {({field, form, meta}) => {
                const phoneValues = form.values?.phones?.length && form.values.phones[index] || {};

                return(<Tooltip title='Esse número é whatsapp?' placement='top'>
                        <Checkbox name={`phones.${index}.whatsapp`} onChange={form.handleChange} value={phoneValues.whatsapp || false} checked={phoneValues.whatsapp} icon={<WhatsAppIcon />} checkedIcon={<WhatsAppIcon />} /></Tooltip>)
              }}
            </Field>
          </Box>
        </Box>
      )
    }))
  }

  useEffect(() => {
    const phoneElements = buildPhoneElements()
    let boxsPhone = []
    let listOfBox = []
    let count = 0

    phoneElements.forEach((phoneElement, index) => {
      if(count < 2){
        boxsPhone.push(phoneElement)
        count += 1
      }else{
        listOfBox.push(boxsPhone)
        boxsPhone = []
        boxsPhone.push(phoneElement)
        count = 1
      }

      if(phoneElements.length -1 == index)
        listOfBox.push(boxsPhone)
    });

    const boxsToRender = listOfBox.map((boxs, index) => {
      return(<Box key={`group_phone_${index}`} style={{display: 'flex'}}>{boxs}</Box>)
    })

    setPhoneElements(boxsToRender)
  }, [phones, values.phones]);

  return(
    <Box style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
      <FieldArray name="phones" render={arrayHelpers => {
        return(<>
          {phoneElements}
          <Box>
            <Button onClick={() => {
              arrayHelpers.push({
                number: "",
                whatsapp: false
              })
              setPhones(phones.concat(['']))
            }} variant="contained">Adicionar outro telefone</Button>
            <Button style={{marginLeft: "10px", display: phones.length > 1 ? 'inline' : 'none' }} onClick={() => {
              const phoneSize = phones.length
              if(phoneSize >= 2){
                const lastIndex = phones.length - 1

                setPhones(phones.splice(0, lastIndex))
                values.phones = values.phones.splice(0, lastIndex)
              }
            }} variant="contained">Remover telefone</Button>
          </Box>
        </>)

      }}>
      </FieldArray>

    </Box>
  )
}

export default ContactPhones
