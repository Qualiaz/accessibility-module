import fontSizeSVG from "./assets/font-size.svg";
import contentScaleSVG from "./assets/content-scale.svg";
import letterSpacingSVG from "./assets/letter-spacing.svg";
import lineHeightSVG from "./assets/line-height.svg";
import underlinedTitlesSVG from "./assets/underlined-titles.svg";
import underlinedLinksSVG from "./assets/underlined-links.svg";

import contrastSVG from "./assets/contrast.svg";
import saturationSVG from "./assets/saturation.svg";

class Accessibility {
  contentAdjustments = {
    fontSizing: {
      state: {
        textSize: 1,
      },

      increase() {
        this._resizeFont("increase");
      },

      decrease() {
        this._resizeFont("decrease");
      },

      _resizeFont(direction) {
        const texts = document.querySelectorAll("p, h1, h2, h3, h4, h5, h6");
        if (direction === "increase") {
          this.state.textSize += 0.05;
        }
        if (direction === "decrease") {
          this.state.textSize -= 0.05;
        }
        texts.forEach((text) => {
          const elStyles = window.getComputedStyle(text);
          const elFontSize = elStyles.getPropertyValue("font-size");

          const size = parseInt(elFontSize);
          if (!text.dataset.initialFontSize) {
            text.dataset.initialFontSize = size;
          }

          const newSize = text.dataset.initialFontSize * this.state.textSize;

          text.style.fontSize = Math.floor(newSize) + "px";
        });
      },
    },
    lineHeight: {
      state: {
        lineHeight: 1,
      },
      increase() {
        this._resizeLineHeight("increase");
      },

      decrease() {
        this._resizeLineHeight("decrease");
      },

      _resizeLineHeight(direction) {
        const texts = document.querySelectorAll("p, h1, h2, h3, h4, h5, h6");
        if (direction === "increase") {
          this.state.lineHeight += 0.1;
        }
        if (direction === "decrease") {
          this.state.lineHeight -= 0.1;
        }
        texts.forEach((text) => {
          const elStyles = window.getComputedStyle(text);
          const elFontSize = parseFloat(elStyles.getPropertyValue("font-size"));

          const lineHeight =
            elStyles.getPropertyValue("line-height") === "normal"
              ? elFontSize * 1.2
              : parseFloat(elStyles.getPropertyValue("line-height"));

          if (!text.dataset.initialLineHeight) {
            text.dataset.initialLineHeight = lineHeight;
          }

          const newLineHeight =
            text.dataset.initialLineHeight * this.state.lineHeight;
          text.style.lineHeight = Math.floor(newLineHeight) + "px";
        });
      },
    },
    letterSpacing: {
      increase() {
        this._resizeLetterSpacing("increase");
      },

      decrease() {
        this._resizeLetterSpacing("decrease");
      },

      _resizeLetterSpacing(direction) {
        const texts = document.querySelectorAll("p, h1, h2,h3");
        texts.forEach((text) => {
          const elStyles = window.getComputedStyle(text);
          let letterSpacing =
            elStyles.getPropertyValue("letter-spacing") === "normal"
              ? 0
              : parseFloat(elStyles.getPropertyValue("letter-spacing"));

          if (!text.dataset.initialLetterSpacing) {
            text.dataset.initialLetterSpacing = letterSpacing;
          }

          if (direction === "increase") {
            text.style.letterSpacing = ++letterSpacing + "px";
          }
          if (direction === "decrease") {
            text.style.letterSpacing = --letterSpacing + "px";
          }
        });
      },
    },
    highlightTitles: {
      state: {
        isOn: false,
      },
      on() {
        const headers = document.querySelectorAll("h1, h2, h3, h4, h5 ,h6");
        headers.forEach((header) => {
          const styles = window.getComputedStyle(header);
          const outline = styles.outline;

          if (!header.dataset.initialOutline) {
            header.dataset.initialOutline = outline;
          }

          header.style.outline = "2px solid #a81a2d";

          this.state.isOn = true;
        });
      },
      off() {
        const headers = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
        headers.forEach((header) => {
          console.log(header.dataset.initialOutline);
          header.style.outline = header.dataset.initialOutline;
          this.state.isOn = false;
        });
      },
    },
    highlightLinks: {
      state: {
        isOn: false,
      },
      on() {
        const anchors = document.querySelectorAll("a");
        anchors.forEach((anchor) => {
          const styles = window.getComputedStyle(anchor);
          const outline = styles.outline;

          if (!anchor.dataset.initialOutline) {
            anchor.dataset.initialOutline = outline;
          }

          anchor.style.outline = "2px solid #1744c0";

          this.state.isOn = true;
        });
      },
      off() {
        const anchors = document.querySelectorAll("a");
        anchors.forEach((anchor) => {
          anchor.style.outline = anchor.dataset.initialOutline;
          this.state.isOn = false;
        });
      },
    },
  };
  colorAdjustments = {
    contrast: {
      state: {
        curContrast: 100,
      },
      increase() {
        const body = document.querySelector("body");
        this.state.curContrast += 5;
        body.style.filter = `contrast(${this.state.curContrast}%)`;
      },
      decrease() {
        const body = document.querySelector("body");
        this.state.curContrast -= 5;
        body.style.filter = `contrast(${this.state.curContrast}%)`;
      },
    },
    saturation: {
      state: {
        curSaturation: 100,
      },
      increase() {
        const body = document.querySelector("body");
        this.state.curSaturation += 5;
        body.style.filter = `saturate(${this.state.curSaturation}%)`;
      },
      decrease() {
        const body = document.querySelector("body");
        this.state.curSaturation -= 5;
        body.style.filter = `saturate(${this.state.curSaturation}%)`;
      },
    },
  };
  helpers = {
    flashlight: {
      state: {
        isOn: false,
      },
      on() {},
      off() {},
    },
  };
  activate() {
    this.#createDOM();
  }
  #createDOM() {
    //main button
    const div = document.createElement("div");
    div.setAttribute("id", "accessibilityBtnWrapper");

    const button = document.createElement("button");
    button.setAttribute("id", "accessibilityBtn");

    const img = document.createElement("img");
    img.setAttribute("id", "accessibilityBtnIcon");
    img.setAttribute("src", "./assets/ion_accessibility.svg");
    img.setAttribute("alt", "accessibility button");

    button.appendChild(img);
    div.appendChild(button);
    document.body.appendChild(div);

    //menu

    //append components
    const divContentSizeContainer = document.querySelector(
      ".accessibility-content-size__wrapper"
    );
    const divFontSizeContainer = document.querySelector(
      ".accessibility-font-size__wrapper"
    );
    const underlinedTitlesWrapper = document.querySelector(
      ".accessibility-underlined-titles__wrapper"
    );
    const underlinedLinksWrapper = document.querySelector(
      ".accessibility-underlined-links__wrapper"
    );
    const lineHeightWrapper = document.querySelector(
      ".accessibility-line-height__wrapper"
    );
    const letterSpacingWrapper = document.querySelector(
      ".accessibility-letter-spacing__wrapper"
    );
    //
    const componentContentSize = this.#createUpDownComponent(
      "MARIME CONTINUT",
      contentScaleSVG
    );

    const divComponentFontSizeContainer = this.#createUpDownComponent(
      "MARIME FONT",
      fontSizeSVG
    );

    const componentUnderlinedTitles = this.#createToggleComponent(
      "TITLURI SUBLINIATE",
      underlinedTitlesSVG
    );

    const componentUnderlinedLinks = this.#createToggleComponent(
      "LINKURI SUBLINIATE",
      underlinedLinksSVG
    );

    const componentLineHeight = this.#createUpDownComponent(
      "SPATIERE RANDURI",
      lineHeightSVG
    );

    const componentLetterSpacing = this.#createUpDownComponent(
      "SPATIERE LITERE",
      letterSpacingSVG
    );

    divFontSizeContainer.appendChild(divComponentFontSizeContainer);
    divContentSizeContainer.appendChild(componentContentSize);
    lineHeightWrapper.appendChild(componentLineHeight);
    letterSpacingWrapper.appendChild(componentLetterSpacing);

    underlinedTitlesWrapper.appendChild(componentUnderlinedTitles);
    underlinedLinksWrapper.appendChild(componentUnderlinedLinks);
  }

  #createUpDownComponent(name, iconSrc) {
    const divComponentContainer = document.createElement("div");
    const divNameContainer = document.createElement("div");
    const img = document.createElement("img");
    const span = document.createElement("span");
    const divButtonsContainer = document.createElement("div");
    const divPlusBtnWrapper = document.createElement("div");
    const buttonPlus = document.createElement("button");
    const spanPlus = document.createElement("span");
    const spanPercentage = document.createElement("span");
    const divMinusBtnWrapper = document.createElement("div");
    const buttonMinus = document.createElement("button");
    const spanMinus = document.createElement("span");

    // set the attributes and content for the elements
    divComponentContainer.setAttribute(
      "class",
      "accessibility-component__up-down-buttons"
    );
    divNameContainer.setAttribute("class", "up-down-buttons__name-container");
    img.setAttribute("class", "up-down-buttons__img");
    img.setAttribute("src", iconSrc);
    span.innerText = name;
    divButtonsContainer.setAttribute(
      "class",
      "up-down-buttons__buttons-container"
    );
    divPlusBtnWrapper.setAttribute(
      "class",
      "up-down-buttons__plus-btn-wrapper"
    );
    buttonPlus.appendChild(spanPlus);
    spanPlus.innerText = "+";
    spanPercentage.innerText = "+10%";
    divMinusBtnWrapper.setAttribute(
      "class",
      "up-down-buttons__minus-btn-wrapper"
    );
    buttonMinus.appendChild(spanMinus);
    spanMinus.innerText = "-";

    // append the elements to the correct parent elements
    divComponentContainer.appendChild(divNameContainer);
    divNameContainer.appendChild(img);
    divNameContainer.appendChild(span);
    divComponentContainer.appendChild(divButtonsContainer);
    divButtonsContainer.appendChild(divPlusBtnWrapper);
    divPlusBtnWrapper.appendChild(buttonPlus);
    divButtonsContainer.appendChild(spanPercentage);
    divButtonsContainer.appendChild(divMinusBtnWrapper);
    divMinusBtnWrapper.appendChild(buttonMinus);

    return divComponentContainer;
  }

  #createToggleComponent(name, iconSrc) {
    // Create the main container
    const toggleContainer = document.createElement("div");
    const nameContainer = document.createElement("div");
    const image = document.createElement("img");
    const nameWrapper = document.createElement("div");
    const nameSpan = document.createElement("span");
    const btnWrapper = document.createElement("div");
    const btn = document.createElement("button");

    image.src = iconSrc;
    image.alt = "";
    const [nameTop, nameBottom] = name.split(" ");
    nameSpan.innerHTML = `${nameTop} <br /> ${nameBottom}`;

    toggleContainer.classList.add("accessibility-component__toggle-container");
    nameContainer.classList.add("toggle__name-container");
    nameWrapper.classList.add("toggle__name-wrapper");
    btnWrapper.classList.add("toggle__btn-wrapper");
    btn.classList.add("toggle__btn");

    nameWrapper.appendChild(image);
    nameWrapper.appendChild(nameSpan);
    nameContainer.appendChild(image);
    nameContainer.appendChild(nameWrapper);
    btnWrapper.appendChild(btn);
    toggleContainer.appendChild(nameContainer);
    toggleContainer.appendChild(btnWrapper);

    return toggleContainer;
    // document.body.appendChild(toggleContainer);
  }

  createStyle = {
    mainBtn(bgColor) {},
  };
}

export default new Accessibility();
