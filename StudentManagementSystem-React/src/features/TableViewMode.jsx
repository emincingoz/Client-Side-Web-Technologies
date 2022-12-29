import { useState, useEffect } from "react";
import "../styles/StudentManagementSystem.css";
import esoguLogo from "../assets/images/esogu-logo.png";
import { depts } from "../data/data";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import InfoIcon from "@mui/icons-material/Info";
import EkleModal from "../components/EkleModal";
import UpdateModal from "../components/UpdateModal";
import SilModal from "../components/SilModal";
import DetayModal from "../components/DetayModal";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";

const TableViewMode = (props) => {
  const handleShow = (setMethod, student) => {
    if (student != null) props.setCurrentStudent(student);
    setMethod(true);
  };
  return (
    <tbody>
      {props.items.map((student, index) => (
        <tr key={index}>
          <td>{student.fname + " " + student.lname}</td>
          <td className="hide-small">{student.num}</td>
          <td className="hide-medium hide-small">{depts[student.dept]}</td>
          <td>
            <div className="row-buttons">
              <div
                className="row-button red-row-button"
                onClick={(e) => handleShow(props.setSilModalShow, student)}
              >
                Sil
              </div>
              <div
                className="row-button blue-row-button"
                onClick={(e) =>
                  handleShow(props.setUpdateModalShow(true), student)
                }
              >
                Düzenle
              </div>
              <div
                className="row-button green-row-button"
                name={student.id}
                onClick={(e) => handleShow(props.setDetayModalShow, student)}
              >
                Detay
              </div>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableViewMode;
