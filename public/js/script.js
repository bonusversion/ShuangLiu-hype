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
