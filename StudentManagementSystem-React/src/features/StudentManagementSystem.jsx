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
import TableViewMode from "./TableViewMode";
import CardViewMode from "./CardViewMode";

const StudentManagementSystem = () => {
  const [studentList, setStudentList] = useState(null);

  const [currPage, setCurrPage] = useState(1);
  const [numStudentsPerPage, setNumStudentsPerPage] = useState(8);

  const [currentStudent, setCurrentStudent] = useState(null);

  const [ekleModalShow, setEkleModalShow] = useState(false);
  const [updateModalShow, setUpdateModalShow] = useState(false);
  const [silModalShow, setSilModalShow] = useState(false);
  const [detayModalShow, setDetayModalShow] = useState(false);

  const [viewMode, setViewMode] = useState("Card View");

  const handleClose = (setMethod) => setMethod(false);
  const handleShow = (setMethod, student) => {
    if (student != null) setCurrentStudent(student);
    setMethod(true);
  };

  var numPages = updateNumPages();

  function updateNumPages() {
    if (studentList != null)
      numPages = Math.ceil(studentList.length / numStudentsPerPage);
  }

  const studentCountsPerPage = [5, 8, 10];

  useEffect(() => {
    getAllStudents();
    //updateNumPages();
  }, []);

  function getAllStudents() {
    fetch("http://localhost:3000/students", {
      method: "GET",
      headers: { Accept: "application/json" },
    })
      .then((response) => response.json())
      .then((response) => {
        let jsonObj = JSON.stringify(response);
        setStudentList(JSON.parse(jsonObj));

        if (studentList != null) updateNumPages();
        if (currPage > numPages) {
          setCurrPage(numPages);
        }

        //renderAll();
      });
  }

  function studentCountClicked(studentCount) {
    setNumStudentsPerPage(studentCount);

    updateNumPages();
    if (currPage > numPages) {
      setCurrPage(numPages);
    }
  }

  function RenderPageNums() {
    let array = [];
    updateNumPages();

    if (currPage > numPages) {
      setCurrPage(numPages);
    }

    for (let i = 1; i <= numPages; i++) {
      array.push(
        <button
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          key={i}
          className={`pagination-button my-btn h5 ${
            i === currPage ? "active-pagination-button" : ""
          }`}
          onClick={(e) => setCurrPage(i)}
        >
          {i}
        </button>
      );
    }

    return array;
  }

  function changeView() {
    if (viewMode === "Card View") setViewMode("Table View");
    else setViewMode("Card View");
  }

  function RenderTable() {
    const lastItemIndex = currPage * numStudentsPerPage;
    const firstItemIndex = lastItemIndex - numStudentsPerPage;
    const items = studentList.slice(firstItemIndex, lastItemIndex);

    return (
      <table>
        {viewMode === "Card View" ? (
          <thead>
            <tr>
              <th width="35%">İsim Soyisim</th>
              <th width="20%" className="hide-small">
                Öğrenci Numarası
              </th>
              <th width="20%" className="hide-medium hide-small">
                Bölüm
              </th>
              <th width="25%">Yetkiler</th>
            </tr>
          </thead>
        ) : (
          <></>
        )}
        {viewMode === "Card View" ? (
          <TableViewMode
            studentList={studentList}
            currPage={currPage}
            numStudentsPerPage={numStudentsPerPage}
            handleClose={handleClose}
            setUpdateModalShow={setUpdateModalShow}
            setDetayModalShow={setDetayModalShow}
            setSilModalShow={setSilModalShow}
            lastItemIndex={lastItemIndex}
            firstItemIndex={firstItemIndex}
            items={items}
            setCurrentStudent={setCurrentStudent}
          />
        ) : (
          <CardViewMode
            studentList={studentList}
            currPage={currPage}
            numStudentsPerPage={numStudentsPerPage}
            handleClose={handleClose}
            setUpdateModalShow={setUpdateModalShow}
            setDetayModalShow={setDetayModalShow}
            setSilModalShow={setSilModalShow}
            lastItemIndex={lastItemIndex}
            firstItemIndex={firstItemIndex}
            items={items}
            setCurrentStudent={setCurrentStudent}
          />
        )}

        <tfoot>
          <tr style={{ backgroundColor: "#f1f3f8" }}>
            <td colSpan="4">
              <div className="table-footer">
                {studentList != null ? (
                  <div
                    style={{
                      width: "33%",
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontWeight: "bold"}}>
                      {studentList.length}
                    </span><span style={{marginLeft: '.2rem'}}>öğrenciden</span>
                    <span style={{ fontWeight: "bold", marginLeft: '.2rem'}}>
                      {firstItemIndex + 1} 
                    </span>
                    -
                    <span style={{ fontWeight: "bold" }}>
                      {lastItemIndex > studentList.length
                        ? studentList.length
                        : lastItemIndex}
                    </span>
                    <span style={{marginLeft: '.2rem'}}>arası gösteriliyor</span>
                  </div>
                ) : (
                  <></>
                )}

                <div
                  id="pagination"
                  style={{
                    width: "33%",
                    display: "flex",
                    alignItems: "center",
                    paddingTop: '0.5rem',
                  }}
                >
                  <div
                    className="pagination-inside"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <RenderPageNums />
                  </div>
                </div>
                <div id="per-table-count-boxes" style={{ width: "33%" }}>
                  <div className="row-counts">
                    {studentCountsPerPage.map((item, index) => (
                      <div
                        key={index}
                        className={`row-count-box ${
                          item === numStudentsPerPage
                            ? "active-pagination-button"
                            : ""
                        }`}
                        onClick={() => studentCountClicked(item)}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    );
  }

  function RenderCardView() {}

  return (
    <div className="my-container">
      <div className="name-space">Merhaba, John Doe</div>
      <div className="header">
        <div className="header-left-section">
          <div className="icon">
            <img src={esoguLogo} alt="" className="icon" />
          </div>
          <div className="head">
            Eskişehir Osmangazi Üniversitesi
            <span className="header-span">Öğrenci Yönetim Sistemi</span>
          </div>
        </div>
        <div className="header-right-section">
          <button className="header-button">Çıkış Yap</button>
        </div>
      </div>
      <div className="body">
        <div
          className="body-header"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div
            style={{ fontSize: "20px", marginLeft: "3%", fontWeight: "bold" }}
          >
            Öğrenci Listesi
          </div>
          <div
            style={{ display: "flex", marginRight: "2%", marginBottom: "0.3%" }}
          >
            <div style={{ marginRight: "2%" }}>
              <div
                className="view-mode"
                onClick={(e) => changeView()}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div>{viewMode}</div>
                <ToggleOnIcon />
              </div>
            </div>
            <div
              className="student-add-button"
              onClick={(e) => handleShow(setEkleModalShow, null)}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <PersonAddAltIcon />
            </div>
          </div>
        </div>
        <div id="table">{studentList != null ? <RenderTable /> : <></>}</div>
        <EkleModal
          show={ekleModalShow}
          setShow={setEkleModalShow}
          studentList={studentList}
          getStudents={getAllStudents}
          setStudent={setCurrentStudent}
        />
        {/* TODO:: Update Modal içerisinde bölüm yanlış gösteriliyor düzenlenmesi gerekli*/}
        {currentStudent != null ? (
          <UpdateModal
            show={updateModalShow}
            setShow={setUpdateModalShow}
            student={currentStudent}
            getStudents={getAllStudents}
            setStudent={setCurrentStudent}
          />
        ) : (
          <></>
        )}

        {currentStudent != null ? (
          <SilModal
            show={silModalShow}
            setShow={setSilModalShow}
            student={currentStudent}
            getStudents={getAllStudents}
            setStudent={setCurrentStudent}
          />
        ) : (
          <></>
        )}

        {currentStudent != null ? (
          <DetayModal
            show={detayModalShow}
            setShow={setDetayModalShow}
            student={currentStudent}
            setStudent={setCurrentStudent}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default StudentManagementSystem;
