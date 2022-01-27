import React, { useState } from 'react';
import { Table, Button } from 'reactstrap';
import ModalButtonForm from '../Modals/ModalButtonForm'
import CustomerDataService from "../../services/CustomerService";
import SweetAlert from 'react-bootstrap-sweetalert';

function DataTable(props) {
  const [sweet, setSweet] = useState(false);

  //delete data from db
  const deleteItem = (id) => {
    console.log(id);
    let confirmDelete = window.confirm('Delete item?')
    if (confirmDelete) {
      CustomerDataService.delete(id)
        .then(response => {
          console.log(response.data.success)
          if (response.data.success) {
            props.deleteItemFromState(id)
            setSweet(true)
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const items = props.items.map(item => {
    return (
      <tr key={item.id}>
        <th scope="row">{item.id}</th>
        <td>{item.firstname}</td>
        <td>{item.lastname}</td>
        <td>{item.gender}</td>
        <td>{item.street}</td>
        <td>{item.postalcode}</td>
        <td>{item.city}</td>
        <td>
          <div style={{ width: "110px" }}>
            <ModalButtonForm buttonLabel="Edit" item={item} updateState={props.updateState} />
            {' '}
            <Button color="danger" onClick={() => deleteItem(item.id)}>Del</Button>
          </div>
        </td>
      </tr>
    )
  })
  const hideAlert = () => {
    setSweet(false);
  };
  return (
    <>
      {
        sweet ? <SweetAlert title="Successfully" success onConfirm={hideAlert} /> : ''
      }
      <Table responsive hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Gender</th>
            <th>Street</th>
            <th>Postal code</th>
            <th>City</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items}
        </tbody>
      </Table>
    </>
  )
}

export default DataTable