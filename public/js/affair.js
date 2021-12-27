"use strict";
// Elements

const affairTable = document.querySelector(".affair-table");
const affairTableBody = document.querySelector(".affair-table-body");
const addAffairBtn = document.querySelector(".add-affair-btn");
const ackAddAffairBtn = document.querySelector(".ack-add-affair");
const canAddAffairBtn = document.querySelector(".can-add-affair");
const inputDescription = document.querySelector(".affair-des-input");
const inputAckPerson = document.querySelector(".affair-ackPerson-input");
const inputRemainProgress = document.querySelector(
  ".affair-remainProgress-input"
);
const inputMeasurement = document.querySelector(".affair-measurement-input");
const inputCurProgress = document.querySelector(
  ".affair-currentProgress-input"
);
const affairInfoSheet = document.querySelector(".affair-info-sheet");
const overlay = document.querySelector(".overlay");

// System Variables
let currentItemId = -1;

class Affair {
  id = (Date.now() + "").slice(-10);

  constructor(
    description,
    ackPerson,
    remainProgress,
    measurement,
    curProgress
  ) {
    this.description = description;
    this.ackPerson = ackPerson;
    this.remainProgress = remainProgress;
    this.measurement = measurement;
    this.curProgress = curProgress;
    this.setDate();
  }

  setDate() {
    const now = new Date();
    this.date = `${now.getMonth() + 1}月${now.getDate()}日`;
  }
}

class App {
  allAffairs = [];
  curAffair;
  constructor() {
    this._getLocalStorage();
    // Attach Event Handlers
    addAffairBtn.addEventListener("click", this._addNewAffiar.bind(this));
    ackAddAffairBtn.addEventListener("click", this._ackAffair.bind(this));
    canAddAffairBtn.addEventListener("click", this._hideAffairSheet);
    affairTableBody.addEventListener("click", this._opAffair.bind(this));
  }

  _showAffairSheet() {
    affairInfoSheet.classList.remove("hidden-table");
    overlay.classList.remove("hidden");
  }

  _hideAffairSheet() {
    // Empty inputs
    inputDescription.value = "";
    inputAckPerson.value = "";
    inputRemainProgress.value = "";
    inputMeasurement.value = "";
    inputCurProgress.value = "";

    overlay.classList.add("hidden");
    affairInfoSheet.classList.add("hidden-table");
  }

  _addNewAffiar() {
    this.curAffair = null;
    this._showAffairSheet();
  }

  _ackAffair() {
    if (!this.curAffair) {
      let affair;

      // Get date from Table
      const description = inputDescription.value;
      const ackPerson = inputAckPerson.value;
      const remainProgress = inputRemainProgress.value;
      const measurement = inputMeasurement.value;
      const curProgress = inputCurProgress.value;

      // Create Affair object
      affair = new Affair(
        description,
        ackPerson,
        remainProgress,
        measurement,
        curProgress
      );

      // Add new affair to allAffairs
      this.allAffairs.push(affair);

      // Render affair on table
      this._renderAffir(affair);

      // Set data to localStorage
      localStorage.setItem("allAffairs", JSON.stringify(this.allAffairs));
    }

    if (this.curAffair) {
      this.curAffair.description = inputDescription.value;
      this.curAffair.ackPerson = inputAckPerson.value;
      this.curAffair.remainProgress = inputRemainProgress.value;
      this.curAffair.measurement = inputMeasurement.value;
      this.curAffair.curProgress = inputCurProgress.value;

      affairTableBody.innerHTML = "";
      this.allAffairs.forEach((affair) => this._renderAffir(affair));
    }

    // Hide affair sheet and empty inputs
    this._hideAffairSheet();
  }

  _renderAffir(affair) {
    const html = `<tr data-id="${affair.id}"><td>${affair.date}</td>
    <td>${affair.description}</td>
    <td>${affair.ackPerson}</td>
    <td>${affair.remainProgress}</td>
    <td>${affair.measurement}</td>
    <td>${affair.curProgress}</td>
    <td><button class="edit btn" data-id="${affair.id}"><i class="far fa-edit"></i></button><button class="del btn" data-id="${affair.id}"><i class="far fa-trash-alt"></i></button></td></tr>`;

    affairTableBody.insertAdjacentHTML("afterbegin", html);
  }

  _opAffair(e) {
    const opBtn = e.target.closest(".btn");
    if (!opBtn) return;
    const curAffairId = opBtn.dataset.id;
    if (opBtn.classList.contains("edit")) {
      this._showAffairSheet();
      this.curAffair = this.allAffairs.find(
        (affair) => affair.id === curAffairId
      );
      inputDescription.value = this.curAffair.description;
      inputAckPerson.value = this.curAffair.ackPerson;
      inputRemainProgress.value = this.curAffair.remainProgress;
      inputMeasurement.value = this.curAffair.measurement;
      inputCurProgress.value = this.curAffair.curProgress;
    }
    if (opBtn.classList.contains("del")) {
      const affairInex = this.allAffairs.findIndex(
        (affair) => affair.id === curAffairId
      );
      this.allAffairs.splice(affairInex, 1);
      affairTableBody.innerHTML = "";
      this.allAffairs.forEach((affair) => this._renderAffir(affair));
      // Set data to localStorage
      localStorage.setItem("allAffairs", JSON.stringify(this.allAffairs));
    }
  }

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem("allAffairs"));
    if (!data) return;
    this.allAffairs = data;
    this.allAffairs.forEach((affair) => {
      this._renderAffir(affair);
      affair.__proto__ = Object.create(Affair.prototype);
    });
  }

  reset() {
    localStorage.removeItem("allAffairs");
    location.reload();
  }
}

const app = new App();
