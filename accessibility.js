import fontSizeSVG from "./assets/font-size.svg";
import contentScaleSVG from "./assets/content-scale.svg";
import letterSpacingSVG from "./assets/letter-spacing.svg";
import lineHeightSVG from "./assets/line-height.svg";
import underlinedTitlesSVG from "./assets/underlined-titles.svg";
import underlinedLinksSVG from "./assets/underlined-links.svg";

import contrastSVG from "./assets/contrast.svg";
import saturationSVG from "./assets/saturation.svg";
import invertSVG from "./assets/invert.svg";

import "./style/main.scss";

class Accessibility {
  constructor() {
    this.#bindObjects();
  }

  init() {
    this.#dom.init();
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
        if (direction === "reset") {
          this.state.fontSize = 1;
          this._util.percentageRender("spanPercentageMarimeFont", "fontSize");
        }
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

        if (direction === "reset") {
          this.state.lineHeight = 1;
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
        console.log(this.state);
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
      reset() {
        // this bind to contentAdjustments
        console.log(this.state);
        this.state.letterSpacing = 0;
        this.letterSpacing._resizeLetterSpacing("reset");
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
          if (direction === "reset") {
            text.style.letterSpacing = 0 + "px";
          }
        });
      },
    },
    highlightTitles: {
      on() {
        this.state.isHighlightTitles = true;
        this._util.toggleRender("btnTitluriEvidentiate", true);
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
        this._util.toggleRender("btnTitluriEvidentiate", false);
        const headers = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
        headers.forEach((header) => {
          header.style.outline = header.dataset.initialOutline;
        });
      },
    },
    highlightLinks: {
      on() {
        this.state.isHighlightLinks = true;
        this._util.toggleRender("btnLinkuriEvidentiate", true);
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
        this._util.toggleRender("btnLinkuriEvidentiate", false);
        const anchors = document.querySelectorAll("a");
        anchors.forEach((anchor) => {
          anchor.style.outline = anchor.dataset.initialOutline;
        });
      },
    },
    reset() {
      this.fontSizing._resizeFont("reset");
      this.lineHeight._resizeLineHeight("reset");
      this.letterSpacing.reset();
      this.highlightTitles.off();
      this.highlightLinks.off();
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
    state: {
      contrast: 100,
      saturation: 100,
      isInvert: false,
      isBackgroundWhite: false,
    },
    contrast: {
      increase() {
        if (this.state.contrast >= 200) return;
        const body = document.querySelector("body :not(#accessibilityMenu)");
        this.state.contrast += 10;
        body.style.filter = `contrast(${this.state.contrast}%)`;
        this._util.percentageRender("spanPercentageContrast", "contrast");
      },
      decrease() {
        if (this.state.contrast <= 10) return;
        const body = document.querySelector("body :not(#accessibilityMenu)");
        this.state.contrast -= 10;
        body.style.filter = `contrast(${this.state.contrast}%)`;
        this._util.percentageRender("spanPercentageContrast", "contrast");
      },
      reset() {
        this.state.contrast = 100;
        const body = document.querySelector("body");
        body.style.filter = `contrast(${this.state.contrast}%)`;
        this._util.percentageRender("spanPercentageContrast", "contrast");
      },
    },
    saturation: {
      increase() {
        if (this.state.saturation >= 200) return;
        const body = document.querySelector("body :not(#accessibilityMenu)");
        this.state.saturation += 10;
        body.style.filter = `saturate(${this.state.saturation}%)`;
        this._util.percentageRender("spanPercentageSaturatie", "saturation");
      },
      decrease() {
        if (this.state.saturation <= 10) return;
        const body = document.querySelector("body :not(#accessibilityMenu)");
        this.state.saturation -= 10;
        body.style.filter = `saturate(${this.state.saturation}%)`;
        this._util.percentageRender("spanPercentageSaturatie", "saturation");
      },
      reset() {
        this.state.saturation = 100;
        const body = document.querySelector("body");
        body.style.filter = `saturation(${this.state.saturation}%)`;
        this._util.percentageRender("spanPercentageSaturatie", "saturation");
      },
    },
    invert: {
      on() {
        const body = document.querySelectorAll(
          "* :not(img):not(#accessibilityMenu *)"
        );
        body.forEach((el) => {
          el.style.filter = `invert(100%)`;
        });
        this.state.isInvert = true;
        this._util.toggleRender("btnInverseazaCulori", true);
      },
      off() {
        const body = document.querySelectorAll("* :not(img)");
        body.forEach((el) => {
          el.style.filter = `invert(0%)`;
        });
        this.state.isInvert = false;
        this._util.toggleRender("btnInverseazaCulori", false);
      },
    },
    backgroundWhite: {
      on() {
        const allElems = document.querySelectorAll(
          "*:not(#accessibilityMenu *):not(#accessibilityMenu)"
        );
        allElems.forEach((elem) => {
          const elStyles = window.getComputedStyle(elem);
          if (!elem.dataset.initialColor) {
            const elColor = elStyles.getPropertyValue("color");
            elem.dataset.initialColor = elColor;
          }
          if (!elem.dataset.initialBackgroundColor) {
            const elBackgroundColor =
              elStyles.getPropertyValue("background-color");
            elem.dataset.initialBackgroundColor = elBackgroundColor;
          }
        });
        allElems.forEach((el) => {
          el.style.color = "black";
          el.style.backgroundColor = "white";
        });
        this._util.toggleRender("btnFundalAlb", true);
        this.state.isBackgroundWhite = true;
      },

      off() {
        const allElems = document.querySelectorAll(
          "*:not(#accessibilityMenu *):not(#accessibilityMenu)"
        );

        allElems.forEach((elem) => {
          elem.style.color = elem.dataset.initialColor;
          elem.style.backgroundColor = elem.dataset.initialBackgroundColor;
        });

        this._util.toggleRender("btnFundalAlb", false);
        this.state.isBackgroundWhite = false;
      },
    },

    reset() {
      this.contrast.reset();
      this.saturation.reset();
      this.invert.off();
      this.backgroundWhite.off();
    },

    _util: {
      percentageRender: (elId, state) => {
        const percentageEl = document.getElementById(elId);
        console.log(this.colorAdjustments.state[state]);
        percentageEl.innerText =
          Math.round(this.colorAdjustments.state[state]) + "%";
      },
      toggleRender: (elId, state) => {
        const toggleBtnEl = document.getElementById(elId);
        if (state) toggleBtnEl.classList.add("on");
        else toggleBtnEl.classList.remove("on");
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

  #dom = {
    init() {
      this.menuMainBtn();
      this.header();
      this.createContentSubmenu();
      this.createColorSubmenu();
    },

    menuMainBtn() {
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
    },

    header() {
      const accessibilityHeader = document.createElement("div");
      accessibilityHeader.classList.add("accessibility-header");

      const languageContainer = document.createElement("div");
      languageContainer.classList.add(
        "accessibility-header__language-container"
      );

      const romanianImg = document.createElement("img");
      romanianImg.src = "./assets/romanian.png";
      romanianImg.alt = "romanian language";

      const englishImg = document.createElement("img");
      englishImg.src = "./assets/english.png";
      englishImg.alt = "english language";

      const languageSlider = document.createElement("span");
      languageSlider.classList.add("accessibility-language__slider");

      languageContainer.appendChild(romanianImg);
      languageContainer.appendChild(englishImg);
      languageContainer.appendChild(languageSlider);

      const titleWrapper = document.createElement("div");
      titleWrapper.classList.add("accessibility-header__title-wrapper");

      const title = document.createElement("span");
      title.classList.add("accessibility-header__title");
      title.textContent = "SETARI ACCESSIBILITATE";

      titleWrapper.appendChild(title);

      const closeBtnWrapper = document.createElement("div");
      closeBtnWrapper.classList.add("accessibility-header__close-btn-wrapper");

      const closeBtn = document.createElement("button");
      closeBtn.classList.add("close-btn");

      const closeBtnImg = document.createElement("img");
      closeBtnImg.classList.add("close-btn-img");
      closeBtnImg.src = "./assets/close.svg";
      closeBtnImg.alt = "";

      closeBtn.appendChild(closeBtnImg);

      closeBtnWrapper.appendChild(closeBtn);

      accessibilityHeader.appendChild(languageContainer);
      accessibilityHeader.appendChild(titleWrapper);
      accessibilityHeader.appendChild(closeBtnWrapper);

      document.getElementById("accessibilityMenu").prepend(accessibilityHeader);
    },

    createContentSubmenu() {
      const contentMenu = document.createElement("div");
      contentMenu.classList.add("accessibility-main__content-adjustments");
      contentMenu.id = "accessibilityContent";

      const contentHeader = document.createElement("div");
      contentHeader.classList.add("accessibility-content__header");

      const span = document.createElement("span");
      span.textContent = "SETARI DE ADJUSTARE CONTINUT";

      const contentResetBtn = document.createElement("div");
      contentResetBtn.classList.add("accessibility-content__reset-btn-wrapper");

      const resetBtn = document.createElement("button");
      resetBtn.classList.add("reset-btn");
      resetBtn.id = "contentResetBtn";

      const resetBtnImg = document.createElement("img");
      resetBtnImg.classList.add("reset-btn-img");
      resetBtnImg.setAttribute("src", "./assets/reset.svg");
      resetBtnImg.setAttribute("alt", "");
      resetBtnImg.id = "contentResetBtnImg";

      resetBtn.appendChild(resetBtnImg);
      contentResetBtn.appendChild(resetBtn);

      contentHeader.appendChild(span);
      contentHeader.appendChild(contentResetBtn);

      const contentSizeWrapper = document.createElement("div");
      contentSizeWrapper.classList.add("accessibility-content-size__wrapper");

      const fontSizeWrapper = document.createElement("div");
      fontSizeWrapper.classList.add("accessibility-font-size__wrapper");

      const lineHeightWrapper = document.createElement("div");
      lineHeightWrapper.classList.add("accessibility-line-height__wrapper");

      const letterSpacingWrapper = document.createElement("div");
      letterSpacingWrapper.classList.add(
        "accessibility-letter-spacing__wrapper"
      );

      const highlightTitlesWrapper = document.createElement("div");
      highlightTitlesWrapper.classList.add(
        "accessibility-underlined-titles__wrapper"
      );

      const highlightLinksWrapper = document.createElement("div");
      highlightLinksWrapper.classList.add(
        "accessibility-underlined-links__wrapper"
      );

      contentMenu.appendChild(contentHeader);
      contentMenu.appendChild(contentSizeWrapper);
      contentMenu.appendChild(fontSizeWrapper);
      contentMenu.appendChild(lineHeightWrapper);
      contentMenu.appendChild(letterSpacingWrapper);
      contentMenu.appendChild(highlightTitlesWrapper);
      contentMenu.appendChild(highlightLinksWrapper);

      const componentContentSize = this.createUpDownComponent(
        "MARIME CONTINUT",
        contentScaleSVG
      );

      const componentFontSizeContainer = this.createUpDownComponent(
        "MARIME FONT",
        fontSizeSVG,
        100 + " %"
      );

      const componentHighlightTitles = this.createToggleComponent(
        "TITLURI EVIDENTIATE",
        underlinedTitlesSVG
      );

      const componentHighlightLinks = this.createToggleComponent(
        "LINKURI EVIDENTIATE",
        underlinedLinksSVG
      );

      const componentLineHeight = this.createUpDownComponent(
        "SPATIERE RANDURI",
        lineHeightSVG,
        100 + " %"
      );

      const componentLetterSpacing = this.createUpDownComponent(
        "SPATIERE LITERE",
        letterSpacingSVG,
        "0 px"
      );

      fontSizeWrapper.appendChild(componentFontSizeContainer);
      contentSizeWrapper.appendChild(componentContentSize);
      lineHeightWrapper.appendChild(componentLineHeight);
      letterSpacingWrapper.appendChild(componentLetterSpacing);

      highlightTitlesWrapper.appendChild(componentHighlightTitles);
      highlightLinksWrapper.appendChild(componentHighlightLinks);

      document.getElementById("accessibilityMain").appendChild(contentMenu);
    },

    createColorSubmenu() {
      const colorContainer = document.createElement("div");
      const headerContainer = document.createElement("div");
      const headerTextSpan = document.createElement("span");
      const resetBtnWrapper = document.createElement("div");
      const resetBtn = document.createElement("button");
      const contrastWrapper = document.createElement("div");
      const invertWrapper = document.createElement("div");
      const saturationWrapper = document.createElement("div");
      const backgroundWhiteWrapper = document.createElement("div");

      colorContainer.classList.add("accessibility-main__colors-adjustments");
      colorContainer.id = "accessibilityColors";
      headerContainer.classList.add("accessibility-color__header");
      resetBtnWrapper.classList.add("accessibility-color__reset-btn-wrapper");

      contrastWrapper.classList.add("accessibility-contrast__wrapper");
      saturationWrapper.classList.add("accessibility-saturation__wrapper");
      invertWrapper.classList.add("accessibility-invert__wrapper");
      backgroundWhiteWrapper.classList.add(
        "accessibility-background-white__wrapper"
      );

      headerTextSpan.textContent = "SETARI DE ADJUSTARE CULOARE";
      resetBtn.classList.add("reset-btn");

      const resetBtnImg = document.createElement("img");
      resetBtnImg.classList.add("reset-btn-img");
      resetBtnImg.setAttribute("src", "./assets/reset.svg");
      resetBtnImg.setAttribute("alt", "");
      resetBtnImg.id = "colorResetBtnImg";

      resetBtn.appendChild(resetBtnImg);

      headerContainer.appendChild(headerTextSpan);
      resetBtnWrapper.appendChild(resetBtn);
      headerContainer.appendChild(resetBtnWrapper);
      colorContainer.appendChild(headerContainer);
      colorContainer.appendChild(contrastWrapper);
      colorContainer.appendChild(saturationWrapper);
      colorContainer.appendChild(invertWrapper);
      colorContainer.appendChild(backgroundWhiteWrapper);

      const componentContrast = this.createUpDownComponent(
        "CONTRAST",
        contrastSVG
      );

      const componentSaturation = this.createUpDownComponent(
        "SATURATIE",
        saturationSVG
      );

      const componentInvert = this.createToggleComponent(
        "INVERSEAZA CULORI",
        invertSVG
      );
      const componentBackgroundWhite = this.createToggleComponent(
        "FUNDAL ALB",
        invertSVG
      );

      contrastWrapper.appendChild(componentContrast);
      saturationWrapper.appendChild(componentSaturation);
      invertWrapper.appendChild(componentInvert);
      backgroundWhiteWrapper.appendChild(componentBackgroundWhite);

      const accessibilityMainCont =
        document.getElementById("accessibilityMain");
      accessibilityMainCont.appendChild(colorContainer);
      return colorContainer;
    },

    createUpDownComponent(name, iconSrc, percentage = "100%") {
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
      buttonPlus.setAttribute("id", `plusBtn${this._util.formatName(name)}`);
      buttonMinus.setAttribute("id", `minusBtn${this._util.formatName(name)}`);
      spanPercentage.setAttribute(
        "id",
        `spanPercentage${this._util.formatName(name)}`
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
    },

    createToggleComponent(name, iconSrc) {
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

      toggleContainer.classList.add(
        "accessibility-component__toggle-container"
      );
      nameContainer.classList.add("toggle__name-container");
      nameWrapper.classList.add("toggle__name-wrapper");
      btnWrapper.classList.add("toggle__btn-wrapper");
      btn.classList.add("toggle__btn");
      btn.id = "btn" + this._util.formatName(name);

      nameWrapper.appendChild(image);
      nameWrapper.appendChild(nameSpan);
      nameContainer.appendChild(image);
      nameContainer.appendChild(nameWrapper);
      btnWrapper.appendChild(btn);
      toggleContainer.appendChild(nameContainer);
      toggleContainer.appendChild(btnWrapper);

      return toggleContainer;
      // document.body.appendChild(toggleContainer);
    },

    _util: {
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
    },
  };

  #controller() {
    const accessibilityContent = document.getElementById(
      "accessibilityContent"
    );
    const accessibilityColors = document.getElementById("accessibilityColors");

    accessibilityContent.addEventListener("click", (e) => {
      const clickedId = e.target.id;

      // RESET
      if (clickedId === "contentResetBtnImg") this.contentAdjustments.reset();

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
      if (clickedId === "btnTitluriEvidentiate") {
        if (!this.contentAdjustments.state.isHighlightTitles) {
          this.contentAdjustments.highlightTitles.on();
        } else {
          this.contentAdjustments.highlightTitles.off();
        }
      }

      // HIGHLIGHT LINKS
      if (clickedId === "btnLinkuriEvidentiate") {
        if (!this.contentAdjustments.state.isHighlightLinks) {
          this.contentAdjustments.highlightLinks.on();
        } else {
          this.contentAdjustments.highlightLinks.off();
        }
      }
    });

    accessibilityColors.addEventListener("click", (e) => {
      const clickedId = e.target.id;

      if (clickedId === "colorResetBtnImg") this.colorAdjustments.reset();

      if (clickedId === "plusBtnContrast")
        this.colorAdjustments.contrast.increase();
      if (clickedId === "minusBtnContrast")
        this.colorAdjustments.contrast.decrease();

      if (clickedId === "plusBtnSaturatie")
        this.colorAdjustments.saturation.increase();
      if (clickedId === "minusBtnSaturatie")
        this.colorAdjustments.saturation.decrease();

      if (clickedId === "btnInverseazaCulori") {
        if (!this.colorAdjustments.state.isInvert) {
          this.colorAdjustments.invert.on();
        } else {
          this.colorAdjustments.invert.off();
        }
      }

      if (clickedId === "btnFundalAlb") {
        if (!this.colorAdjustments.state.isBackgroundWhite) {
          this.colorAdjustments.backgroundWhite.on();
        } else {
          this.colorAdjustments.backgroundWhite.off();
        }
      }
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
      this.contentAdjustments.letterSpacing,
      "reset",
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
    this.#helpersFunc.bindObj(
      this.colorAdjustments.contrast,
      "increase",
      this.colorAdjustments
    );
    this.#helpersFunc.bindObj(
      this.colorAdjustments.contrast,
      "decrease",
      this.colorAdjustments
    );
    this.#helpersFunc.bindObj(
      this.colorAdjustments.contrast,
      "reset",
      this.colorAdjustments
    );
    this.#helpersFunc.bindObj(
      this.colorAdjustments.saturation,
      "increase",
      this.colorAdjustments
    );
    this.#helpersFunc.bindObj(
      this.colorAdjustments.saturation,
      "decrease",
      this.colorAdjustments
    );
    this.#helpersFunc.bindObj(
      this.colorAdjustments.saturation,
      "reset",
      this.colorAdjustments
    );
    this.#helpersFunc.bindObj(
      this.colorAdjustments.invert,
      "on",
      this.colorAdjustments
    );
    this.#helpersFunc.bindObj(
      this.colorAdjustments.invert,
      "off",
      this.colorAdjustments
    );
    this.#helpersFunc.bindObj(
      this.colorAdjustments.backgroundWhite,
      "on",
      this.colorAdjustments
    );
    this.#helpersFunc.bindObj(
      this.colorAdjustments.backgroundWhite,
      "off",
      this.colorAdjustments
    );
  }

  #helpersFunc = {
    bindObj(targetObj, methodName, objToBind) {
      targetObj[methodName] = targetObj[methodName].bind(objToBind);
    },
  };
}

export default new Accessibility();
