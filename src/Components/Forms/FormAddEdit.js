import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

function AddEditForm(props) {
  const[form, setValues] = useState({
    id: 0,
    Lastname: '',
    Firstname: '',
    Gender: '',
    Street: '',
    Postalcode: '',
    City: ''
  })

  const onChange = e => {
    setValues({
      ...form,
      [e.target.name]: e.target.value
    })
  }
 
  const submitFormAdd = e => {
    e.preventDefault()
    fetch('http://localhost:8080/api/customers', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Lastname: form.Lastname,
        Firstname: form.Firstname,
        Gender: form.Gender,
        Street: form.Street,
        Postalcode: form.Postalcode,
        City: form.City
      })
    })
      .then(response => response.json())
      .then(item => {
        if(Array.isArray(item)) {
          props.addItemToState(item[0])
          props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
      window.location.reload(false);
  }

  const submitFormEdit = e => {
    e.preventDefault()
    fetch('http://localhost:8080/api/customers/'+form.id, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: form.id,
        Firstname: form.Firstname,
        Lastname: form.Lastname,
        Gender: form.Gender,
        Street: form.Street,
        Postalcode: form.Postalcode,
        City: form.City
      })
    })
      .then(response => response.json())
      .then(item => {
        if(Array.isArray(item)) {
          // console.log(item[0])
          props.updateState(item[0])
          props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
      window.location.reload(false);
  }

  useEffect(() => {
    if(props.item){
      const { id, Firstname, Lastname, Gender, Street, Postalcode, City } = props.item
      setValues({ id, Firstname, Lastname, Gender, Street, Postalcode, City })
    }
  }, false)


  return (
    <Form onSubmit={props.item ? submitFormEdit : submitFormAdd}>
      <FormGroup>
        <Label for="Firstname">First Name</Label>
        <Input type="text" name="Firstname" id="Firstname" onChange={onChange} value={form.Firstname === null ? '' : form.Firstname} />
      </FormGroup>
      <FormGroup>
        <Label for="Lastname">Last Name</Label>
        <Input type="text" name="Lastname" id="Lastname" onChange={onChange} value={form.Lastname === null ? '' : form.Lastname}  />
      </FormGroup>
      <FormGroup>
        <Label for="Gender">Gender</Label>
        <Input type="text" name="Gender" id="Gender" onChange={onChange} value={form.Gender === null ? '' : form.Gender}  />
      </FormGroup>
      <FormGroup>
        <Label for="Street">Phone</Label>
        <Input type="text" name="Street" id="Street" onChange={onChange} value={form.Street === null ? '' : form.Street} />
      </FormGroup>
      <FormGroup>
        <Label for="Postalcode">Postalcode</Label>
        <Input type="number" name="Postalcode" id="Postalcode" onChange={onChange} value={form.Postalcode === null ? '' : form.Postalcode} />
      </FormGroup>
      <FormGroup>
        <Label for="City">City</Label>
        <Input type="text" name="City" id="City" onChange={onChange} value={form.City}  />
      </FormGroup>
      <Button>Submit</Button>
    </Form>
  )
}

export default AddEditForm