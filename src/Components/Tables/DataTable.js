import React from 'react'
import { Table, Button } from 'reactstrap';
import ModalForm from '../Modals/Modal'

function DataTable(props){
  const deleteItem = id => {
    console.log(id);
    let confirmDelete = window.confirm('Delete item?')
    if(confirmDelete){
      fetch('http://localhost:8080/api/customers/'+id, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id
      })
    })
      .then(response => response.json())
      .then(item => {
        props.deleteItemFromState(id)
      })
      .catch(err => console.log(err))
    }
  }

  const items = props.items.map(item => {
    return (
      <tr key={item.id}>
        <th scope="row">{item.id}</th>
        <td>{item.Firstname}</td>
        <td>{item.Lastname}</td>
        <td>{item.Gender}</td>
        <td>{item.Street}</td>
        <td>{item.Postalcode}</td>
        <td>{item.City}</td>
        <td>
          <div style={{width:"110px"}}>
            <ModalForm buttonLabel="Edit" item={item} updateState={props.updateState}/>
            {' '}
            <Button color="danger" onClick={() => deleteItem(item.id)}>Del</Button>
          </div>
        </td>
      </tr>
      )
    })

  return (
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
  )
}

export default DataTable