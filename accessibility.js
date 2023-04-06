import fontSizeSVG from "./assets/font-size.svg";
import contentScaleSVG from "./assets/content-scale.svg";
import letterSpacingSVG from "./assets/letter-spacing.svg";
import lineHeightSVG from "./assets/line-height.svg";
import underlinedTitlesSVG from "./assets/underlined-titles.svg";
import underlinedLinksSVG from "./assets/underlined-links.svg";

import contrastSVG from "./assets/contrast.svg";
import saturationSVG from "./assets/saturation.svg";
import "./style/main.scss";

class Accessibility {
  constructor() {
    this.#bindObjects();
  }

  init() {
    this.#createDOM();
    this.#controller();
  }

  contentAdjustments = {
    state: {
      contentScale: 1,
      fontSize: 1,
      lineHeight: 1,
      letterSpacing: 0, //px
      isHighlightTitles: false,
      isHighlightLinks: false,
    },
    contentScaling: {
      //tba
    },
    fontSizing: {
      increase() {
        this._resizeFont("increase");
      },

      decrease() {
        this._resizeFont("decrease");
      },

      // bind to contentAdjustments
      _resizeFont(direction) {
        const texts = document.querySelectorAll("p, h1, h2, h3, h4, h5, h6");
        //
        if (direction === "increase" && this.state.fontSize < 2.95) {
          this.state.fontSize += 0.05;
          this._util.percentageRender("spanPercentageMarimeFont", "fontSize");
        }
        //
        if (direction === "decrease" && this.state.fontSize > 0.1) {
          this.state.fontSize -= 0.05;
          this._util.percentageRender("spanPercentageMarimeFont", "fontSize");
        }
        //
        texts.forEach((text) => {
          const elStyles = window.getComputedStyle(text);
          const elFontSize = elStyles.getPropertyValue("font-size");

          const size = parseInt(elFontSize);
          if (!text.dataset.initialFontSize) {
            text.dataset.initialFontSize = size;
          }

          const newSize = text.dataset.initialFontSize * this.state.fontSize;

          text.style.fontSize = Math.floor(newSize) + "px";
        });
      },
    },
    lineHeight: {
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
          this._util.percentageRender(
            "spanPercentageSpatiereRanduri",
            "lineHeight"
          );
        }
        if (direction === "decrease") {
          this.state.lineHeight -= 0.1;
          this._util.percentageRender(
            "spanPercentageSpatiereRanduri",
            "lineHeight"
          );
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
        // this bind to contentAdjustments
        ++this.state.letterSpacing;
        this.letterSpacing._resizeLetterSpacing("increase");
        this._util.pxRender(
          "spanPercentageSpatiereLitere",
          this.state.letterSpacing
        );
      },
      decrease() {
        // this bind to contentAdjustments
        --this.state.letterSpacing;
        this.letterSpacing._resizeLetterSpacing("decrease");
        this._util.pxRender(
          "spanPercentageSpatiereLitere",
          this.state.letterSpacing
        );
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
      on() {
        this.state.isHighlightTitles = true;
        this._util.toggleRender("btnTitluriSubliniate", true);
        const headers = document.querySelectorAll("h1, h2, h3, h4, h5 ,h6");
        headers.forEach((header) => {
          const styles = window.getComputedStyle(header);
          const outline = styles.outline;

          if (!header.dataset.initialOutline) {
            header.dataset.initialOutline = outline;
          }

          header.style.outline = "2px solid #a81a2d";
        });
      },
      off() {
        this.state.isHighlightTitles = false;
        this._util.toggleRender("btnTitluriSubliniate", false);
        const headers = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
        headers.forEach((header) => {
          header.style.outline = header.dataset.initialOutline;
        });
      },
    },
    highlightLinks: {
      on() {
        this.state.isHighlightLinks = true;
        this._util.toggleRender("btnLinkuriSubliniate", true);
        const anchors = document.querySelectorAll("a");
        anchors.forEach((anchor) => {
          const styles = window.getComputedStyle(anchor);
          const outline = styles.outline;

          if (!anchor.dataset.initialOutline) {
            anchor.dataset.initialOutline = outline;
          }

          anchor.style.outline = "2px solid #1744c0";
        });
      },
      off() {
        this.state.isHighlightLinks = false;
        this._util.toggleRender("btnLinkuriSubliniate", false);
        const anchors = document.querySelectorAll("a");
        anchors.forEach((anchor) => {
          anchor.style.outline = anchor.dataset.initialOutline;
        });
      },
    },
    _util: {
      percentageRender: (elId, state) => {
        const percentageEl = document.getElementById(elId);
        percentageEl.innerText =
          Math.round(this.contentAdjustments.state[state] * 100) + "%";
      },
      pxRender: (elId, state) => {
        const pxEl = document.getElementById(elId);
        pxEl.innerText = state + " px";
      },
      toggleRender: (elId, state) => {
        const toggleBtnEl = document.getElementById(elId);
        if (state) toggleBtnEl.classList.add("on");
        else toggleBtnEl.classList.remove("on");
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

  tools = {
    flashlight: {
      state: {
        isOn: false,
      },
      on() {},
      off() {},
    },
  };

  setLanguage() {}

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

    const componentFontSizeContainer = this.#createUpDownComponent(
      "MARIME FONT",
      fontSizeSVG,
      this.contentAdjustments.state.fontSize * 100 + "%"
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
      lineHeightSVG,
      this.contentAdjustments.state.lineHeight * 100 + "%"
    );

    const componentLetterSpacing = this.#createUpDownComponent(
      "SPATIERE LITERE",
      letterSpacingSVG,
      "0 px"
    );

    divFontSizeContainer.appendChild(componentFontSizeContainer);
    divContentSizeContainer.appendChild(componentContentSize);
    lineHeightWrapper.appendChild(componentLineHeight);
    letterSpacingWrapper.appendChild(componentLetterSpacing);

    underlinedTitlesWrapper.appendChild(componentUnderlinedTitles);
    underlinedLinksWrapper.appendChild(componentUnderlinedLinks);

    /// COLORS
    const colorSubmenu = document.querySelector(
      ".accessibility-main__colors-adjustments"
    );
    const accessibilityContrastWrapper = document.querySelector(
      ".accessibility-contrast__wrapper"
    );
    const accessibilitySaturationWrapper = document.querySelector(
      ".accessibility-saturation__wrapper"
    );
    const componentContrast = this.#createUpDownComponent(
      "CONTRAST",
      contrastSVG
    );
    const componentSaturation = this.#createUpDownComponent(
      "SATURATIE",
      saturationSVG
    );
    accessibilityContrastWrapper.appendChild(componentContrast);
    accessibilitySaturationWrapper.appendChild(componentSaturation);
  }

  #createUpDownComponent(name, iconSrc, percentage = "+10%") {
    const componentContainer = document.createElement("div");
    const divNameContainer = document.createElement("div");
    const img = document.createElement("img");
    const spanName = document.createElement("span");
    const divButtonsContainer = document.createElement("div");
    const divPlusBtnWrapper = document.createElement("div");
    const buttonPlus = document.createElement("button");
    const spanPlus = document.createElement("span");
    const spanPercentage = document.createElement("span");
    const divMinusBtnWrapper = document.createElement("div");
    const buttonMinus = document.createElement("button");
    const spanMinus = document.createElement("span");

    componentContainer.setAttribute(
      "class",
      "accessibility-component__up-down-buttons"
    );
    divNameContainer.setAttribute("class", "up-down-buttons__name-container");
    img.setAttribute("class", "up-down-buttons__img");
    img.setAttribute("src", iconSrc);
    buttonPlus.setAttribute(
      "id",
      `plusBtn${this.#helpersFunc.formatName(name)}`
    );
    buttonMinus.setAttribute(
      "id",
      `minusBtn${this.#helpersFunc.formatName(name)}`
    );
    spanPercentage.setAttribute(
      "id",
      `spanPercentage${this.#helpersFunc.formatName(name)}`
    );
    divButtonsContainer.setAttribute(
      "class",
      "up-down-buttons__buttons-container"
    );
    divPlusBtnWrapper.setAttribute(
      "class",
      "up-down-buttons__plus-btn-wrapper"
    );
    divMinusBtnWrapper.setAttribute(
      "class",
      "up-down-buttons__minus-btn-wrapper"
    );

    spanName.innerText = name;
    spanPlus.innerText = "+";
    spanPercentage.innerText = percentage;
    spanMinus.innerText = "-";

    buttonPlus.appendChild(spanPlus);
    buttonMinus.appendChild(spanMinus);
    componentContainer.appendChild(divNameContainer);
    divNameContainer.appendChild(img);
    divNameContainer.appendChild(spanName);
    componentContainer.appendChild(divButtonsContainer);
    divButtonsContainer.appendChild(divPlusBtnWrapper);
    divPlusBtnWrapper.appendChild(buttonPlus);
    divButtonsContainer.appendChild(spanPercentage);
    divButtonsContainer.appendChild(divMinusBtnWrapper);
    divMinusBtnWrapper.appendChild(buttonMinus);

    return componentContainer;
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
    btn.id = "btn" + this.#helpersFunc.formatName(name);

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

  #createColorSubmenu() {
    const mainContainer = document.createElement("div");
    const headerContainer = document.createElement("div");
    const headerTextSpan = document.createElement("span");
    const resetBtnWrapper = document.createElement("div");
    const resetBtn = document.createElement("button");
    const contrastWrapper = document.createElement("div");
    const saturationWrapper = document.createElement("div");

    mainContainer.classList.add("accessibility-main__colors-adjustments");
    headerContainer.classList.add("accessibility-color__header");
    resetBtnWrapper.classList.add("accessibility-color__reset-btn-wrapper");

    contrastWrapper.classList.add("accessibility-contrast__wrapper");
    saturationWrapper.classList.add("accessibility-saturation__wrapper");

    headerTextSpan.textContent = "SETARI DE ADJUSTARE CULOARE";
    resetBtn.textContent = "reset";

    headerContainer.appendChild(headerTextSpan);
    resetBtnWrapper.appendChild(resetBtn);
    headerContainer.appendChild(resetBtnWrapper);
    mainContainer.appendChild(headerContainer);
    mainContainer.appendChild(contrastWrapper);
    mainContainer.appendChild(saturationWrapper);
  }

  #controller() {
    const accessibilityMenu = document.getElementById("accessibilityMenu");

    accessibilityMenu.addEventListener("click", (e) => {
      const clickedId = e.target.id;

      // CONTENT SCALE
      if (clickedId === "plusBtnMarimeContinut")
        this.contentAdjustments.contentScaling.increase();

      // FONT SIZE
      if (clickedId === "plusBtnMarimeFont")
        this.contentAdjustments.fontSizing.increase();
      if (clickedId === "minusBtnMarimeFont")
        this.contentAdjustments.fontSizing.decrease();

      // LINE HEIGHT SPACING
      if (clickedId === "plusBtnSpatiereRanduri")
        this.contentAdjustments.lineHeight.increase();
      if (clickedId === "minusBtnSpatiereRanduri")
        this.contentAdjustments.lineHeight.decrease();

      // LETTER SPACING
      if (clickedId === "plusBtnSpatiereLitere")
        this.contentAdjustments.letterSpacing.increase();
      if (clickedId === "minusBtnSpatiereLitere")
        this.contentAdjustments.letterSpacing.decrease();

      // HIGHLIGHT TITLES
      if (clickedId === "btnTitluriSubliniate") {
        if (!this.contentAdjustments.state.isHighlightTitles) {
          this.contentAdjustments.highlightTitles.on();
        } else {
          this.contentAdjustments.highlightTitles.off();
        }
      }

      // HIGHLIGHT LINKS
      if (clickedId === "btnLinkuriSubliniate") {
        if (!this.contentAdjustments.state.isHighlightLinks) {
          this.contentAdjustments.highlightLinks.on();
        } else {
          this.contentAdjustments.highlightLinks.off();
        }
      }
    });

    const plusContrast = document.getElementById("plusContrast");
    const minusContrast = document.getElementById("minusContrast");

    const plusSaturation = document.getElementById("plusSaturation");
    const minusSaturation = document.getElementById("minusSaturation");

    plusContrast.addEventListener("click", () => {
      this.colorAdjustments.contrast.increase();
    });

    minusContrast.addEventListener("click", () => {
      this.colorAdjustments.contrast.decrease();
    });

    plusSaturation.addEventListener("click", () => {
      this.colorAdjustments.saturation.increase();
    });

    minusSaturation.addEventListener("click", () => {
      this.colorAdjustments.saturation.decrease();
    });
  }

  #bindObjects() {
    this.#helpersFunc.bindObj(
      this.contentAdjustments.fontSizing,
      "_resizeFont",
      this.contentAdjustments
    );
    this.#helpersFunc.bindObj(
      this.contentAdjustments.lineHeight,
      "_resizeLineHeight",
      this.contentAdjustments
    );
    this.#helpersFunc.bindObj(
      this.contentAdjustments.letterSpacing,
      "increase",
      this.contentAdjustments
    );
    this.#helpersFunc.bindObj(
      this.contentAdjustments.letterSpacing,
      "decrease",
      this.contentAdjustments
    );
    this.#helpersFunc.bindObj(
      this.contentAdjustments.highlightTitles,
      "on",
      this.contentAdjustments
    );
    this.#helpersFunc.bindObj(
      this.contentAdjustments.highlightTitles,
      "off",
      this.contentAdjustments
    );
    this.#helpersFunc.bindObj(
      this.contentAdjustments.highlightLinks,
      "on",
      this.contentAdjustments
    );
    this.#helpersFunc.bindObj(
      this.contentAdjustments.highlightLinks,
      "off",
      this.contentAdjustments
    );
  }

  #helpersFunc = {
    formatName(name) {
      const words = name
        .trim()
        .split(/\s+/)
        .map((word) => word.toLowerCase());

      const formattedName = words
        .map((word, index) => {
          if (index < 2) {
            return word.charAt(0).toUpperCase() + word.slice(1);
          }
          return word;
        })
        .join("");

      return formattedName;
    },
    bindObj(targetObj, methodName, objToBind) {
      targetObj[methodName] = targetObj[methodName].bind(objToBind);
    },
  };
}

export default new Accessibility();
