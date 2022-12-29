import { useState, useEffect } from "react";
import "../styles/StudentManagementSystem.css";
import esoguLogo from "../assets/images/esogu-logo.png";
import { depts } from "../data/data";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import InfoIcon from "@mui/icons-material/Info";

const UpdateModal = (props) => {
  const [fname, setFname] = useState(props.student.fname);
  const [lname, setLname] = useState(props.student.lname);
  const [num, setNum] = useState(props.student.num);
  const [dept, setDept] = useState(props.student.dept);
  const [pob, setPob] = useState(props.student.pob);
  const [dob, setDob] = useState(props.student.dob);

  const handleClose = () => {
    props.setStudent(null);
    props.setShow(false);
  };

  function updateStudent() {
    if (
      fname !== "" &&
      lname !== "" &&
      num !== "" &&
      dept !== "" &&
      dept !== 0 &&
      pob !== "" &&
      dob !== ""
    ) {
      fetch("http://localhost:3000/students/" + props.student.id, {
        method: "PUT",
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
          Öğrenciyi Düzenle
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
                <option id="bilgisayar" value="1">
                  Bilgisayar Müh.
                </option>
                <option id="elektrik-elektronik" value="2">
                  Elektrik-Elektronik Müh.
                </option>
                <option id="endustri" value="3">
                  Endüstri Müh.
                </option>
                <option id="insaat" value="4">
                  İnşaat Müh.
                </option>
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
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
              />
              <div className="invalid-feedback">Doğum tarihi girilmedi</div>
            </div>
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Vazgeç
        </Button>
        <Button variant="primary" onClick={updateStudent}>
          Onayla
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateModal;
