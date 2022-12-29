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
import Card from "../components/Card";

const CardViewMode = (props) => {
  function RenderCards() {
    let array = [];

    props.items.map((student, index) => {
      array.push(
        <Card
          key={index}
          student={student}
          setUpdateModalShow={props.setUpdateModalShow}
          setDetayModalShow={props.setDetayModalShow}
          setSilModalShow={props.setSilModalShow}
          setCurrentStudent={props.setCurrentStudent}
        />
      );
    });

    return array;
  }
  return (
    <div className="card-view-mode">
      <RenderCards />
    </div>
  );
};

export default CardViewMode;
