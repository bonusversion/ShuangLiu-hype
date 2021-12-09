"use strict";
let current = 0;
let calcTime = function () {
  setInterval(displayTime, 1000);
};

let displayTime = function () {
  current++;
  // document.querySelector(".timer").textContent = `${current} s`;
};

calcTime();
