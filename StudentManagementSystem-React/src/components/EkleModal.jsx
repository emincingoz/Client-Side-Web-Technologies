import { useState, useEffect } from "react";
import "../styles/StudentManagementSystem.css";
import esoguLogo from "../assets/images/esogu-logo.png";
import { depts } from "../data/data";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import InfoIcon from "@mui/icons-material/Info";

const EkleModal = (props) => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [num, setNum] = useState("");
  const [dept, setDept] = useState("");
  const [pob, setPob] = useState("");
  const [dob, setDob] = useState("");



  const handleClose = () => {
    props.setStudent(null);
    props.setShow(false);
  };

  function addNewStudent() {
    let flag = false;

    for (let i = 0; i < props.studentList.length; i++) {
      if (props.studentList[i].num === num) flag = true;
    }

    if (
      fname !== "" &&
      lname !== "" &&
      num !== "" &&
      dept !== "" &&
      dept !== 0 &&
      pob !== "" &&
      dob !== "" &&
      flag === false
    ) {
      fetch("http://localhost:3000/students", {
        method: "POST",
        cache: "no-cache",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-type": "application/json",
        },
        body: JSON.stringify({ fname, lname, num, dept, pob, dob }),
      })
        .then((response) => response.json())

        .then((response) => {
          props.getStudents();
          handleClose();
          setFname("");
          setLname("");
          setNum("");
          setDept("");
          setDept("");
          setPob("");
          setDob("");
        })
        .catch(() => {
          console.log("hata");
        });
    }
  }

  return (
    <Modal show={props.show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <InfoIcon color="info" />
          Eklenecek Öğrenci Bilgileri
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="ekle-modal-body">
          <form
            className="row g-3 needs-validation was-validated"
            noValidate
            id="ekle-form"
          >
            <div className="col-md-6">
              <label htmlFor="fname" className="form-label">
                İsim
              </label>
              <input
                type="text"
                className="form-control is-valid"
                id="fname"
                minLength={3}
                required
                value={fname}
                onChange={(e) => setFname(e.target.value)}
              />
              <div className="invalid-feedback">
                İsim en az 3 harf içermelidir
              </div>
            </div>
            <div className="col-md-6">
              <label htmlFor="lname" className="form-label">
                Soyisim
              </label>
              <input
                type="text"
                className="form-control"
                id="lname"
                minLength={3}
                required
                value={lname}
                onChange={(e) => setLname(e.target.value)}
              />
              <div className="invalid-feedback">
                Soyisim en az 3 harf içermelidir
              </div>
            </div>
            <div className="col-md-6">
              <label htmlFor="num" className="form-label">
                Öğrenci Numarası
              </label>
              <input
                type="number"
                className="form-control"
                id="num"
                aria-describedby="inputGroupPrepend"
                max={999999999999}
                min={100000000000}
                required
                value={num}
                onChange={(e) => setNum(e.target.value.slice(0, 12))}
              />
              <div className="invalid-feedback">
                Öğrenci numarası 12 harf içermelidir
              </div>
            </div>
            <div className="col-md-6">
              <label htmlFor="dept" className="form-label">
                Bölüm
              </label>
              <select
                className="form-select"
                id="dept"
                required
                value={dept}
                onChange={(e) => setDept(e.target.value)}
              >
                <option value="">Bölüm seçiniz</option>
                <option value="1">Bilgisayar Müh.</option>
                <option value="2">Elektrik-Elektronik Müh.</option>
                <option value="3">Endüstri Müh.</option>
                <option value="4">İnşaat Müh.</option>
              </select>

              <div className="invalid-feedback">Bölüm seçiniz</div>
            </div>
            <div className="col-md-6">
              <label htmlFor="pob" className="form-label">
                Doğum Yeri
              </label>
              <input
                type="text"
                className="form-control"
                id="pob"
                minLength={3}
                required
                value={pob}
                onChange={(e) => setPob(e.target.value)}
              />
              <div className="invalid-feedback">
                Doğum yeri en az üç harf içermelidir
              </div>
            </div>
            <div className="col-md-6">
              <label htmlFor="dob" className="form-label">
                Doğum Tarihi
              </label>
              <input
                id="dob"
                className="form-control"
                type="date"
                min="1900-12-31"
                max="2004-12-31"
                required
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
              <div className="invalid-feedback">Doğum tarihi girilmedi</div>
            </div>
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={addNewStudent}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EkleModal;
