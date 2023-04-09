import plusSVG from "./assets/plus.svg";
import minusSVG from "./assets/minus.svg";

import fontSizeSVG from "./assets/font-size.svg";
import contentScaleSVG from "./assets/content-scale.svg";
import letterSpacingSVG from "./assets/letter-spacing.svg";
import lineHeightSVG from "./assets/line-height.svg";
import underlinedTitlesSVG from "./assets/underlined-titles.svg";
import underlinedLinksSVG from "./assets/underlined-links.svg";

import contrastSVG from "./assets/contrast.svg";
import saturationSVG from "./assets/saturation.svg";
import invertSVG from "./assets/invert.svg";

import readingGuidieSVG from "./assets/reading-guide.svg";
import flashlightSVG from "./assets/flashlight.svg";

import "./style/main.scss";

class Accessibility {
  constructor() {
    this.#bindObjects();
  }

  init() {
    this.#dom.init();
    this.#controller.init();
  }

  contentAdjustments = {
    state: {
      contentScale: 1,
      fontSize: 1,
      lineHeight: 1,
      letterSpacing: 0, //px
      isTitlesHighlight: false,
      isLinksHighlight: false,
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
          this._util.percentageRender("spanPercentageFontSizing", "fontSize");
        }
        //
        if (direction === "decrease" && this.state.fontSize > 0.1) {
          this.state.fontSize -= 0.05;
          this._util.percentageRender("spanPercentageFontSizing", "fontSize");
        }
        //
        if (direction === "reset") {
          this.state.fontSize = 1;
          this._util.percentageRender("spanPercentageFontSizing", "fontSize");
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
          this._util.percentageRender("spanPercentageLineHeight", "lineHeight");
        }
        if (direction === "decrease") {
          this.state.lineHeight -= 0.1;
          this._util.percentageRender("spanPercentageLineHeight", "lineHeight");
        }

        if (direction === "reset") {
          this.state.lineHeight = 1;
          this._util.percentageRender("spanPercentageLineHeight", "lineHeight");
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
          "spanPercentageLetterSpacing",
          this.state.letterSpacing
        );
      },
      decrease() {
        // this bind to contentAdjustments
        --this.state.letterSpacing;
        this.letterSpacing._resizeLetterSpacing("decrease");
        this._util.pxRender(
          "spanPercentageLetterSpacing",
          this.state.letterSpacing
        );
      },
      reset() {
        // this bind to contentAdjustments
        console.log(this.state);
        this.state.letterSpacing = 0;
        this.letterSpacing._resizeLetterSpacing("reset");
        this._util.pxRender(
          "spanPercentageLetterSpacing",
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
    titlesHighlight: {
      on() {
        this.state.isTitlesHighlight = true;
        this._util.toggleRender("btnTitlesHighlight", true);
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
        this.state.isTitlesHighlight = false;
        this._util.toggleRender("btnTitlesHighlight", false);
        const headers = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
        headers.forEach((header) => {
          header.style.outline = header.dataset.initialOutline;
        });
      },
    },
    linksHighlight: {
      on() {
        this.state.isLinksHighlight = true;
        this._util.toggleRender("btnLinksHighlight", true);
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
        this.state.isLinksHighlight = false;
        this._util.toggleRender("btnLinksHighlight", false);
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
      this.titlesHighlight.off();
      this.linksHighlight.off();
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
        this._util.percentageRender("spanPercentageSaturation", "saturation");
      },
      decrease() {
        if (this.state.saturation <= 10) return;
        const body = document.querySelector("body :not(#accessibilityMenu)");
        this.state.saturation -= 10;
        body.style.filter = `saturate(${this.state.saturation}%)`;
        this._util.percentageRender("spanPercentageSaturation", "saturation");
      },
      reset() {
        this.state.saturation = 100;
        const body = document.querySelector("body");
        body.style.filter = `saturation(${this.state.saturation}%)`;
        this._util.percentageRender("spanPercentageSaturation", "saturation");
      },
    },
    invert: {
      on() {
        const body = document.querySelectorAll(
          "body * :not(img):not(#accessibilityMenu *)"
        );
        body.forEach((el) => {
          el.style.filter = `invert(100%)`;
        });
        this.state.isInvert = true;
        this._util.toggleRender("btnColorsInversed", true);
      },
      off() {
        const body = document.querySelectorAll("body * :not(img)");
        body.forEach((el) => {
          el.style.filter = `invert(0%)`;
        });
        this._util.toggleRender("btnColorsInversed", false);
        this.state.isInvert = false;
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
        this._util.toggleRender("btnWhiteBackground", true);
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

        this._util.toggleRender("btnWhiteBackground", false);
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
    state: {
      isFlashlight: false,
      isReadingGuide: false,
      isHideImages: false,
    },

    flashlight: {
      on() {
        const maskEl = document.querySelector(
          ".accessibility-flashlight__mask"
        );
        const holeEl = document.querySelector(
          ".accessibility-flashlight__hole"
        );

        document.addEventListener("mousemove", (e) => {
          this.util.readingMask(maskEl, holeEl, e);
        });

        maskEl.style.display = "block";

        this.state.isFlashlight = true;
        this.util.toggleRender("btnFlashlight", true);
      },
      off() {
        const mask = document.querySelector(".accessibility-flashlight__mask");
        mask.style.display = "none";
        this.state.isFlashlight = false;
        this.util.toggleRender("btnFlashlight", false);
      },
    },

    readingGuide: {
      on() {
        this.state.isReadingGuide = true;
        this.util.toggleRender("btnReadingGuide", true);
        const cursorLine = document.getElementById("accessibilityCursorLine");
        cursorLine.classList.remove("accessibility-hidden");

        document.addEventListener("mousemove", function (event) {
          cursorLine.style.left = event.pageX - 150 + "px";
          cursorLine.style.top = event.pageY - 15 + "px";
        });
      },
      off() {
        this.state.isReadingGuide = false;
        this.util.toggleRender("btnReadingGuide", false);
        const cursorLine = document.getElementById("accessibilityCursorLine");
        cursorLine.classList.add("accessibility-hidden");
      },
    },

    hideImages: {
      on() {
        const imgs = document.querySelectorAll("img:not(.accessibility__img)");
        imgs.forEach((img) => {
          if (!img.dataset.initialImgDisplay) {
            const elStyles = window.getComputedStyle(img);
            const elVisibility = elStyles.getPropertyValue("visibility");
            img.dataset.initialImgVisibility = elVisibility;
          }
          img.style.visibility = "hidden";
        });
        this.state.isHideImages = true;
        this.util.toggleRender("btnHideImages", true);
      },
      off() {
        const imgs = document.querySelectorAll("img:not(.accessibility__img)");
        imgs.forEach((img) => {
          img.style.visibility = img.dataset.initialImgVisibility;
        });
        this.state.isHideImages = false;
        this.util.toggleRender("btnHideImages", false);
      },
    },

    util: {
      toggleRender: (elId, state) => {
        const toggleBtnEl = document.getElementById(elId);
        if (state) toggleBtnEl.classList.add("on");
        else toggleBtnEl.classList.remove("on");
      },
      readingMask(mask, hole, e) {
        hole.style.top = `${e.clientY - hole.offsetHeight / 2}px`;
        const y = e.clientY - hole.offsetHeight / 2;

        mask.style.clipPath = `polygon(
            0% 0%,
            0% 100%,
            ${hole.offsetLeft}px 100%,
            ${hole.offsetLeft}px ${y}px,
            ${hole.offsetLeft + hole.offsetWidth}px ${y}px,
            ${hole.offsetLeft + hole.offsetWidth}px ${y + hole.offsetHeight}px,
            ${hole.offsetLeft}px ${y + hole.offsetHeight}px,
            ${hole.offsetLeft}px 100%,
            100% 100%,
            100% 0%
          )`;
      },
    },
  };

  #dom = {
    state: {
      lang: "ro",
    },

    init() {
      this.menuMainBtn();
      this.header();
      this.createContentSubmenu();
      this.createColorSubmenu();
      this.createToolsSubmenu();
      this.createCursorLine();
      this.createReadingMask();
      this._util.setLang();
    },

    menuMainBtn() {
      const div = document.createElement("div");
      div.setAttribute("id", "accessibilityBtnWrapper");

      const button = document.createElement("button");
      button.setAttribute("id", "accessibilityBtn");

      const img = document.createElement("img");
      img.setAttribute("id", "accessibilityBtnIcon");
      img.setAttribute("class", "accessibility__img");
      img.setAttribute("src", "./assets/ion_accessibility.svg");
      img.setAttribute("alt", "accessibility button");

      button.appendChild(img);
      div.appendChild(button);
      document.body.appendChild(div);
    },

    header() {
      const accessibilityHeader = document.createElement("div");
      accessibilityHeader.classList.add("accessibility-header");
      accessibilityHeader.id = "accessibilityHeader";

      const languageContainer = document.createElement("div");
      languageContainer.classList.add(
        "accessibility-header__language-container"
      );
      languageContainer.id = "accessibilityLanguageContainer";

      const romanianImg = document.createElement("img");
      romanianImg.src = "./assets/romanian.png";
      romanianImg.alt = "romanian language";
      romanianImg.setAttribute("class", "accessibility__img");

      const englishImg = document.createElement("img");
      englishImg.src = "./assets/english.png";
      englishImg.alt = "english language";
      englishImg.setAttribute("class", "accessibility__img");

      const languageSlider = document.createElement("span");
      languageSlider.setAttribute(
        "class",
        `accessibility-language__slider accessibility-language__slider--${this.state.lang}`
      );
      languageSlider.id = "accessibilityLangSlider";

      languageContainer.appendChild(romanianImg);
      languageContainer.appendChild(englishImg);
      languageContainer.appendChild(languageSlider);

      const titleWrapper = document.createElement("div");
      titleWrapper.classList.add("accessibility-header__title-wrapper");

      const title = document.createElement("span");
      title.classList.add("accessibility-header__title");
      title.id = "accessibilityTitle";
      title.textContent = "SETARI ACCESSIBILITATE";

      titleWrapper.appendChild(title);

      const closeBtnWrapper = document.createElement("div");
      closeBtnWrapper.classList.add("accessibility-header__close-btn-wrapper");

      const closeBtn = document.createElement("button");
      closeBtn.classList.add("close-btn");
      closeBtn.id = "accessibilityCloseBtn";

      const closeBtnImg = document.createElement("img");
      closeBtnImg.classList.add("close-btn-img");
      closeBtnImg.src = "./assets/close.svg";
      closeBtnImg.alt = "accessibility button image";
      closeBtnImg.id = "accessbilityCloseBtnImg";
      closeBtnImg.setAttribute("class", "accessibility__img close-btn-img");

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
      span.id = "spanNameContentAdjusting";
      span.textContent = "SETARI DE ADJUSTARE CONTINUT";

      const contentResetBtn = document.createElement("div");
      contentResetBtn.classList.add("accessibility-content__reset-btn-wrapper");

      const resetBtn = document.createElement("button");
      resetBtn.classList.add("reset-btn");
      resetBtn.id = "contentResetBtn";

      const resetBtnImg = document.createElement("img");
      resetBtnImg.setAttribute("src", "./assets/reset.svg");
      resetBtnImg.setAttribute("alt", "reset content button");
      resetBtnImg.setAttribute("class", "accessibility__img reset-btn-img");
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
        "CONTENT SCALING",
        contentScaleSVG
      );

      const componentFontSizeContainer = this.createUpDownComponent(
        "FONT SIZING",
        fontSizeSVG,
        100 + " %"
      );

      const componentHighlightTitles = this.createToggleComponent(
        "TITLES HIGHLIGHT",
        underlinedTitlesSVG
      );

      const componentHighlightLinks = this.createToggleComponent(
        "LINKS HIGHLIGHT",
        underlinedLinksSVG
      );

      const componentLineHeight = this.createUpDownComponent(
        "LINE HEIGHT",
        lineHeightSVG,
        100 + " %"
      );

      const componentLetterSpacing = this.createUpDownComponent(
        "LETTER SPACING",
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
      const spanNameColorAdjustments = document.createElement("span");
      const resetBtnWrapper = document.createElement("div");
      const resetBtn = document.createElement("button");
      const contrastWrapper = document.createElement("div");
      const invertWrapper = document.createElement("div");
      const saturationWrapper = document.createElement("div");
      const backgroundWhiteWrapper = document.createElement("div");
      const resetBtnImg = document.createElement("img");

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

      spanNameColorAdjustments.id = `spanNameColorAdjustments`;

      spanNameColorAdjustments.textContent = "SETARI DE ADJUSTARE CULOARE";
      resetBtn.classList.add("reset-btn");
      resetBtn.id = "accessibilityColorResetBtn";

      resetBtnImg.classList.add("reset-btn-img");
      resetBtnImg.setAttribute("src", "./assets/reset.svg");
      resetBtnImg.setAttribute("alt", "reset button");
      resetBtnImg.setAttribute("class", "accessibility__img reset-btn-img");
      resetBtnImg.id = "colorResetBtnImg";

      resetBtn.appendChild(resetBtnImg);

      headerContainer.appendChild(spanNameColorAdjustments);
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
        "SATURATION",
        saturationSVG
      );

      const componentInvert = this.createToggleComponent(
        "COLORS INVERSED",
        invertSVG
      );
      const componentBackgroundWhite = this.createToggleComponent(
        "WHITE BACKGROUND",
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

    createToolsSubmenu() {
      const accessibilityTools = document.createElement("div");
      accessibilityTools.id = "accessibilityTools";
      accessibilityTools.classList.add("accessibility-main__tools");

      const toolsHeader = document.createElement("div");
      toolsHeader.classList.add("accessibility-tools__header");

      const spanNameTools = document.createElement("span");
      spanNameTools.id = "spanNameTools";
      spanNameTools.textContent = "UNELTE";

      const resetBtnWrapper = document.createElement("div");
      resetBtnWrapper.classList.add("accessibility-tools__reset-btn-wrapper");

      const resetBtn = document.createElement("button");
      resetBtn.classList.add("reset-btn");
      resetBtn.id = "accessibilityToolsResetBtn";

      const resetBtnImg = document.createElement("img");
      resetBtnImg.setAttribute("class", "accessibility__img reset-btn-img");
      resetBtnImg.src = "./assets/reset.svg";
      resetBtnImg.alt = "reset tools button";
      resetBtnImg.id = "toolsResetBtnImg";

      resetBtn.appendChild(resetBtnImg);
      resetBtnWrapper.appendChild(resetBtn);

      toolsHeader.appendChild(spanNameTools);
      toolsHeader.appendChild(resetBtnWrapper);

      const accessibilityReadingGuideWrapper = document.createElement("div");
      accessibilityReadingGuideWrapper.classList.add(
        "accessibility-reading-guide__wrapper"
      );

      const accessibilityFlashlightWrapper = document.createElement("div");
      accessibilityFlashlightWrapper.classList.add(
        "accessibility-flashlight__wrapper"
      );

      const accessibilityHideImagesWrapper = document.createElement("div");
      accessibilityHideImagesWrapper.classList.add(
        "accessibility-hide-images__wrapper"
      );

      accessibilityTools.appendChild(toolsHeader);
      accessibilityTools.appendChild(accessibilityReadingGuideWrapper);
      accessibilityTools.appendChild(accessibilityFlashlightWrapper);
      accessibilityTools.appendChild(accessibilityHideImagesWrapper);

      const readingGuideComponent = this.createToggleComponent(
        "READING GUIDE",
        readingGuidieSVG
      );

      const flashlightComponent = this.createToggleComponent(
        "FLASHLIGHT",
        flashlightSVG
      );

      const hideImagesComponent = this.createToggleComponent(
        "HIDE IMAGES",
        flashlightSVG
      );

      accessibilityReadingGuideWrapper.appendChild(readingGuideComponent);
      accessibilityFlashlightWrapper.appendChild(flashlightComponent);
      accessibilityHideImagesWrapper.appendChild(hideImagesComponent);

      document
        .getElementById("accessibilityMain")
        .appendChild(accessibilityTools);
    },

    createUpDownComponent(name, iconSrc, percentage = "100%") {
      const componentContainer = document.createElement("div");
      const divNameContainer = document.createElement("div");
      const img = document.createElement("img");
      const spanName = document.createElement("span");
      const divButtonsContainer = document.createElement("div");
      const divPlusBtnWrapper = document.createElement("div");
      const buttonPlus = document.createElement("button");
      const imgPlus = document.createElement("img");
      const spanPercentage = document.createElement("span");
      const divMinusBtnWrapper = document.createElement("div");
      const buttonMinus = document.createElement("button");
      const imgMinus = document.createElement("img");

      componentContainer.setAttribute(
        "class",
        "accessibility-component__up-down-buttons"
      );
      divNameContainer.setAttribute("class", "up-down-buttons__name-container");
      img.setAttribute("class", "accessibility__img up-down-buttons__img");
      img.setAttribute("src", iconSrc);

      spanName.setAttribute("id", `spanName${this._util.formatName(name)}`);
      buttonPlus.setAttribute("id", `plusBtn${this._util.formatName(name)}`);
      imgPlus.setAttribute(
        "class",
        "accessibility__img up-down-buttons__plus-btn-img"
      );
      imgPlus.setAttribute("id", `plusBtnImg${this._util.formatName(name)}`);
      imgMinus.setAttribute(
        "class",
        "accessibility__img up-down-buttons__minus-btn-img"
      );
      imgMinus.setAttribute("id", `minusBtnImg${this._util.formatName(name)}`);
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
      imgPlus.src = plusSVG;
      imgMinus.src = minusSVG;
      spanPercentage.innerText = percentage;
      // spanMinus.innerText = "-";

      buttonPlus.appendChild(imgPlus);
      buttonMinus.appendChild(imgMinus);
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
      const toggleContainer = document.createElement("div");
      const nameContainer = document.createElement("div");
      const img = document.createElement("img");
      const nameWrapper = document.createElement("div");
      const nameSpan = document.createElement("span");
      const btnWrapper = document.createElement("div");
      const btn = document.createElement("button");

      img.src = iconSrc;
      img.alt = "image component";
      img.setAttribute("class", "accessibility__img");

      const [nameTop, nameBottom] = name.split(" ");
      nameSpan.innerHTML = `${nameTop} <br /> ${
        nameBottom === undefined ? "" : nameBottom
      }`;

      toggleContainer.classList.add(
        "accessibility-component__toggle-container"
      );
      nameContainer.classList.add("toggle__name-container");
      nameWrapper.classList.add("toggle__name-wrapper");
      btnWrapper.classList.add("toggle__btn-wrapper");
      btn.classList.add("toggle__btn");
      nameSpan.id = `spanName${this._util.formatName(name)}`;
      btn.id = "btn" + this._util.formatName(name);

      nameWrapper.appendChild(img);
      nameWrapper.appendChild(nameSpan);
      nameContainer.appendChild(img);
      nameContainer.appendChild(nameWrapper);
      btnWrapper.appendChild(btn);
      toggleContainer.appendChild(nameContainer);
      toggleContainer.appendChild(btnWrapper);

      return toggleContainer;
    },

    ////////////
    createCursorLine() {
      const cursorLine = document.createElement("div");
      cursorLine.setAttribute(
        "class",
        "accessibility-tools__cursor-line accessibility-hidden"
      );
      cursorLine.id = "accessibilityCursorLine";
      document.body.appendChild(cursorLine);
    },

    createReadingMask() {
      var maskDiv = document.createElement("div");
      maskDiv.classList.add("accessibility-flashlight__mask");

      var holeDiv = document.createElement("div");
      holeDiv.classList.add("accessibility-flashlight__hole");

      maskDiv.appendChild(holeDiv);
      document.querySelector("body").appendChild(maskDiv);
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
      setLang(lang = this.state.lang) {
        const accessibilityTitle =
          document.getElementById("accessibilityTitle");
        const spanNameContentAdjusting = document.getElementById(
          "spanNameContentAdjusting"
        );
        const spanNameContentScaling = document.getElementById(
          "spanNameContentScaling"
        );
        const spanNameFontSizing =
          document.getElementById("spanNameFontSizing");
        const spanNameLineHeight =
          document.getElementById("spanNameLineHeight");
        const spanNameLetterSpacing = document.getElementById(
          "spanNameLetterSpacing"
        );
        const spanNameTitlesHighlight = document.getElementById(
          "spanNameTitlesHighlight"
        );
        const spanNameLinksHighlight = document.getElementById(
          "spanNameLinksHighlight"
        );
        const accessibilityLangSlider = document.getElementById(
          "accessibilityLangSlider"
        );

        // colors
        const spanNameColorAdjustments = document.getElementById(
          "spanNameColorAdjustments"
        );
        const spanNameContrast = document.getElementById("spanNameContrast");
        const spanNameSaturation =
          document.getElementById("spanNameSaturation");
        const spanNameColorsInversed = document.getElementById(
          "spanNameColorsInversed"
        );
        const spanNameWhiteBackground = document.getElementById(
          "spanNameWhiteBackground"
        );
        //
        if (lang === "ro") {
          this.state.lang = "ro";

          accessibilityTitle.innerText = "SETARI ACCESIBILITATE";
          spanNameContentAdjusting.innerText = "ADJUSTARE CONTINUT";
          //content submenu
          spanNameContentScaling.innerText = "SCALARE CONTINUT";
          spanNameFontSizing.innerText = "MARIME FONT";
          spanNameLineHeight.innerText = "SPATIERE RANDURI";
          spanNameLetterSpacing.innerText = "SPATIERE LITERE";
          spanNameTitlesHighlight.innerText = "TITLURI EVIDENTIATE";
          spanNameLinksHighlight.innerText = "LINKURI EVIDENTIATE";

          //colors submenu
          spanNameColorAdjustments.innerText = "ADJUSTARE CULORI";
          spanNameContrast.innerText = "CONTRAST";
          spanNameSaturation.innerText = "SATURATIE";
          spanNameColorsInversed.innerText = "INVERSARE CULORI";
          spanNameWhiteBackground.innerText = "FUNDAL ALB";

          accessibilityLangSlider.classList.remove(
            "accessibility-language__slider--eng"
          );
          accessibilityLangSlider.classList.add(
            "accessibility-language__slider--ro"
          );
        }

        if (lang === "eng") {
          this.state.lang = "eng";

          accessibilityTitle.innerText = "ACCESSIBILITY SETTINGS";
          spanNameContentAdjusting.innerText = "CONTENT ADJUSTING";
          //content submenu
          spanNameContentScaling.innerText = "CONTENT SCALING";
          spanNameFontSizing.innerText = "FONT SIZING";
          spanNameLineHeight.innerText = "LINE HEIGHT";
          spanNameLetterSpacing.innerText = "LETTER SPACING";
          spanNameTitlesHighlight.innerText = "TITLES HIGHLIGHT";
          spanNameLinksHighlight.innerText = "LINKS HIGHLIGHT";

          //colors submenu
          spanNameColorAdjustments.innerText = "COLORS ADJUSTING";
          spanNameContrast.innerText = "CONTRAST";
          spanNameSaturation.innerText = "SATURATION";
          spanNameColorsInversed.innerText = "COLORS INVERSED";
          spanNameWhiteBackground.innerText = "WHITE BACKGROUND";

          accessibilityLangSlider.classList.remove(
            "accessibility-language__slider--ro"
          );
          accessibilityLangSlider.classList.add(
            "accessibility-language__slider--eng"
          );
        }
      },
    },
  };

  #controller = {
    init() {
      this.main();
      this.contentAdjusting();
      this.colorAdjusting();
      this.tools();
    },

    //prettier-ignore
    main: () => {
      const accessibilityMenu = document.getElementById("accessibilityMenu");
      const accessibilityCloseBtn = document.getElementById("accessibilityCloseBtn");
      const accessibilityBtn = document.getElementById('accessibilityBtn')
      const accessibilityLanguageContainer = document.getElementById('accessibilityLanguageContainer')

      accessibilityBtn.addEventListener('click', () => {
        accessibilityMenu.style.display = "block"
      })

      accessibilityCloseBtn.addEventListener('click', () => {
        accessibilityMenu.style.display = "none";
      })  

      accessibilityLanguageContainer.addEventListener("click", () => {
          this.#dom.state.lang === "eng" ? 
          this.#dom._util.setLang("ro") :
          this.#dom._util.setLang("eng")
        });
    },

    //bind this -> contentAdjustments
    //prettier-ignore
    contentAdjusting() {
      const plusBtnFontSizing = document.getElementById("plusBtnFontSizing");
      const minusBtnFontSizing = document.getElementById("minusBtnFontSizing");
      const plusBtnLineHeight = document.getElementById("plusBtnLineHeight");
      const minusBtnLineHeight = document.getElementById("minusBtnLineHeight");
      const plusBtnLetterSpacing = document.getElementById("plusBtnLetterSpacing");
      const minusBtnLetterSpacing = document.getElementById("minusBtnLetterSpacing");
      const btnTitlesHighlight = document.getElementById("btnTitlesHighlight");
      const btnLinksHighlight = document.getElementById("btnLinksHighlight");
      const contentResetBtn = document.getElementById('contentResetBtn')

      contentResetBtn.addEventListener('click', () => this.reset())

      plusBtnFontSizing.addEventListener("click", () => this.fontSizing.increase())
      minusBtnFontSizing.addEventListener("click", () => this.fontSizing.decrease())
    
      plusBtnLineHeight.addEventListener("click", () => this.lineHeight.increase());
      minusBtnLineHeight.addEventListener("click", () => this.lineHeight.decrease());

      plusBtnLetterSpacing.addEventListener("click", () => this.letterSpacing.increase());
      minusBtnLetterSpacing.addEventListener("click", () => this.letterSpacing.decrease())

      btnTitlesHighlight.addEventListener("click", () => {
        this.state.isTitlesHighlight ? this.titlesHighlight.off() : this.titlesHighlight.on();        
      });

      btnLinksHighlight.addEventListener("click", () => {
        this.state.isLinksHighlight ? this.linksHighlight.off() : this.linksHighlight.on();
      });
    },

    //bind this -> colorAdjustments
    //prettier-ignore
    colorAdjusting() {
      const btnResetColor = document.getElementById('accessibilityColorResetBtn')
      const btnPlusContrast = document.getElementById("plusBtnContrast");
      const btnMinusContrast = document.getElementById("minusBtnContrast");
      const btnPlusSaturation = document.getElementById('plusBtnSaturation')
      const btnMinusSaturation = document.getElementById('minusBtnSaturation')
      const btnInversedColors = document.getElementById('btnColorsInversed') 
      const btnBackgroundWhite = document.getElementById('btnWhiteBackground')

      btnResetColor.addEventListener('click', () => this.reset())

      btnPlusContrast.addEventListener('click', () => this.contrast.increase())
      btnMinusContrast.addEventListener('click', () => this.contrast.decrease())

      btnPlusSaturation.addEventListener('click', () => this.saturation.increase())
      btnMinusSaturation.addEventListener('click', () => this.saturation.decrease())

      btnInversedColors.addEventListener('click', () => {
        this.state.isInvert ?  this.invert.off() : this.invert.on()                
      })

      btnBackgroundWhite.addEventListener('click', () => {
         this.state.isBackgroundWhite ? this.backgroundWhite.off() : this.backgroundWhite.on()              
      })
    },

    //bind this -> tools
    //prettier-ignore
    tools() {
      const btnReadingGuide = document.getElementById('btnReadingGuide')
      const btnFlashlight = document.getElementById('btnFlashlight')
      const btnHideImages = document.getElementById('btnHideImages')

      btnReadingGuide.addEventListener('click', () => {
        this.state.isReadingGuide ?
        this.readingGuide.off() :
        this.readingGuide.on()
      })

      btnFlashlight.addEventListener('click', () => {
        this.state.isFlashlight ?
        this.flashlight.off() :
        this.flashlight.on()     
      })    
      
      btnHideImages.addEventListener('click', () => {
        this.state.isHideImages ?
        this.hideImages.off() :
        this.hideImages.on() 
      })
    },
  };

  //prettier-ignore
  #bindObjects() {
    this.#helpersFunc.bindObj(this.contentAdjustments.fontSizing,"_resizeFont",this.contentAdjustments);
    this.#helpersFunc.bindObj(this.contentAdjustments.lineHeight,"_resizeLineHeight",this.contentAdjustments);
    this.#helpersFunc.bindObj(this.contentAdjustments.letterSpacing,"increase",this.contentAdjustments);
    this.#helpersFunc.bindObj(this.contentAdjustments.letterSpacing,"decrease",this.contentAdjustments);
    this.#helpersFunc.bindObj(this.contentAdjustments.letterSpacing,"reset",this.contentAdjustments);
    this.#helpersFunc.bindObj(this.contentAdjustments.titlesHighlight,"on",this.contentAdjustments);
    this.#helpersFunc.bindObj(this.contentAdjustments.titlesHighlight,"off",this.contentAdjustments);
    this.#helpersFunc.bindObj(this.contentAdjustments.linksHighlight,"on",this.contentAdjustments);
    this.#helpersFunc.bindObj(this.contentAdjustments.linksHighlight,"off",this.contentAdjustments);
    
    this.#helpersFunc.bindObj(this.colorAdjustments.contrast,"increase",this.colorAdjustments);
    this.#helpersFunc.bindObj(this.colorAdjustments.contrast,"decrease",this.colorAdjustments);
    this.#helpersFunc.bindObj(this.colorAdjustments.contrast,"reset",this.colorAdjustments);
    this.#helpersFunc.bindObj(this.colorAdjustments.saturation,"increase",this.colorAdjustments);
    this.#helpersFunc.bindObj(this.colorAdjustments.saturation,"decrease",this.colorAdjustments);
    this.#helpersFunc.bindObj(this.colorAdjustments.saturation,"reset",this.colorAdjustments);
    this.#helpersFunc.bindObj(this.colorAdjustments.invert,"on",this.colorAdjustments);
    this.#helpersFunc.bindObj(this.colorAdjustments.invert,"off",this.colorAdjustments);
    this.#helpersFunc.bindObj(this.colorAdjustments.backgroundWhite,"on",this.colorAdjustments);
    this.#helpersFunc.bindObj(this.colorAdjustments.backgroundWhite,"off",this.colorAdjustments);
    
    this.#helpersFunc.bindObj(this.tools.readingGuide,"on",this.tools);
    this.#helpersFunc.bindObj(this.tools.readingGuide,"off",this.tools);
    this.#helpersFunc.bindObj(this.tools.flashlight,"on",this.tools);
    this.#helpersFunc.bindObj(this.tools.flashlight,"off",this.tools);
    this.#helpersFunc.bindObj(this.tools.hideImages,"on",this.tools);
    this.#helpersFunc.bindObj(this.tools.hideImages,"off",this.tools);
    
    this.#helpersFunc.bindObj(this.#dom._util, "setLang",this.#dom);

    this.#helpersFunc.bindObj(this.#controller,"contentAdjusting",this.contentAdjustments);  
    this.#helpersFunc.bindObj(this.#controller,"colorAdjusting",this.colorAdjustments);   
    this.#helpersFunc.bindObj(this.#controller,"tools",this.tools);   
  }

  #helpersFunc = {
    bindObj(targetObj, methodName, objToBind) {
      targetObj[methodName] = targetObj[methodName].bind(objToBind);
    },
  };
}

export default new Accessibility();
