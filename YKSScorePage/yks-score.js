let aytItems = [
  {
    id: 1,
    sectionTitle: "Türk Dili ve Edebiyatı ve Sosyal Bilimler-1 Testi",
    sectionItems: [
      {
        title: "Türk Dili ve Edebiyatı",
        questionCount: 24,
        true: "",
        false: "",
      },
      { title: "Tarih-1", questionCount: 10, true: "", false: "" },
      {
        title: "Coğrafya-1",
        questionCount: 6,
        true: "",
        false: "",
      },
    ],
  },
  {
    id: 2,
    sectionTitle: "Sosyal Bilimler-2 Testi",
    sectionItems: [
      { title: "Tarih-2", questionCount: 11, true: "", false: "" },
      {
        title: "Coğrafya-2",
        questionCount: 11,
        true: "",
        false: "",
      },
      {
        title: "Felsefe Grubu",
        questionCount: 12,
        true: "",
        false: "",
      },
      {
        title: "Din Kültürü ve Ahlak Bilgisi / Ek Felsefe Grubu",
        questionCount: 6,
        true: "",
        false: "",
      },
    ],
  },
  {
    id: 3,
    sectionTitle: "Matematik Testi",
    sectionItems: [
      {
        title: "Matematik",
        questionCount: 40,
        true: "",
        false: "",
      },
    ],
  },
  {
    id: 4,
    sectionTitle: "Fen Bilimleri Testi",
    sectionItems: [
      { title: "Fizik", questionCount: 14, true: "", false: "" },
      { title: "Kimya", questionCount: 13, true: "", false: "" },
      {
        title: "Biyoloji",
        questionCount: 13,
        true: "",
        false: "",
      },
    ],
  },
];

let tytItems = [
  { id: 1, title: "Türkçe", questionCount: 40, true: "", false: "" },
  {
    id: 2,
    title: "Sosyal Bilimler",
    questionCount: 20,
    true: "",
    false: "",
  },
  {
    id: 3,
    title: "Temel Matematik",
    questionCount: 40,
    true: "",
    false: "",
  },
  {
    id: 4,
    title: "Fen Bilimleri",
    questionCount: 20,
    true: "",
    false: "",
  },
];

let resultItems = [
  { id: 1, title: "Puan Türü", title: "Ham Paun", title: "Yerleştirme Puanı" },
  { id: 2, puanTuru: "TYT", hamPuan: "-", yerlestirmePuani: "-" },
  { id: 3, puanTuru: "SAY", hamPuan: "-", yerlestirmePuani: "-" },
  { id: 4, puanTuru: "EA", hamPuan: "-", yerlestirmePuani: "-" },
  { id: 5, puanTuru: "SÖZ", hamPuan: "-", yerlestirmePuani: "-" },
];

let obp = 250;

function renderAytItems() {
  let template = "";
  for (let index = 0; index < aytItems.length; index++) {
    let item = aytItems[index];

    template += `<div class="ayt-field-section">
          <p class="ayt-field-section-title">
            ${item.sectionTitle}
          </p>`;
    console.log(item);
    item.sectionItems.forEach((i, index) => {
      let netCon = i.title + "-net-container";
      template += `<div class="section-box">
            <div class = "title">
              ${i.title}
              <p class="question-count-style">${i.questionCount} Soru</p>
            </div>
            <div class = "question-container-true-false-with-net">
              <div class="true-false-section">
                <div class="question-container-with-icon">
                  <div>
                    <input
                    id="aytTrueInput"
                    type="number"
                    min="0"
                    max="${i.questionCount}"
                    name="${item.sectionTitle}"
                    onblur="aytSubHandle(value, this, ${index}, 'true', max)"
                      class="question-container"
                      placeholder="-"
                      ></input>
                  </div>
                  <div class="question-container-icon-tick">
                    <span>&#10004;</span>
                  </div>
                </div>
                <div class="question-container-with-icon">
                  <div>
                    <div>
                      <input
                        name="${item.sectionTitle}"
                        onblur="aytSubHandle(value, this, ${index}, 'false', max)"
                        id="aytFalseInput"
                        class="question-container"
                        type="number"
                        min="0"
                        max="${i.questionCount}"
                        placeholder="-"
                        ></input>
                    </div>
                  </div>
                  <div class="question-container-icon-mul">
                    <span>&#10006;</span>
                  </div>
                </div>
              </div>
              <div class="question-container net-container" id="${netCon}">-</div>
          </div>
          </div>
          <hr />`;
    });

    template += `</div>`;
  }

  document.querySelector("#fieldsection").innerHTML = template;
}

function aytSubHandle(value, tag, titleIndex, group, questionCount) {
  for (let i = 0; i < aytItems.length; i++) {
    let section = aytItems[i];
    if (section.sectionTitle == tag.name) {
      let subSection = section.sectionItems[titleIndex];
      if (group === "true") {
        let valToAssign = value != "" ? parseInt(value) : 0;

        let falseCount =
          subSection.false != "" ? parseInt(subSection.false) : 0;
        if (valToAssign + falseCount > questionCount) {
          tag.value = "";
          document.getElementById(
            subSection.title + "-net-container"
          ).innerHTML = "-";
          subSection.false = "";
          subSection.true = "";

          alert("Toplamda " + questionCount + " soru girebilirsin");
        } else {
          document.getElementById(
            subSection.title + "-net-container"
          ).innerHTML = valToAssign - 0.25 * falseCount;
          subSection.true = valToAssign;
        }
      } else if (group === "false") {
        let valToAssign = value != "" ? parseInt(value) : 0;

        let trueCount = subSection.true != "" ? parseInt(subSection.true) : 0;
        if (valToAssign + trueCount > questionCount) {
          tag.value = "";

          document.getElementById(
            subSection.title + "-net-container"
          ).innerHTML = "-";

          subSection.false = "";
          subSection.true = "";

          alert("Toplamda " + questionCount + " soru girebilirsin");
        } else {
          document.getElementById(
            subSection.title + "-net-container"
          ).innerHTML = trueCount - 0.25 * valToAssign;
          subSection.false = valToAssign;
        }
      }
    }
  }
}

function renderTytItems() {
  let template = "";
  for (let index = 0; index < tytItems.length; index++) {
    let item = tytItems[index];
    let netCon = item.title + "-net-container";
    template += `
      <div class="section-box">
            <div class = "title">
              ${item.title}
              <p class="question-count-style">${item.questionCount} Soru</p>
            </div>
            <div class = "question-container-true-false-with-net">
              <div class="true-false-section">
                <div class="question-container-with-icon">
                  <div>
                    <input
                      id="tytTrueInput"
                      class="question-container"
                      name="${item.title}"
                      type="number"
                        min="0"
                        max="${item.questionCount}"
                        onblur="tytSubHandle(value, ${index}, 'true', max, this)"
                      placeholder="-"
                    />
                  </div>
                  <div class="question-container-icon-tick">
                    <span>&#10004;</span>
                  </div>
                </div>
                <div class="question-container-with-icon">
                  <div>
                    <div>
                      <input
                        id="tytFalseInput"
                        name="${item.title}"
                        class="question-container"
                        type="number"
                        min="0"
                        max="${item.questionCount}"
                        onblur="tytSubHandle(value, ${index}, 'false', max, this)"
                        placeholder="-"
                      />
                    </div>
                  </div>
                  <div class="question-container-icon-mul">
                    <span>&#10006;</span>
                  </div>
                </div>
              </div>
              <div class="question-container net-container" id="${netCon}">-</div>
            </div>
          </div>
          <hr />`;

    template += `</div>`;
  }

  document.querySelector("#tytfieldsection").innerHTML = template;
}

function tytSubHandle(value, titleIndex, group, questionCount, tag) {
  let section = tytItems[titleIndex];
  if (group === "true") {
    let valToAssign = value != "" ? parseInt(value) : 0;

    let falseCount = section.false != "" ? parseInt(section.false) : 0;
    if (valToAssign + falseCount > questionCount) {
      tag.value = "";

      document.getElementById(section.title + "-net-container").innerHTML = "-";
      section.false = "";
      section.true = "";

      alert("Toplamda " + questionCount + " soru girebilirsin");
    } else {
      document.getElementById(section.title + "-net-container").innerHTML =
        valToAssign - 0.25 * falseCount;

      section.true = valToAssign;
    }
  } else if (group === "false") {
    let valToAssign = value != "" ? parseInt(value) : 0;

    let trueCount = section.true != "" ? parseInt(section.true) : 0;
    if (valToAssign + trueCount > questionCount) {
      tag.value = "";

      document.getElementById(section.title + "-net-container").innerHTML = "-";

      section.false = "";
      section.true = "";

      alert("Toplamda " + questionCount + " soru girebilirsin");
    } else {
      document.getElementById(section.title + "-net-container").innerHTML =
        trueCount - 0.25 * valToAssign;

      section.false = valToAssign;
    }
  }
}

function renderOBPItems() {
  let template = `
    <div class = "section-box">
      <div class="title"><p>Diploma Notu</p></div>
      <div>
          <input
              name="diploma notu"
              class="question-container"
              placeholder="50"
              type="number"
              min="0"
              max="100"
            />
      </div>
    </div>
    <hr>
    <div class = "section-box">
      <div class="title"><p>OBP</p></div>
      <div class="question-container"><span class = "puan" id="obpid">${obp}</span></div>
    </div>
    <hr>
    <div class="gecen-sene-yerlestim-box">
      <label>
        <input type="checkbox" name="yt checkbox">
        <span class="checkmark"></span>
        Geçen Sene Bir Bölüme Yerleştim
      </label>
    </div><hr>`;
  document.querySelector("#obpfieldsection").innerHTML = template;
}

function renderResultItems() {
  let template = `
    <div class = "section-box"
      <div class="result-titles">
        <p class="result-title">Puan Türü</p>
        <p class="result-title">Ham Puan</p>
        <p class="result-title">Yerleştirme Puanı</p>
      </div>
      <hr />
      <div class="result-body">
        <div class="result-text">
          <p class="result-text-with">TYT</p>
          <p class="result-text-with" id="tytham">-</p>
          <p class="result-text-with" id="tytyer">-</p>
        </div>
        <hr />
        <div class="result-text">
          <p class="result-text-with">SAY</p>
          <p class="result-text-with" id="sayham">-</p>
          <p class="result-text-with" id="sayyer">-</p>
        </div>
        <hr />
        <div class="result-text">
          <p class="result-text-with">EA</p>
          <p class="result-text-with" id="eaham">-</p>
          <p class="result-text-with" id="eayer">-</p>
        </div>
        <hr />
        <div class="result-text">
          <p class="result-text-with">SÖZ</p>
          <p class="result-text-with" id="sozham">-</p>
          <p class="result-text-with" id="sozyer">-</p>
        </div>
      </div>
    </div>`;
  document.querySelector("#resultfieldsection").innerHTML = template;
}

document.addEventListener("DOMContentLoaded", () => {
  // Initial rendering of the items
  renderAytItems();
  renderTytItems();
  renderOBPItems();
  renderResultItems();
});

function puanHesapla() {
  let tytHamPuan = 0,
    tytYerlestirmePuani = 0;
  let sayHamPuan = 0,
    sayYerlestirmePuani = 0;
  let EAHamPuan = 0,
    EAYerlestirmePuani = 0;
  let sozHamPuan = 0,
    sozYerlestirmePuani = 0;

  let checkboxVal = 0;
  let diplomaNotu = 0;

  let inputCounts = document.getElementsByTagName("input");
  for (var inp = 0; inp < inputCounts.length; inp++) {
    let ss = inputCounts[inp];

    switch (ss.name) {
      case "Türk Dili ve Edebiyatı ve Sosyal Bilimler-1 Testi":
        if (ss.value === "") sozHamPuan += 0;
        else {
          if (ss.id === "aytFalseInput")
            sozHamPuan -= parseInt(ss.value) * 0.25;
          else sozHamPuan += parseInt(ss.value);
        }
        break;
      case "Sosyal Bilimler-2 Testi":
        if (ss.value === "") sozHamPuan += 0;
        else {
          if (ss.id === "aytFalseInput")
            sozHamPuan -= parseInt(ss.value) * 0.25;
          else sozHamPuan += parseInt(ss.value);
        }
        break;
      case "Matematik Testi":
        if (ss.value === "") {
          sayHamPuan += 0;
          EAHamPuan += 0;
        } else {
          if (ss.id === "aytFalseInput") {
            sayHamPuan -= parseInt(ss.value) * 0.25;
            EAHamPuan -= parseInt(ss.value) * 0.25;
          } else {
            sayHamPuan += parseInt(ss.value);
            EAHamPuan += parseInt(ss.value);
          }
        }
        break;
      case "Fen Bilimleri Testi":
        if (ss.value === "") sayHamPuan += 0;
        else {
          if (ss.id === "aytFalseInput")
            sayHamPuan -= parseInt(ss.value) * 0.25;
          else sayHamPuan += parseInt(ss.value);
        }
        break;
      case "Türkçe":
        if (ss.value === "") tytHamPuan += 0;
        else {
          if (ss.id === "tytFalseInput")
            tytHamPuan -= parseInt(ss.value) * 0.25;
          else tytHamPuan += parseInt(ss.value);
        }
        break;
      case "Sosyal Bilimler":
        if (ss.value === "") tytHamPuan += 0;
        else {
          if (ss.id === "tytFalseInput")
            tytHamPuan -= parseInt(ss.value) * 0.25;
          else tytHamPuan += parseInt(ss.value);
        }
        break;
      case "Temel Matematik":
        if (ss.value === "") tytHamPuan += 0;
        else {
          if (ss.id === "tytFalseInput")
            tytHamPuan -= parseInt(ss.value) * 0.25;
          else tytHamPuan += parseInt(ss.value);
        }
        break;
      case "Fen Bilimleri":
        if (ss.value === "") tytHamPuan += 0;
        else {
          if (ss.id === "tytFalseInput")
            tytHamPuan -= parseInt(ss.value) * 0.25;
          else tytHamPuan += parseInt(ss.value);
        }
        console.log("asdas: " + tytHamPuan);
        break;
      case "diploma notu":
        if (ss.value === "") {
          obp = 0;
          diplomaNotu = 0;
        } else {
          diplomaNotu = parseInt(ss.value);
          obp = diplomaNotu * 5;
        }

        document.getElementById("obpid").innerHTML = obp;
        break;
      case "yt checkbox":
        if (ss.checked) checkboxVal = 0.3;
        else checkboxVal = 0.6;
        break;
    }
  }

  sayHamPuan *= 6.25;
  sozHamPuan *= 6.25;
  EAHamPuan = (sozHamPuan + 12.5 * EAHamPuan) * 0.5;
  tytHamPuan *= 5;

  sayHamPuan = 0.6 * sayHamPuan + 0.4 * tytHamPuan;
  sozHamPuan = 0.6 * sozHamPuan + 0.4 * tytHamPuan;
  EAHamPuan = 0.6 * EAHamPuan + 0.4 * tytHamPuan;

  tytYerlestirmePuani = tytHamPuan + checkboxVal * diplomaNotu;
  sayYerlestirmePuani = sayHamPuan + checkboxVal * diplomaNotu;
  sozYerlestirmePuani = sozHamPuan + checkboxVal * diplomaNotu;
  EAYerlestirmePuani = EAHamPuan + checkboxVal * diplomaNotu;

  document.getElementById("tytham").innerHTML = tytHamPuan;
  document.getElementById("tytyer").innerHTML = tytYerlestirmePuani;
  document.getElementById("sayham").innerHTML = sayHamPuan;
  document.getElementById("sayyer").innerHTML = sayYerlestirmePuani;
  document.getElementById("eaham").innerHTML = EAHamPuan;
  document.getElementById("eayer").innerHTML = EAYerlestirmePuani;
  document.getElementById("sozham").innerHTML = sozHamPuan;
  document.getElementById("sozyer").innerHTML = sozYerlestirmePuani;
}

function temizle() {
  document.getElementById("tytham").innerHTML = "-";
  document.getElementById("tytyer").innerHTML = "-";
  document.getElementById("sayham").innerHTML = "-";
  document.getElementById("sayyer").innerHTML = "-";
  document.getElementById("eaham").innerHTML = "-";
  document.getElementById("eayer").innerHTML = "-";
  document.getElementById("sozham").innerHTML = "-";
  document.getElementById("sozyer").innerHTML = "-";

  inputs = document.getElementsByTagName("input");
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }

  nets = document.getElementsByClassName("net-container");
  for (let i = 0; i < nets.length; i++) {
    console.log("asdsfsdfg");
    nets[i].innerHTML = "-";
  }

  document.getElementById("obpid").innerHTML = "250";
}

document.getElementById("hesaplaBtn").addEventListener("click", puanHesapla);
document.getElementById("temizleBtn").addEventListener("click", temizle);
