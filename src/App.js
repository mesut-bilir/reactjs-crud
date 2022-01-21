import React, { useState, useEffect, useRef} from 'react'
import { Container, Row, Col, Button, Input } from 'reactstrap'
import ModalButtonForm from './Components/Modals/ModalButtonForm'
import DataTable from './Components/Tables/DataTable'
//check props from inspect
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
    if (id === ''){
       getItems();
       return false;
    }
     

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
    console.log("add item to state: "+item.id);
    setItems([...items, item])
  }

  const updateState = (item) => {

    const itemIndex = items.findIndex(data => data.id === item.id)
    const newArray = [...items.slice(0, itemIndex), item, ...items.slice(itemIndex + 1)]
    setItems(newArray)
  }

  const deleteItemFromState = (id) => {
    console.log("removed: "+id);
    const updatedItems = items.filter(item => item.id !== id)
    setItems(updatedItems)
  }

  //  useEffect(() => {
  //   console.log('onMount ', items);
  //  });

//hooks use in react functional 
// Similar to componentDidMount and componentDidUpdate:
//used for optimization
//wheb raleted state updated, useEfect will work.
//if you want to be sure your Component renderd..you can use useEffect
//after load component we can change something ..useEffect is better for it

  useEffect(() => {
    console.log('render page');
    getItems()
  }, []);

// If you only want to run the function given to useEffect after the initial render, 
// you can give it an empty array as second argument.


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
            <Input name={'key'}  placeholder={'Search...'}/>
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
          <ModalButtonForm buttonLabel="Add New Customer" addItemToState={addItemToState} />
        </Col>
      </Row>
    </Container>
  )
}

export default App