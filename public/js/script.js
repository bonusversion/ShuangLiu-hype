"use strict";

document.querySelectorAll(".nav_item_icon").forEach((navIconRow) => {
  navIconRow.addEventListener("mouseover", function (e) {
    const currentItem = e.target;

    currentItem.nextElementSibling.classList.remove("hidden");
  });
});
document.querySelectorAll(".nav_item_icon").forEach((navIconRow) => {
  navIconRow.addEventListener("mouseout", function (e) {
    const currentItem = e.target;
    currentItem.nextElementSibling.classList.add("hidden");
  });
});

// document.querySelector(".run_cmd").addEventListener("click", function () {
//   function jsExecCmd() {
//     let cmd = new ActiveXObject("Wscript.Shell");
//     cmd.run("cmd.exe /k " + value);
//   }
//   jsExecCmd();
// });

const renderTimeFro = function (sec) {
  const hour = parseInt(sec / 60 / 60);
  const min = parseInt((sec % (60 * 60)) / 60);
  const second = sec % 60;
  const expected = `${hour}小时${min}分${second}秒`;
  return expected;
};

const recordLogTime = function () {
  let sec = 0;
  if (!document.querySelector(".curTime")) return;
  setInterval(function () {
    sec++;
    document.querySelector(".curTime").textContent = `${renderTimeFro(sec)}`;
  }, 1000);
};

recordLogTime();
