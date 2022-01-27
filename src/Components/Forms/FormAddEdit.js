import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import CustomerDataService from "../../services/CustomerService";
import SweetAlert from 'react-bootstrap-sweetalert';

function AddEditForm(props) {
  const [form, setValues] = useState({
    id: 0,
    lastname: '',
    firstname: '',
    gender: '',
    street: '',
    postalcode: '',
    city: ''
  })

  const [sweet, setSweet] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');


  const onChange = e => {
    setValues({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  //create api
  const submitFormAdd = e => {
    e.preventDefault()
    var data = {
      firstname: form.firstname,
      lastname: form.lastname,
      gender: form.gender,
      street: form.street,
      postalcode: form.postalcode,
      city: form.city
    };
    CustomerDataService.create(data)
      .then(response => {
        console.log(response.data.success)
        if (response.data.success) {
          props.addItemToState(response.data.customer)
          props.toggle()
          props.messageSuccess()
        } 
      })
      .catch(e => {
        setAlertMessage(e.response.data.errors[0].msg);
        setSweet(true);
        console.log(e);
      });
  };

  //update api
  const submitFormEdit = e => {
    e.preventDefault()
    var data = {
      id: form.id,
      firstname: form.firstname,
      lastname: form.lastname,
      gender: form.gender,
      street: form.street,
      postalcode: form.postalcode,
      city: form.city
    };
    CustomerDataService.update(form.id, data)
      .then(response => {
        console.log(response.data)
        if (response.data.success) {
          props.updateState(response.data.customer)
          props.toggle()
          props.messageSuccess()
        } 
      })
      .catch(e => {
        setAlertMessage(e.response.data.errors[0].msg);
        setSweet(true);
        console.log(e);
      });
  }

  useEffect(() => {
    if (props.item) {
      const { id, firstname, lastname, gender, street, postalcode, city } = props.item
      setValues({ id, firstname, lastname, gender, street, postalcode, city })
    }
  }, [])

  const hideAlert = () => {
    setSweet(false);
  };
  return (
    <>
      {
        sweet ? <SweetAlert title={alertMessage} warning onConfirm={hideAlert} /> : ''
      }
      <Form onSubmit={props.item ? submitFormEdit : submitFormAdd}>
        <FormGroup>
          <Label for="firstname">First Name</Label>
          <Input type="text" name="firstname" id="firstname" onChange={onChange} value={form.firstname === null ? '' : form.firstname} />
        </FormGroup>
        <FormGroup>
          <Label for="lastname">Last Name</Label>
          <Input type="text" name="lastname" id="lastname" onChange={onChange} value={form.lastname === null ? '' : form.lastname} />
        </FormGroup>
        <FormGroup>
          <Label>Gender</Label>
          <Input type="select" placeholder="select" name="gender" id="gender" onChange={onChange} value={form.gender === null ? '' : form.gender}>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </Input  >
        </FormGroup>
        <FormGroup>
          <Label for="street">Street</Label>
          <Input type="text" name="street" id="street" onChange={onChange} value={form.street === null ? '' : form.street} />
        </FormGroup>
        <FormGroup>
          <Label for="postalcode">Postalcode</Label>
          <Input type="number" name="postalcode" id="postalcode" onChange={onChange} value={form.postalcode === null ? '' : form.postalcode} />
        </FormGroup>
        <FormGroup>
          <Label for="city">City</Label>
          <Input type="text" name="city" id="city" onChange={onChange} value={form.city} />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    </>

  )
}

export default AddEditForm