import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import AddEditForm from '../Forms/FormAddEdit'
import SweetAlert from 'react-bootstrap-sweetalert';


function ModalButtonForm(props) {
  const [modal, setModal] = useState(false)
  const [sweet, setSweet] = useState(false)

  const toggle = () => {
    setModal(!modal)
  }
  const messageSuccess = () => {
    setSweet(true)
  }
  const hideAlert = () => {
    setSweet(false);
  };
  const closeBtn = <button className="close" onClick={toggle}>&times;</button>
  const label = props.buttonLabel

  let button = ''
  let title = ''

  //check label text from props
  if (label === 'Edit') {
    button = <Button
      color="warning"
      onClick={toggle}
      style={{ float: "left", marginRight: "10px" }}>{label}
    </Button>
    title = 'Edit Customer'
  } else {
    button = <Button
      color="success"
      onClick={toggle}
      style={{ float: "left", marginRight: "10px" }}>{label}
    </Button>
    title = 'Add New Customer'
  }

  return (
    <div>
      {
        sweet ? <SweetAlert title="Successfully" success  onConfirm={hideAlert} /> : ''
      }
      {button}
      <Modal isOpen={modal} toggle={toggle} className={props.className}>
        <ModalHeader toggle={toggle} close={closeBtn}>{title}</ModalHeader>
        <ModalBody>
          <AddEditForm
            addItemToState={props.addItemToState}
            updateState={props.updateState}
            toggle={toggle}
            messageSuccess={messageSuccess}
            item={props.item} />
        </ModalBody>
      </Modal>
    </div>
  )
}

export default ModalButtonForm