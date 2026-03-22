import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function DeleteList(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <React.Fragment>
      <Button
        variant="primary"
        onClick={(evt) => {
          handleShow();
          props.getList(evt, props.elementId); // Reusing the same fetch method from Update!
        }}
      >
        Delete
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Note the disabled={true} attributes below */}
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={props.singledata.title}
            disabled={true} 
            className="d-block my-3"
          />
          <input
            type="text"
            placeholder="Author"
            name="author"
            value={props.singledata.author}
            disabled={true}
            className="d-block my-3"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={(event) => {
              handleClose();
              props.deleteList(event, props.elementId);
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}

export default DeleteList;