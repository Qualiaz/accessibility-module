import accessibility from "./accessibility";
import "./page.scss";

const plusBtn = document.getElementById("plus");
const minusBtn = document.getElementById("minus");

const plusLineHeightBtn = document.getElementById("plusLineHeightBtn");
const minusLineHeightBtn = document.getElementById("minusLineHeightBtn");

const plusLetterSpacing = document.getElementById("plusLetterSpacing");
const minusLetterSpacing = document.getElementById("minusLetterSpacing");

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

plusLetterSpacing.addEventListener("click", () => {
  accessibility.contentAdjustments.letterSpacing.increase();
});

minusLetterSpacing.addEventListener("click", () => {
  accessibility.contentAdjustments.letterSpacing.decrease();
});
