import { useState, useEffect } from "react";
import "../styles/StudentManagementSystem.css";
import esoguLogo from "../assets/images/esogu-logo.png";
import { depts } from "../data/data";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";

const DetayModal = (props) => {
  const handleClose = () => {
    props.setStudent(null);
    props.setShow(false);
  };

  const studentInfoList = [
    { title: "İsim", dbValue: "fname" },
    { title: "Soyisim", dbValue: "lname" },
    { title: "Öğrenci Numarası", dbValue: "num" },
    { title: "Bölüm", dbValue: "dept" },
    { title: "Doğum Yeri", dbValue: "pob" },
    { title: "Doğum Tarihi", dbValue: "dob" },
  ];

  const RenderFields = () => {
    let array = [];

    studentInfoList.map((item, index) => {
      let temp = item.dbValue;
      let newDate = props.student[temp];

      if (temp === "dob" && props.student[temp].includes("-")) {
        const splitDate = props.student[temp].split("-");
        newDate = splitDate[2] + "/" + splitDate[1] + "/" + splitDate[0];
      }

      if (temp === "dept") {
        array.push(
          <div className="detay" key={index}>
            <div>{item.title}</div>
            <div className="detay-modal-info">{depts[props.student[temp]]}</div>
          </div>
        );
      } else {
        array.push(
          <div className="detay" key={index}>
            <div>{item.title}</div>
            <div className="detay-modal-info">{newDate}</div>
          </div>
        );
      }
    });

    return array;
  };

  return (
    <Modal show={props.show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <InfoIcon color="info" />
          Öğrenci Bilgileri
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="detay-modal-body">
          <RenderFields />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DetayModal;
