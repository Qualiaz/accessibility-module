import accessibility from "./accessibility";
import "./page.scss";

const plusBtn = document.getElementById("plus");
const minusBtn = document.getElementById("minus");

const plusLineHeightBtn = document.getElementById("plusLineHeightBtn");
const minusLineHeightBtn = document.getElementById("minusLineHeightBtn");

plusBtn.addEventListener("click", () => {
  accessibility.contentAdjustments.fontSizing.increase();
});

minusBtn.addEventListener("click", () => {
  accessibility.contentAdjustments.fontSizing.decrease();
});

plusLineHeightBtn.addEventListener("click", () => {
  accessibility.contentAdjustments.lineHeight.decrease();
});

minusLineHeightBtn.addEventListener("click", () => {
  accessibility.contentAdjustments.lineHeight.increase();
});
