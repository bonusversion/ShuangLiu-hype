"use strict";
// Elements

const affairTable = document.querySelector(".affair-table");
const affairTableBody = document.querySelector(".affair-table-body");
const addAffairBtn = document.querySelector(".add-affair-btn");
const ackAddAffairBtn = document.querySelector(".ack-add-affair");
const affairDesInput = document.querySelector(".affair-des-input");
const affairAckPerson = document.querySelector(".affair-ackPerson-input");
const affairRemainProgress = document.querySelector(
  ".affair-remainProgress-input"
);
const affairMeasurement = document.querySelector(".affair-measurement-input");
const affairCurrentProgress = document.querySelector(
  ".affair-currentProgress-input"
);

// System Variables
let currentItemId = -1;

const Affair = function (
  id,
  date,
  description,
  ackPerson,
  remainProgress,
  measurement,
  curProgress
) {
  this.id = id;
  this.date = date;
  this.description = description;
  this.ackPerson = ackPerson;
  this.remainProgress = remainProgress;
  this.measurement = measurement;
  this.curProgress = curProgress;
};

const affairItem1 = new Affair(
  0,
  "11/15",
  "环境监控上DVIP的UPS报警",
  "蒲豫川",
  "电力部仍未修复该UPS故障",
  "定期在环境监控上检查该UPS是否恢复",
  "12.13已联系电力部，等待备注"
);
const allAffairItems = [affairItem1];

let newAffairId = allAffairItems.length;
// functions
function createAffairItem(affair) {
  const html = `<tr class="affair-row${affair.id}">
  <td>${affair.date}</td>
  <td>${affair.description}</td>
  <td>${affair.ackPerson}</td>
  <td>${affair.remainProgress}</td>
  <td>${affair.measurement}</td>
  <td>${affair.curProgress}</td>
  <td><button class='edit-${affair.id} edit'><i class="far fa-edit"></i></button></td>
  
</tr>`;
  return html;
}

function displayAllAffairs() {
  affairTableBody.innerHTML = "";
  allAffairItems.forEach((affair) => {
    const html = createAffairItem(affair);
    affairTableBody.insertAdjacentHTML("beforeend", html);
  });
}

function addAffairItem(id) {
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const newAffair = new Affair(
    id,
    `${month}/${day}`,
    affairDesInput.value,
    affairAckPerson.value,
    affairRemainProgress.value,
    affairMeasurement.value,
    affairCurrentProgress.value
  );
  allAffairItems.push(newAffair);
  displayAllAffairs();
}

function clearAffairSheet() {
  affairDesInput.value = "";
  affairAckPerson.value = "";
  affairRemainProgress.value = "";
  affairMeasurement.value = "";
  affairCurrentProgress.value = "";
}

// Init

displayAllAffairs();

// Event Handlers
addAffairBtn.addEventListener("click", function (e) {
  currentItemId = newAffairId;
  document.querySelector(".affair-info-sheet").classList.remove("hidden-table");
  newAffairId++;
});

ackAddAffairBtn.addEventListener("click", function () {
  const idArr = allAffairItems.map((a) => a.id);
  if (!idArr.includes(currentItemId)) addAffairItem(currentItemId);
  else {
    const curAffair = allAffairItems.find((a) => currentItemId === a.id);
    curAffair.description = affairDesInput.value;
    curAffair.ackPerson = affairAckPerson.value;
    curAffair.remainProgress = affairRemainProgress.value;
    curAffair.measurement = affairMeasurement.value;
    curAffair.curProgress = affairCurrentProgress.value;
    document.querySelector(
      `.affair-row${currentItemId}`
    ).innerHTML = ` <td>${curAffair.date}</td>
    <td>${curAffair.description}</td>
    <td>${curAffair.ackPerson}</td>
    <td>${curAffair.remainProgress}</td>
    <td>${curAffair.measurement}</td>
    <td>${curAffair.curProgress}</td>
    <td><button class='edit-${curAffair.id} edit'><i class="far fa-edit"></i></button></td>`;
  }
  clearAffairSheet();
  document.querySelector(".affair-info-sheet").classList.add("hidden-table");
});

affairTableBody.addEventListener("click", function (e) {
  if (e.target.classList.contains("edit")) {
    document
      .querySelector(".affair-info-sheet")
      .classList.remove("hidden-table");
    currentItemId = Number(e.target.classList[0].slice(-1));
    const curAffair = allAffairItems.find((a) => currentItemId === a.id);
    affairDesInput.value = curAffair.description;
    affairAckPerson.value = curAffair.ackPerson;
    affairRemainProgress.value = curAffair.remainProgress;
    affairMeasurement.value = curAffair.measurement;
    affairCurrentProgress.value = curAffair.curProgress;
  }
});
