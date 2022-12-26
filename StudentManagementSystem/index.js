const table = document.querySelector("#table");
var studentList = [];

var currPage = 1;
var numStudentsPerPage = 8;
var numPages = updateNumPages();
var studentCountsPerPage = [5, 8, 10];
var studentInfoList = [
  { title: "İsim", dbValue: "fname" },
  { title: "Soyisim", dbValue: "lname" },
  { title: "Öğrenci Numarası", dbValue: "num" },
  { title: "Bölüm", dbValue: "dept" },
  { title: "Doğum Yeri", dbValue: "pob" },
  { title: "Doğum Tarihi", dbValue: "dob" },
];

function updateNumPages() {
  numPages = Math.ceil(studentList.length / numStudentsPerPage);
}

function renderPageNums() {
  let template = "<div class='pagination-inside'>";

  for (let i = 1; i <= numPages; i++) {
    template += `<button class="pagination-button my-btn h5 ${i === currPage ? "active-pagination-button" : ""
      }"
        onclick="pageClicked(${i})">${i}</button>
        `;
  } // end-for
  template += "</div>";

  document.querySelector("#pagination").innerHTML = template;
}

function pageClicked(pageNum) {
  currPage = pageNum;
  renderAll();
} // end-pageClicked

function studentCountClicked(studentCount) {
  numStudentsPerPage = studentCount;

  updateNumPages();
  if (currPage > numPages) {
    currPage = numPages;
  }

  renderAll();
}

function renderTable() {
  const lastItemIndex = currPage * numStudentsPerPage;
  const firstItemIndex = lastItemIndex - numStudentsPerPage;
  const items = studentList.slice(firstItemIndex, lastItemIndex);

  let template = `<table><tr>
  <th width="35%" class="px-5 h6 fw-bold">İsim Soyisim</th>
  <th width="20%" class="hide-small h6 fw-bold">Öğrenci Numarası</th>
  <th width="20%" class="hide-medium hide-small h6 fw-bold">Bölüm</th>
  <th width="25%" class="h6 fw-bold px-2" >Yetkiler</th>
</tr>`;

  items.forEach((student) => {
    let studentName = student.fname + " " + student.lname;
    template += `<tr>
      <td class="px-5 py-3 h6">${studentName}</td>
      <td class="hide-small h6">${student.num}</td>
      <td class="hide-medium hide-small h6">${depts[student.dept]}</td>
      <td>
        <div class="row-buttons">
          <div class="row-button red-row-button" name="${student.id
      }" data-toggle="modal" data-target="#silModal" onclick="silModalSetData(this)">Sil</div>
          <div class="row-button blue-row-button" name="${student.id
      }" data-toggle="modal" data-target="#updateModal" onclick="updateModalSetData(this)">Düzenle</div>
          <div class="row-button green-row-button" name="${student.id
      }" data-toggle="modal" data-target="#detayModal" onclick="detayModalSetData(this)">Detay</div>
        </div>
      </td>
    </tr>`;
  });

  template += `<tr style="background-color: #f1f3f8">
  <td colspan="4" class= "td-table-footer">
    <div class="table-footer">
      <div style="width: 45%" class="footer-range px-5 pt-3 h6">
        <span class="fw-bold h6">${studentList.length}</span> öğrenciden <span class="fw-bold h6">${firstItemIndex + 1} - ${lastItemIndex > studentList.length ? studentList.length : lastItemIndex
    }</span> arası gösteriliyor
      </div>
      <div id="pagination" class="pt-1" style="width: 30%"></div>
      <div id="per-table-count-boxes"  class="fw-bold px-4 pt-1" style="width: 25%">
        <div class="row-counts h6">`;

  studentCountsPerPage.forEach((item) => {
    template += `<div class="row-count-box ${item === numStudentsPerPage ? "active-pagination-button" : ""
      }" onclick="studentCountClicked(${item})">${item}</div>`;
  });
  template += `
        </div>
      </div>
    </div>
  </td>
</tr></table>`;

  table.innerHTML = template;
}

function updateModalSetData(tag) {
  let student = -1;

  studentList.forEach((item) => {
    if (item.id === parseInt(tag.getAttribute("name"))) {
      student = item;
    }
  });

  if (student !== -1) {
    renderUpdateModal(student);
  }
}

function getEkleModal(item) {
  renderEkleModal();
}

function silModalSetData(tag) {
  let student = -1;

  studentList.forEach((item) => {
    if (item.id === parseInt(tag.getAttribute("name"))) {
      student = item;
    }
  });

  if (student !== -1) {
    renderSilModal(student);
  }
}

function renderSilModal(student) {
  let template = `<div
  class="modal fade"
  id="silModal"
  tabindex="-1"
  role="dialog"
  aria-labelledby="exampleModalLabel"
  aria-hidden="true"
>
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div
        class="modal-header"
      >
        <i class="bi bi-exclamation-triangle-fill"
        ></i>
        <h5
          class="modal-title"
          id="exampleModalLabel"
          style="font-weight: bold"
        >
          Öğrenci Sil
        </h5>
        <i class="bi bi-x-lg"
          type="button"
          class="close"
          data-dismiss="modal"
          aria-label="Close"
        >
        </i>
      </div>
      <div class="modal-body">
        <span style="font-weight: bold">${student.fname + " " + student.lname
    }</span> isimli
        öğrenciyi siliyorsunuz. Bu işlem geri alınamaz. Devam etmek
        istediğinize emin misiniz?
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-secondary"
          data-dismiss="modal"
        >
          Vazgeç
        </button>
        <button class="btn btn-primary" data-dismiss="modal"
        aria-label="Close" type="button" onclick="studentDeleteOperation(`;
  template += student.id;
  template += `)">Sil</button>
      </div>
    </div>
  </div>
</div>`;

  document.getElementById("sil-modal").innerHTML = template;
}

function studentDeleteOperation(studentID) {
  let student = -1;

  studentList.forEach((item) => {
    if (item.id === studentID) student = item;
  });

  if (student !== -1) {
    deleteItem(student);
    //renderAll();
  }
}

function deleteItem(student) {
  fetch("http://localhost:3000/students/" + student.id, {
    method: "DELETE",
    headers: { Accept: "application/json" },
  })
    .then((response) => response.json())
    .then((response) => {
      getAllStudents();
    });
}

function detayModalSetData(tag) {
  let student = -1;

  studentList.forEach((item) => {
    if (item.id === parseInt(tag.getAttribute("name"))) {
      student = item;
    }
  });

  if (student !== -1) {
    renderDetayModal(student);
  }
}

function renderDetayModal(student) {
  let template = `<div
  class="modal fade"
  id="detayModal"
  tabindex="-1"
  role="dialog"
  aria-labelledby="exampleModalLabel"
  aria-hidden="true"
>
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
      <i class="bi bi-info-circle-fill"></i>
        <h5
          class="modal-title"
          id="exampleModalLabel"
          style="font-weight: bold"
        >
          Öğrenci Bilgileri
        </h5>
        <i class="bi bi-x-lg"
          type="button"
          class="close"
          data-dismiss="modal"
          aria-label="Close"
        >
        </i>
      </div>
      <div class="modal-body">
        <div class="detay-modal-body">`;

  studentInfoList.forEach((item, index) => {

    let temp = item.dbValue;
    let newDate=student[temp]

    if (temp === "dob" && student[temp].includes("-")) {
      const splitDate = student[temp].split("-");
      newDate = splitDate[2] + "/" + splitDate[1] + "/" + splitDate[0];
    }



    if (temp === "dept") {
      template += `<div class="detay">
      <div>${item.title}</div>
      <div class="detay-modal-info">${depts[student[temp]]}</div>
    </div>`;
    } else {
      template += `<div class="detay">
      <div>${item.title}</div>
      <div class="detay-modal-info">${newDate}</div>
    </div>`;
    }
  });

  template += `
        </div>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-secondary"
          data-dismiss="modal"
        >
          Close
        </button>
        <!--<button type="button" class="btn btn-primary">
          Save changes
        </button>-->
      </div>
    </div>
  </div>
</div>`;

  document.getElementById("detay-modal").innerHTML = template;
}




function renderUpdateModal(student) {
  let e=student.dept;

  let template = `<div class="modal fade" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
  aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <i class="bi bi-info-circle-fill"></i>
        <h5 class="modal-title" id="exampleModalLabel" style="font-weight: bold">
          Öğrenciyi Düzenle
        </h5>

        <i class="bi bi-x-lg" type="button" class="close" data-dismiss="modal" aria-label="Close">
        </i>
      </div>
      <div class="modal-body">
        <div class="ekle-modal-body">
          <form class="row g-3 needs-validation was-validated" novalidate id="ekle-form">
            <div class="col-md-6">
              <label for="fname" class="form-label">İsim</label>
              <input type="text" class="form-control is-valid" id="fname" minlength="3" required value=${student.fname} />
              <div class="invalid-feedback">
                İsim en az 3 harf içermelidir
              </div>
            </div>
            <div class="col-md-6">
              <label for="lname" class="form-label">Soyisim</label>
              <input type="text" class="form-control" id="lname" minlength="3" required  value=${student.lname} />
              <div class="invalid-feedback">
                Soyisim en az 3 harf içermelidir
              </div>
            </div>
            <div class="col-md-6">
              <label for="num" class="form-label">Öğrenci Numarası</label>
              <input type="number" class="form-control" id="num"
                aria-describedby="inputGroupPrepend" 
                oninput = "javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                maxlength="12" min="99999999999" required  value=${student.num} />
              <div class="invalid-feedback">
                Öğrenci numarası 12 harf içermelidir
              </div>
            </div>
            <div class="col-md-6">
              <label for="dept" class="form-label">Bölüm</label>
              <select class="form-select" id="dept" required>
                <option id="bilgisayar" value="1">Bilgisayar Müh.</option>
                <option id="elektrik-elektronik" value="2">Elektrik-Elektronik Müh.</option>
                <option id="endustri" value="3">Endüstri Müh.</option>
                <option id="insaat" value="4">İnşaat Müh.</option>
              </select>

              <div class="invalid-feedback">Bölüm seçiniz</div>
            </div>
            <div class="col-md-6">
              <label for="pob" class="form-label">Doğum Yeri</label>
              <input type="text" class="form-control" id="pob" minlength="3" required  value=${student.pob} />
              <div class="invalid-feedback">
                Doğum yeri en az üç harf içermelidir
              </div>
            </div>
            <div class="col-md-6">
              <label for="dob" class="form-label">Doğum Tarihi</label>
              <input id="dob" class="form-control" type="date" min="1900-12-31" max="2004-12-31" value=${student.dob} required >
              <div class="invalid-feedback">Doğum tarihi girilmedi</div>
      
            </div>
          </form>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">
          Vazgeç
        </button>
        <button class="btn btn-primary" type="button" name=${student.id} onclick="updateStudent()" id="updateButton">
          Onayla
        </button>
      </div>
    </div>
  </div>
</div>`;

  document.getElementById("update-modal").innerHTML = template;
  if(e==1)document.getElementById("bilgisayar").selected = true;
  else if(e==2) document.getElementById("elektrik-elektronik").selected = true;
  else if(e==3) document.getElementById("endustri").selected = true;
  else document.getElementById("insaat").selected = true;
}

function updateStudent() {
  let tag = document.getElementById("updateModal");

  

  let studentId = document.getElementById("updateButton").name;

  let newStudent = {
    fname: "",
    lname: "",
    num: "",
    dept: "",
    pob: "",
    dob: "",
  };

  let list = tag.getElementsByClassName("form-control");
  for (let i = 0; i < list.length; i++) {
    newStudent[list[i].id] = list[i].value;
  }

  selectTags = tag.getElementsByTagName("select");
  for (let i = 0; i < selectTags.length; i++) {
    newStudent.dept = selectTags[i].selectedIndex +1;
  }


  if (
    newStudent.fname !== "" &&
    newStudent.lname !== "" &&
    newStudent.num !== "" &&
    newStudent.dept !== "" &&
    newStudent.dept !== 0 &&
    newStudent.pob !== "" &&
    newStudent.dob !== ""
  ) {
    fetch("http://localhost:3000/students/" + studentId, {
      method: "PUT",
      cache: "no-cache",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-type": "application/json",
      },
      body: JSON.stringify(newStudent),
    })
      .then((response) => response.json())
      .then((response) => {
        getAllStudents();
      })
      .catch(() => {
        console.log("hata");
      });
  }

}

function renderEkleModal() {
  let template = `<div class="modal fade" id="ekleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
  aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <i class="bi bi-info-circle-fill"></i>
        <h5 class="modal-title" id="exampleModalLabel">
          Eklenecek Öğrenci Bilgileri
        </h5>

        <i class="bi bi-x-lg" type="button" class="close" data-dismiss="modal" aria-label="Close">
        </i>
      </div>
      <div class="modal-body">
        <div class="ekle-modal-body">
          <form class="row g-3 needs-validation was-validated" novalidate id="ekle-form">
            <div class="col-md-6">
              <label for="fname" class="form-label">İsim</label>
              <input type="text" class="form-control is-valid" placeholder="Cem" id="fname" minlength="3" required />
              <div class="invalid-feedback">
                İsim en az 3 harf içermelidir
              </div>
            </div>
            <div class="col-md-6">
              <label for="lname" class="form-label">Soyisim</label>
              <input type="text" class="form-control" placeholder="Kurt" id="lname" minlength="3" required />
              <div class="invalid-feedback">
                Soyisim en az 3 harf içermelidir
              </div>
            </div>
            <div class="col-md-6">
              <label for="num" class="form-label">Öğrenci Numarası</label>
              <input type="number" class="form-control" placeholder="152120171101" id="num"
                aria-describedby="inputGroupPrepend" 
                oninput = "javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                maxlength="12" min="99999999999" required />
              <div class="invalid-feedback">
                Öğrenci numarası 12 harf içermelidir
              </div>
            </div>
            <div class="col-md-6">
              <label for="dept" class="form-label">Bölüm</label>
              <select class="form-select" id="dept" required>
                <option selected disabled value="">Bölüm seçiniz</option>
                <option  value="1">Bilgisayar Müh.</option>
                <option value="2">Elektrik-Elektronik Müh.</option>
                <option value="3">Endüstri Müh.</option>
                <option value="4">İnşaat Müh.</option>
              </select>

              <div class="invalid-feedback">Bölüm seçiniz</div>
            </div>
            <div class="col-md-6">
              <label for="pob" class="form-label">Doğum Yeri</label>
              <input type="text" class="form-control" placeholder="Eskişehir" id="pob" minlength="3" required />
              <div class="invalid-feedback">
                Doğum yeri en az üç harf içermelidir
              </div>
            </div>
            <div class="col-md-6">
              <label for="dob" class="form-label">Doğum Tarihi</label>
              <input id="dob" class="form-control" type="date" min="1900-12-31" max="2004-12-31" required>
              <div class="invalid-feedback">Doğum tarihi girilmedi</div>
            </div>
          </form>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">
          Close
        </button>
        <button class="btn btn-primary" type="button" onclick="addNewStudent()">
          Add
        </button>
      </div>
    </div>
  </div>
</div>`;
  document.getElementById("ekle-modal").innerHTML = template;
}



function addNewStudent() {
  let tag = document.getElementById("ekleModal");

  let newStudent = {
    fname: "",
    lname: "",
    num: "",
    dept: "",
    pob: "",
    dob: "",
  };

  let list = tag.getElementsByClassName("form-control");
  for (let i = 0; i < list.length; i++) {
    newStudent[list[i].id] = list[i].value;
  }

  selectTags = tag.getElementsByTagName("select");
  for (let i = 0; i < selectTags.length; i++) {
    newStudent.dept = selectTags[i].selectedIndex;
  }
  let flag = false;

  for (let i = 0; i < studentList.length; i++) {
    if (studentList[i].num === newStudent.num) flag = true;
  }

  if (
    newStudent.fname !== "" &&
    newStudent.lname !== "" &&
    newStudent.num !== "" &&
    newStudent.dept !== "" &&
    newStudent.dept !== 0 &&
    newStudent.pob !== "" &&
    newStudent.dob !== "" &&
    flag === false
  ) {
    fetch("http://localhost:3000/students", {
      method: "POST",
      cache: "no-cache",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-type": "application/json",
      },
      body: JSON.stringify(newStudent),
    })
      .then((response) => response.json())
      .then((response) => {
        getAllStudents();
      })
      .catch(() => {
        console.log("hata");
      });
  }
}

function renderAll() {
  updateNumPages();
  renderTable();
  renderPageNums();
  //renderDetayModal();
  //renderEkleModal();
} // end-renderAll

function getAllStudents() {
  fetch("http://localhost:3000/students", {
    method: "GET",
    headers: { Accept: "application/json" },
  })
    .then((response) => response.json())
    .then((response) => {
      let jsonObj = JSON.stringify(response);
      studentList = JSON.parse(jsonObj);

      updateNumPages();
      if (currPage > numPages) {
        currPage = numPages;
      }

      renderAll();
    });
}

window.addEventListener("DOMContentLoaded", (e) => {
  getAllStudents();
});