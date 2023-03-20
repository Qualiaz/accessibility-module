import accessibility from "./accessibility";
import "./page.scss";

const plusBtn = document.getElementById("plus");
const minusBtn = document.getElementById("minus");

plusBtn.addEventListener("click", () => {
  accessibility.contentAdjustments.fontSizing.increase();
});

minusBtn.addEventListener("click", () => {
  accessibility.contentAdjustments.fontSizing.decrease();
});
