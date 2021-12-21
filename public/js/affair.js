"use strict";

const Affair = function (
  date,
  description,
  ackPerson,
  remainProgress,
  measurement,
  curProgress
) {
  this.date = date;
  this.description = description;
  this.ackPerson = ackPerson;
  this.remainProgress = remainProgress;
  this.measurement = measurement;
  this.curProgress = curProgress;
};

const affairItem1 = new Affair(
  "11/15",
  "环境监控上DVIP的UPS报警",
  "蒲豫川",
  "电力部仍未修复该UPS故障",
  "定期在环境监控上检查该UPS是否恢复",
  "12.13已联系电力部，等待备注"
);

const createAffairItem = function (affair) {
  const html = `<tr>
  <td>${affair.date}</td>
  <td>${affair.description}</td>
  <td>${affair.ackPerson}</td>
  <td>${affair.remainProgress}</td>
  <td>${affair.measurement}</td>
  <td>${affair.curProgress}</td>
</tr>`;
  return html;
};

const allAffairItems = [affairItem1];

const affairTable = document.querySelector(".affair-table");

allAffairItems.forEach((affair) => {
  const html = createAffairItem(affair);
  affairTable.insertAdjacentHTML("beforeend", html);
});

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

ackAddAffairBtn.addEventListener("click", function () {
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const newAffair = new Affair(
    `${month}/${day}`,
    affairDesInput.value,
    affairAckPerson.value,
    affairRemainProgress.value,
    affairMeasurement.value,
    affairCurrentProgress.value
  );
  const html = createAffairItem(newAffair);
  affairTable.insertAdjacentHTML("beforeend", html);
});
