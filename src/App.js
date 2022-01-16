import React, { useState, useEffect, useRef } from 'react'
import { Container, Row, Col, Button, Input } from 'reactstrap'
import ModalForm from './Components/Modals/ModalForm'
import DataTable from './Components/Tables/DataTable'

function App(props) {

  const [items, setItems] = useState([])
  //get all data
  const getItems = () => {
    fetch('http://localhost:8080/api/customers')
      .then(response => response.json())
      .then(items => setItems(items))
      .catch(err => console.log(err))
  }

  
  //search
  const searchForm = useRef(null);
  const searchItem = () => {
    const form = searchForm.current
    const id = form['key'].value;
    if (id === '')
      return false;

    fetch('http://localhost:8080/api/customers/key/' + id, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(items => setItems(items))
      .catch(err => console.log(err))
  }



  const addItemToState = (item) => {
    setItems([...items, item])
  }

  const updateState = (item) => {
    const itemIndex = items.findIndex(data => data.id === item.id)
    const newArray = [...items.slice(0, itemIndex), item, ...items.slice(itemIndex + 1)]
    setItems(newArray)
  }

  const deleteItemFromState = (id) => {
    const updatedItems = items.filter(item => item.id !== id)
    setItems(updatedItems)
  }

  useEffect(() => {
    getItems()
  }, []);

  return (
    <Container className="App">
      <Row>
        <Col>
          <h1 style={{ margin: "20px 0" }}>Manage Customers</h1>
        </Col>
      </Row>
      <Row>
        <Col sm={11}>
          <form ref={searchForm}>
            <Input name={'key'} />
          </form>
        </Col>
        <Col sm={1}>
          <Button variant="outline-success" onClick={searchItem}>Search</Button>
        </Col>

      </Row>
      <Row>
        <Col>
          <DataTable items={items} updateState={updateState} deleteItemFromState={deleteItemFromState} />
        </Col>
      </Row>
      <Row>
        <Col>
          <ModalForm buttonLabel="Add Item" addItemToState={addItemToState} />
        </Col>
      </Row>
    </Container>
  )
}

export default App