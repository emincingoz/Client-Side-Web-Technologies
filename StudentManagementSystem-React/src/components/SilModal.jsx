import { useState, useEffect } from "react";
import "../styles/StudentManagementSystem.css";
import esoguLogo from "../assets/images/esogu-logo.png";
import { depts } from "../data/data";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";

const SilModal = (props) => {
  const handleClose = () => {
    props.setStudent(null);
    props.setShow(false);
  };

  function deleteItem(student) {
    fetch("http://localhost:3000/students/" + props.student.id, {
      method: "DELETE",
      headers: { Accept: "application/json" },
    })
      .then((response) => response.json())
      .then((response) => {
        props.getStudents();
        handleClose();
      });
  }

  return (
    <Modal show={props.show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <WarningIcon color="error" />
          Öğrenci Sil
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <span style={{ fontWeight: "bold" }}>
          {props.student.fname + " " + props.student.lname}
        </span>{" "}
        isimli öğrenciyi siliyorsunuz. Bu işlem geri alınamaz. Devam etmek
        istediğinize emin misiniz?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Vazgeç
        </Button>
        <Button variant="primary" onClick={(e) => deleteItem(props.student)}>
          Sil
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SilModal;
