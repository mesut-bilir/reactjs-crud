import React, { useState, useEffect, useRef } from 'react'
import { Container, Row, Col, Button, Input } from 'reactstrap'
import ModalButtonForm from './Components/Modals/ModalButtonForm'
import DataTable from './Components/Tables/DataTable'
import CustomerDataService from "./services/CustomerService";

//check props from inspect
function Customer() {
  const [items, setItems] = useState([]);
  
  let user=JSON.parse(localStorage.getItem('user'));
  
  //get all data
  const getItems = () => {
    CustomerDataService.getAll()
      .then(response => {
        setItems(response.data.customer);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  //search
  const searchForm = useRef(null);
  const searchByLastname = () => {
    const form = searchForm.current
    const key = form['key'].value;
    if (key === '') {
      getItems();
      return false;
    }
    CustomerDataService.searchByLastname(key)
      .then((response) => {
        setItems(response.data.customer);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if(user)
       getItems();
  }, []);

  const addItemToState = (item) => {
    console.log("add item to state: " + item.id);
    setItems([...items, item])
  }

  const updateState = (item) => {
    const itemIndex = items.findIndex(data => data.id === item.id)
    const newArray = [...items.slice(0, itemIndex), item, ...items.slice(itemIndex + 1)]
    setItems(newArray)
  }

  const deleteItemFromState = (id) => {
    console.log("removed: " + id);
    const updatedItems = items.filter(item => item.id !== id)
    setItems(updatedItems)
  }

  let loginButton = <Row>
    <Col>
      <br />
      <br />
      Please visit <a href="http://localhost:3000/login">Login Page</a>
    </Col>
  </Row>;

  return (
    <Container className="App">
      {!user ?
        loginButton
        : <div>
          <Row>
            <Col>
              <h1 style={{ margin: "20px 0" }}>Manage Customers</h1>
            </Col>
          </Row>
          <Row>
            <Col sm={11}>
              <form ref={searchForm}>
                <Input name={'key'} placeholder={'Search...'} />
              </form>
            </Col>
            <Col sm={1}>
              <Button variant="outline-success" onClick={searchByLastname}>Search</Button>
            </Col>

          </Row>
          <Row>
            <Col>
              <DataTable items={items} updateState={updateState} deleteItemFromState={deleteItemFromState} />
            </Col>
          </Row>
          <Row>
            <Col>
              <ModalButtonForm buttonLabel="Add New Customer" addItemToState={addItemToState} />
            </Col>
          </Row>
        </div>
      }
    </Container>
  )
}

export default Customer