import React, { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/esm/CloseButton";

function ModalElement(props) {
  useEffect(() => {}, []);
  return (
    <div>
      <Modal show={props.show} onHide={props.hide} size={props.size}>
        <Modal.Header className="modal-header-color">
          <Modal.Title className="modal-header-text">{props.title}</Modal.Title>
          <CloseButton onClick={props.hide}></CloseButton>
        </Modal.Header>

        <Modal.Body
          style={{
            maxHeight: "calc(120vh - 210px)",
            overflowY: "auto",
          }}
          className="modal-body"
        >
          {props.children}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ModalElement;
