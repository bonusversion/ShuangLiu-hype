"use strict";

const allPPTS = document.querySelectorAll(".ppt-img");
const btnLeft = document.querySelector(".ppt-btn-l");
const btnRight = document.querySelector(".ppt-btn-r");
const maxLength = allPPTS.length;
let currentSlide = 0;

const goToSlide = function (x) {
  allPPTS.forEach(function (ppt, i) {
    ppt.style.transform = `translateX(${(i - x) * 100}%)`;
  });
};

goToSlide(0);

const nextSlide = function () {
  if (currentSlide === maxLength - 1) return;
  currentSlide++;
  goToSlide(currentSlide);
};

const prevSlide = function () {
  if (currentSlide === 0) return;
  currentSlide--;
  goToSlide(currentSlide);
};

document.addEventListener("keydown", function (e) {
  e.key === "ArrowRight" && nextSlide();
  e.key === "ArrowLeft" && prevSlide();
});

btnLeft.addEventListener("click", function () {
  prevSlide();
});

btnRight.addEventListener("click", function () {
  nextSlide();
});
