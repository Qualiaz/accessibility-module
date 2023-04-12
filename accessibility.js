import "./style/main.scss";

class Accessibility {
  constructor() {
    this.#bindObjects();
  }

  init() {
    this.#dom.init();
    this.#controller.init();
    this.#setTheme("dark");
    this.#helpersFunc.wrapBody();
  }

  contentAdjustments = {
    state: {
      contentScale: 100, // %
      fontSize: 1,
      lineHeight: 1,
      letterSpacing: 0, // px
      isTitlesHighlight: false,
      isLinksHighlight: false,
    },
    contentScaling: {
      //tba
      increase() {
        this.resizeContent("increase");
      },

      decrease() {
        this.resizeContent("decrease");
      },

      resizeContent(direction) {
        const bodyWrapper = document.getElementById("bodyWrapper");
        if (direction === "increase") this.state.contentScale += 5;
        if (direction === "decrease") this.state.contentScale -= 5;
        //prettier-ignore
        this._util.percentageRender('spanPercentageContentScaling', 'contentScale', false)
        bodyWrapper.style.setProperty("zoom", `${this.state.contentScale}%`);
      },
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
        const bodyWrapper = document.getElementById("bodyWrapper");
        const texts = bodyWrapper.querySelectorAll("p, h1, h2, h3, h4, h5, h6");
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
        const bodyWrapper = document.getElementById("bodyWrapper");
        const texts = bodyWrapper.querySelectorAll("p, h1,h2,h3,h4,h5,h6,span");
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
        const headers = document.querySelectorAll("h1, h2, h3, h4, h5 ,h6");
        headers.forEach((header) => {
          const styles = window.getComputedStyle(header);
          const outline = styles.outline;

          if (!header.dataset.initialOutline) {
            header.dataset.initialOutline = outline;
          }

          header.style.outline = "2px solid #a81a2d";
        });

        this.state.isTitlesHighlight = true;
        this._util.toggleRender("btnTitlesHighlight", true);
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
        const anchors = document.querySelectorAll("a");
        anchors.forEach((anchor) => {
          const styles = window.getComputedStyle(anchor);
          const outline = styles.outline;

          if (!anchor.dataset.initialOutline) {
            anchor.dataset.initialOutline = outline;
          }

          anchor.style.outline = "2px solid #1744c0";
        });

        this.state.isLinksHighlight = true;
        this._util.toggleRender("btnLinksHighlight", true);
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
      percentageRender: (elId, state, isTimes100 = true) => {
        const percentageEl = document.getElementById(elId);
        if (!isTimes100)
          percentageEl.innerText =
            Math.round(this.contentAdjustments.state[state]) + "%";
        else
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
        if (this.state.saturation <= 0) return;
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
        const body = document.querySelector("#bodyWrapper");
        const imgs = body.querySelectorAll("img");

        body.style.filter = `invert(100%)`;
        imgs.forEach((img) => {
          img.style.filter = `invert(100%)`;
        });

        this.state.isInvert = true;
        this._util.toggleRender("btnColorsInversed", true);
      },
      off() {
        const body = document.querySelector("#bodyWrapper");
        const imgs = body.querySelectorAll("img");

        body.style.filter = `invert(0%)`;
        imgs.forEach((img) => {
          img.style.filter = `invert(0%)`;
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
      isScreenReader: false,
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
        this.util.toggleRender("btnHiddenImages", true);
      },
      off() {
        const imgs = document.querySelectorAll("img:not(.accessibility__img)");
        imgs.forEach((img) => {
          img.style.visibility = img.dataset.initialImgVisibility;
        });
        this.state.isHideImages = false;
        this.util.toggleRender("btnHiddenImages", false);
      },
    },

    screenReader: {
      // this -> most outer object, need lang dom state
      on: () => {
        let msg = new SpeechSynthesisUtterance();
        const setVoice = () => {
          const { romanianVoice, englishVoice } = this.tools.util.getVoices();
          msg.voice =
            this.#dom.state.lang === "ro" ? romanianVoice : englishVoice;
        };

        speechSynthesis.onvoiceschanged !== undefined
          ? (speechSynthesis.onvoiceschanged = setVoice)
          : setVoice();

        document.addEventListener("langChanged", () => {
          setVoice();
        });

        const elems = document.querySelectorAll("*");
        let isSpeaking = false;

        const clickHandler = function (e) {
          if (!isSpeaking) {
            if (e.target.tagName === "IMG") {
              msg.text = e.target.alt;
            } else {
              msg.text = e.target.innerText;
            }
            this.style.outline = "2px solid yellow";
            speechSynthesis.speak(msg);
            isSpeaking = true;

            let interval = setInterval(() => {
              if (!speechSynthesis.speaking) {
                this.style.removeProperty("outline");
                isSpeaking = false;
                clearInterval(interval);
              }
            });
          }
        };

        elems.forEach((elem) => {
          elem.addEventListener("click", clickHandler);
          elem.addEventListener("focus", clickHandler);
        });

        this.tools.util.state.clickHandler = clickHandler;
        this.tools.util.state.elems = elems;

        this.tools.state.isScreenReader = true;
        this.tools.util.toggleRender("btnScreenReader", true);
      },

      off() {
        this.util.state.elems.forEach((elem) => {
          elem.removeEventListener("click", this.util.state.clickHandler);
        });

        speechSynthesis.cancel();
        this.state.isScreenReader = false;
        this.util.toggleRender("btnScreenReader", false);
      },
    },

    reset() {
      this.flashlight.off();
      this.readingGuide.off();
      this.hideImages.off();
      this.screenReader.off();
    },

    util: {
      state: {
        // used for screen reader
        clickHandler: null,
        elems: null,
      },
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
      getVoices() {
        let voices = speechSynthesis.getVoices();
        let romanianVoice = voices.find((voice) => voice.lang === "ro-RO");
        let englishVoice = voices.find((voice) => voice.lang === "en-EN");
        return { romanianVoice, englishVoice };
      },
    },
  };

  #dom = {
    state: {
      lang: "ro",
      theme: "dark",
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

      const themeBtnWrapper = document.createElement("button");
      themeBtnWrapper.setAttribute("class", "accessibility-header__theme-btn");
      themeBtnWrapper.id = "accessibilityThemeBtn";

      const closeBtnWrapper = document.createElement("div");
      closeBtnWrapper.classList.add("accessibility-header__close-btn-wrapper");

      const closeBtn = document.createElement("button");
      closeBtn.classList.add("close-btn");
      closeBtn.id = "accessibilityCloseBtn";
      closeBtn.insertAdjacentHTML("afterbegin", this.icons.close);

      closeBtnWrapper.appendChild(closeBtn);

      accessibilityHeader.appendChild(languageContainer);
      accessibilityHeader.appendChild(titleWrapper);
      accessibilityHeader.appendChild(themeBtnWrapper);
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
      span.setAttribute("class", "accessibility-component__name");
      span.textContent = "SETARI DE ADJUSTARE CONTINUT";

      const contentResetBtn = document.createElement("div");
      contentResetBtn.classList.add("accessibility-content__reset-btn-wrapper");

      const resetBtn = document.createElement("button");
      resetBtn.classList.add("reset-btn");
      resetBtn.id = "contentResetBtn";
      resetBtn.insertAdjacentHTML("afterbegin", this.icons.reset);

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
        this.icons.contentScale
      );

      const componentFontSizeContainer = this.createUpDownComponent(
        "FONT SIZING",
        this.icons.fontSize,
        100 + " %"
      );

      const componentHighlightTitles = this.createToggleComponent(
        "TITLES HIGHLIGHT",
        this.icons.titlesHighlight
      );

      const componentHighlightLinks = this.createToggleComponent(
        "LINKS HIGHLIGHT",
        this.icons.linksHighlight
      );

      const componentLineHeight = this.createUpDownComponent(
        "LINE HEIGHT",
        this.icons.lineHeight,
        100 + " %"
      );

      const componentLetterSpacing = this.createUpDownComponent(
        "LETTER SPACING",
        this.icons.letterSpacing,
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
      spanNameColorAdjustments.setAttribute(
        "class",
        "accessibility-component__name"
      );
      resetBtn.classList.add("reset-btn");
      resetBtn.id = "accessibilityColorResetBtn";
      resetBtn.insertAdjacentHTML("afterbegin", this.icons.reset);

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
        this.icons.contrast
      );

      const componentSaturation = this.createUpDownComponent(
        "SATURATION",
        this.icons.saturation
      );

      const componentInvert = this.createToggleComponent(
        "COLORS INVERSED",
        this.icons.inversedColors
      );
      const componentBackgroundWhite = this.createToggleComponent(
        "WHITE BACKGROUND",
        this.icons.backgroundWhite
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
      spanNameTools.setAttribute("class", "accessibility-component__name");

      const resetBtnWrapper = document.createElement("div");
      resetBtnWrapper.classList.add("accessibility-tools__reset-btn-wrapper");

      const resetBtn = document.createElement("button");
      resetBtn.classList.add("reset-btn");
      resetBtn.id = "accessibilityToolsResetBtn";
      resetBtn.insertAdjacentHTML("afterbegin", this.icons.reset);

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

      const accessibilityScreenReaderWrapper = document.createElement("div");
      accessibilityHideImagesWrapper.classList.add(
        "accessibility-screen-reader__wrapper"
      );

      accessibilityTools.appendChild(toolsHeader);
      accessibilityTools.appendChild(accessibilityReadingGuideWrapper);
      accessibilityTools.appendChild(accessibilityFlashlightWrapper);
      accessibilityTools.appendChild(accessibilityHideImagesWrapper);
      accessibilityTools.appendChild(accessibilityScreenReaderWrapper);

      const readingGuideComponent = this.createToggleComponent(
        "READING GUIDE",
        this.icons.readingGuide
      );

      const flashlightComponent = this.createToggleComponent(
        "FLASHLIGHT",
        this.icons.flashlight
      );

      const hideImagesComponent = this.createToggleComponent(
        "HIDDEN IMAGES",
        this.icons.hiddenImages
      );

      const screenReaderComponent = this.createToggleComponent(
        "SCREEN READER",
        this.icons.screenReader
      );

      accessibilityReadingGuideWrapper.appendChild(readingGuideComponent);
      accessibilityFlashlightWrapper.appendChild(flashlightComponent);
      accessibilityHideImagesWrapper.appendChild(hideImagesComponent);
      accessibilityScreenReaderWrapper.appendChild(screenReaderComponent);

      document
        .getElementById("accessibilityMain")
        .appendChild(accessibilityTools);
    },

    createUpDownComponent(name, iconSrc, percentage = "100%") {
      const componentContainer = document.createElement("div");
      const divNameContainer = document.createElement("div");
      const svgWrapper = document.createElement("div");
      const spanName = document.createElement("span");
      const divButtonsContainer = document.createElement("div");
      const divPlusBtnWrapper = document.createElement("div");
      const buttonPlus = document.createElement("button");
      const spanPercentage = document.createElement("span");
      const divMinusBtnWrapper = document.createElement("div");
      const buttonMinus = document.createElement("button");

      componentContainer.setAttribute(
        "class",
        "accessibility-component__up-down-buttons"
      );
      divNameContainer.setAttribute("class", "up-down-buttons__name-container");
      svgWrapper.setAttribute("class", "up-down-buttons__svg-wrapper");
      svgWrapper.insertAdjacentHTML("afterbegin", iconSrc);

      spanName.setAttribute("id", `spanName${this._util.formatName(name)}`);

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
      spanPercentage.innerText = percentage;

      buttonPlus.insertAdjacentHTML("afterbegin", this.icons.plus);
      buttonMinus.insertAdjacentHTML("afterbegin", this.icons.minus);

      componentContainer.appendChild(divNameContainer);
      divNameContainer.appendChild(svgWrapper);
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
      const svgWrapper = document.createElement("div");
      const nameWrapper = document.createElement("div");
      const nameSpan = document.createElement("span");
      const btnWrapper = document.createElement("div");
      const btn = document.createElement("button");

      svgWrapper.insertAdjacentHTML("afterbegin", iconSrc);

      const [nameTop, nameBottom] = name.split(" ");
      nameSpan.innerHTML = `${nameTop} <br /> ${
        nameBottom === undefined ? "" : nameBottom
      }`;
      toggleContainer.classList.add(
        "accessibility-component__toggle-container"
      );
      nameContainer.classList.add("toggle__name-container");
      nameWrapper.classList.add("toggle__name-wrapper");
      svgWrapper.classList.add("toggle__svg-wrapper");
      btnWrapper.classList.add("toggle__btn-wrapper");
      btn.classList.add("toggle__btn");
      nameSpan.id = `spanName${this._util.formatName(name)}`;
      btn.id = "btn" + this._util.formatName(name);

      nameWrapper.appendChild(nameSpan);
      nameContainer.appendChild(svgWrapper);
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

    switchThemeIcon(themeIcon) {
      const themeBtnWrapper = document.getElementById("accessibilityThemeBtn");
      themeBtnWrapper.textContent = "";
      if (themeIcon === "light") {
        themeBtnWrapper.insertAdjacentHTML("afterbegin", this.icons.themeLight);
      }
      if (themeIcon === "dark") {
        themeBtnWrapper.insertAdjacentHTML("afterbegin", this.icons.themeDark);
      }
    },

    icons: {
      /// MAIN ///
      themeLight: `<svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M14.5 8.45834C11.165 8.45834 8.45834 11.165 8.45834 14.5C8.45834 17.835 11.165 20.5417 14.5 20.5417C17.835 20.5417 20.5417 17.835 20.5417 14.5C20.5417 11.165 17.835 8.45834 14.5 8.45834ZM2.41668 15.7083H4.83334C5.49793 15.7083 6.04168 15.1646 6.04168 14.5C6.04168 13.8354 5.49793 13.2917 4.83334 13.2917H2.41668C1.75209 13.2917 1.20834 13.8354 1.20834 14.5C1.20834 15.1646 1.75209 15.7083 2.41668 15.7083ZM24.1667 15.7083H26.5833C27.2479 15.7083 27.7917 15.1646 27.7917 14.5C27.7917 13.8354 27.2479 13.2917 26.5833 13.2917H24.1667C23.5021 13.2917 22.9583 13.8354 22.9583 14.5C22.9583 15.1646 23.5021 15.7083 24.1667 15.7083ZM13.2917 2.41668V4.83334C13.2917 5.49793 13.8354 6.04168 14.5 6.04168C15.1646 6.04168 15.7083 5.49793 15.7083 4.83334V2.41668C15.7083 1.75209 15.1646 1.20834 14.5 1.20834C13.8354 1.20834 13.2917 1.75209 13.2917 2.41668ZM13.2917 24.1667V26.5833C13.2917 27.2479 13.8354 27.7917 14.5 27.7917C15.1646 27.7917 15.7083 27.2479 15.7083 26.5833V24.1667C15.7083 23.5021 15.1646 22.9583 14.5 22.9583C13.8354 22.9583 13.2917 23.5021 13.2917 24.1667ZM7.23793 5.53418C7.12614 5.42216 6.99336 5.33329 6.84718 5.27265C6.70101 5.21202 6.54431 5.18081 6.38605 5.18081C6.2278 5.18081 6.0711 5.21202 5.92492 5.27265C5.77875 5.33329 5.64596 5.42216 5.53418 5.53418C5.42216 5.64596 5.33329 5.77875 5.27265 5.92492C5.21202 6.0711 5.18081 6.2278 5.18081 6.38605C5.18081 6.54431 5.21202 6.70101 5.27265 6.84718C5.33329 6.99336 5.42216 7.12614 5.53418 7.23793L6.81501 8.51876C7.28626 8.99001 8.05959 8.99001 8.51876 8.51876C8.97793 8.04751 8.99001 7.27418 8.51876 6.81501L7.23793 5.53418ZM22.185 20.4813C22.0732 20.3692 21.9404 20.2804 21.7943 20.2197C21.6481 20.1591 21.4914 20.1279 21.3331 20.1279C21.1749 20.1279 21.0182 20.1591 20.872 20.2197C20.7258 20.2804 20.593 20.3692 20.4813 20.4813C20.3692 20.593 20.2804 20.7258 20.2197 20.872C20.1591 21.0182 20.1279 21.1749 20.1279 21.3331C20.1279 21.4914 20.1591 21.6481 20.2197 21.7943C20.2804 21.9404 20.3692 22.0732 20.4813 22.185L21.7621 23.4658C22.2333 23.9371 23.0067 23.9371 23.4658 23.4658C23.5779 23.3541 23.6667 23.2213 23.7274 23.0751C23.788 22.9289 23.8192 22.7722 23.8192 22.614C23.8192 22.4557 23.788 22.299 23.7274 22.1528C23.6667 22.0067 23.5779 21.8739 23.4658 21.7621L22.185 20.4813ZM23.4658 7.23793C23.5779 7.12614 23.6667 6.99336 23.7274 6.84718C23.788 6.70101 23.8192 6.54431 23.8192 6.38605C23.8192 6.2278 23.788 6.0711 23.7274 5.92492C23.6667 5.77875 23.5779 5.64596 23.4658 5.53418C23.3541 5.42216 23.2213 5.33329 23.0751 5.27265C22.9289 5.21202 22.7722 5.18081 22.614 5.18081C22.4557 5.18081 22.299 5.21202 22.1528 5.27265C22.0067 5.33329 21.8739 5.42216 21.7621 5.53418L20.4813 6.81501C20.01 7.28626 20.01 8.05959 20.4813 8.51876C20.9525 8.97793 21.7258 8.99001 22.185 8.51876L23.4658 7.23793ZM8.51876 22.185C8.63078 22.0732 8.71965 21.9404 8.78028 21.7943C8.84092 21.6481 8.87213 21.4914 8.87213 21.3331C8.87213 21.1749 8.84092 21.0182 8.78028 20.872C8.71965 20.7258 8.63078 20.593 8.51876 20.4813C8.40697 20.3692 8.27419 20.2804 8.12801 20.2197C7.98184 20.1591 7.82514 20.1279 7.66689 20.1279C7.50863 20.1279 7.35193 20.1591 7.20576 20.2197C7.05958 20.2804 6.9268 20.3692 6.81501 20.4813L5.53418 21.7621C5.06293 22.2333 5.06293 23.0067 5.53418 23.4658C6.00543 23.925 6.77876 23.9371 7.23793 23.4658L8.51876 22.185Z" fill="white"/>
                   </svg>`,
      themeDark: `<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.845 3.55833C7.595 4.13 3.5 8.58667 3.5 14C3.5 16.7848 4.60625 19.4555 6.57538 21.4246C8.54451 23.3938 11.2152 24.5 14 24.5C19.4017 24.5 23.8583 20.4167 24.4417 15.1667C24.5467 14.245 23.5317 13.51 22.645 14.0583C21.6926 14.6662 20.5943 15.007 19.4651 15.0449C18.3359 15.0828 17.2172 14.8166 16.2262 14.2739C15.2352 13.7313 14.4082 12.9323 13.8318 11.9605C13.2555 10.9887 12.9509 9.87986 12.95 8.75C12.95 7.51333 13.3117 6.34667 13.93 5.37833C14.455 4.59667 13.8833 3.47667 12.845 3.55833Z" fill="#2e5fa3"/>
                  </svg>`,

      close: `<svg width="27" height="20" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path class="accessibility-icon__path--fill" d="M33.3 0H3.7C2.7187 0 1.77759 0.38982 1.0837 1.0837C0.38982 1.77759 0 2.7187 0 3.7V33.3C0 34.2813 0.38982 35.2224 1.0837 35.9163C1.77759 36.6102 2.7187 37 3.7 37H33.3C34.2813 37 35.2224 36.6102 35.9163 35.9163C36.6102 35.2224 37 34.2813 37 33.3V3.7C37 2.7187 36.6102 1.77759 35.9163 1.0837C35.2224 0.38982 34.2813 0 33.3 0ZM32.56 32.56H4.44V4.44H32.56V32.56ZM11.0094 22.8493L15.355 18.5L11.0094 14.1506C10.8028 13.9441 10.639 13.699 10.5273 13.4292C10.4155 13.1594 10.358 12.8702 10.358 12.5781C10.358 11.9883 10.5923 11.4227 11.0094 11.0056C11.4264 10.5886 11.992 10.3543 12.5819 10.3543C13.1717 10.3543 13.7373 10.5886 14.1544 11.0056L18.5 15.355L22.8493 11.0038C23.2664 10.5867 23.832 10.3524 24.4218 10.3524C25.0117 10.3524 25.5773 10.5867 25.9943 11.0038C26.4114 11.4209 26.6457 11.9865 26.6457 12.5763C26.6457 13.1661 26.4114 13.7317 25.9943 14.1488L21.645 18.5L25.9962 22.8493C26.4133 23.2664 26.6476 23.832 26.6476 24.4218C26.6476 25.0117 26.4133 25.5773 25.9962 25.9943C25.5791 26.4114 25.0135 26.6457 24.4237 26.6457C23.8339 26.6457 23.2683 26.4114 22.8512 25.9943L18.5 21.645L14.1506 25.9962C13.7336 26.4133 13.168 26.6476 12.5781 26.6476C11.9883 26.6476 11.4227 26.4133 11.0056 25.9962C10.5886 25.5791 10.3543 25.0135 10.3543 24.4237C10.3543 23.8339 10.5886 23.2683 11.0056 22.8512L11.0094 22.8493Z" fill="#2e5fa3"/>
              </svg>`,

      reset: `<svg width="28" height="28" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path class="accessibility-icon__path--fill" d="M20.5833 18.3667L24.5417 22.325C24.8319 22.6153 24.9771 22.9847 24.9771 23.4333C24.9771 23.8819 24.8319 24.2514 24.5417 24.5417C24.2514 24.8319 23.8819 24.9771 23.4333 24.9771C22.9847 24.9771 22.6153 24.8319 22.325 24.5417L17.8917 20.1083C17.7333 19.95 17.6146 19.7716 17.5354 19.5732C17.4563 19.3758 17.4167 19.1715 17.4167 18.9604V12.6667C17.4167 12.2181 17.5687 11.8418 17.8727 11.5378C18.1756 11.2348 18.5514 11.0833 19 11.0833C19.4486 11.0833 19.8249 11.2348 20.1289 11.5378C20.4319 11.8418 20.5833 12.2181 20.5833 12.6667V18.3667ZM19 33.25C15.8069 33.25 12.9438 32.3063 10.4104 30.419C7.87708 28.5327 6.175 26.0722 5.30417 23.0375C5.17222 22.5625 5.21867 22.1139 5.4435 21.6917C5.66728 21.2694 6.01667 21.0056 6.49167 20.9C6.94028 20.7944 7.34297 20.8931 7.69975 21.1961C8.05547 21.5001 8.29931 21.8764 8.43125 22.325C9.11736 24.6472 10.4437 26.5208 12.4102 27.9458C14.3756 29.3708 16.5722 30.0833 19 30.0833C22.0875 30.0833 24.7063 29.0077 26.8565 26.8565C29.0077 24.7063 30.0833 22.0875 30.0833 19C30.0833 15.9125 29.0077 13.2931 26.8565 11.1419C24.7063 8.99175 22.0875 7.91667 19 7.91667C17.1792 7.91667 15.4771 8.33889 13.8937 9.18333C12.3104 10.0278 10.9778 11.1889 9.89583 12.6667H12.6667C13.1153 12.6667 13.4916 12.8181 13.7956 13.1211C14.0985 13.4251 14.25 13.8014 14.25 14.25C14.25 14.6986 14.0985 15.0744 13.7956 15.3773C13.4916 15.6813 13.1153 15.8333 12.6667 15.8333H6.33333C5.88472 15.8333 5.50894 15.6813 5.206 15.3773C4.902 15.0744 4.75 14.6986 4.75 14.25V7.91667C4.75 7.46806 4.902 7.09175 5.206 6.78775C5.50894 6.48481 5.88472 6.33333 6.33333 6.33333C6.78194 6.33333 7.15825 6.48481 7.46225 6.78775C7.76519 7.09175 7.91667 7.46806 7.91667 7.91667V10.0542C9.2625 8.36528 10.9055 7.05903 12.8456 6.13542C14.7846 5.21181 16.8361 4.75 19 4.75C20.9792 4.75 22.8333 5.12578 24.5623 5.87733C26.2902 6.62994 27.7944 7.64592 29.0748 8.92525C30.3541 10.2056 31.3701 11.7098 32.1227 13.4378C32.8742 15.1668 33.25 17.0208 33.25 19C33.25 20.9792 32.8742 22.8327 32.1227 24.5607C31.3701 26.2897 30.3541 27.7938 29.0748 29.0732C27.7944 30.3536 26.2902 31.3701 24.5623 32.1227C22.8333 32.8742 20.9792 33.25 19 33.25Z" fill="white"/>
              </svg>`,

      minus: `<svg width="70" height="7" viewBox="0 0 70 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="3.5" y1="3.5" x2="66.5" y2="3.5" stroke="white" stroke-width="7" stroke-linecap="round"/>
              </svg>`,

      plus: `<svg width="61" height="61" viewBox="0 0 61 61" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="3.5" y1="29.5" x2="57.5" y2="29.5" stroke="white" stroke-width="7" stroke-linecap="round"/>
              <line x1="30.5" y1="57.5" x2="30.5" y2="3.5" stroke="white" stroke-width="7" stroke-linecap="round"/>
             </svg>`,

      /// CONTENT ///
      contentScale: `<svg width="18" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path class="accessibility-icon__path--fill" d="M6 7C5.99961 6.73717 6.10314 6.48483 6.288 6.298L6.298 6.288C6.48483 6.10314 6.73717 5.99961 7 6H11C11.2652 6 11.5196 6.10536 11.7071 6.29289C11.8946 6.48043 12 6.73478 12 7C12 7.26522 11.8946 7.51957 11.7071 7.70711C11.5196 7.89464 11.2652 8 11 8H9.414L11.708 10.292C11.8958 10.4798 12.0013 10.7344 12.0013 11C12.0013 11.2656 11.8958 11.5202 11.708 11.708C11.5202 11.8958 11.2656 12.0013 11 12.0013C10.7344 12.0013 10.4798 11.8958 10.292 11.708L8 9.414V11C8 11.2652 7.89464 11.5196 7.70711 11.7071C7.51957 11.8946 7.26522 12 7 12C6.73478 12 6.48043 11.8946 6.29289 11.7071C6.10536 11.5196 6 11.2652 6 11V7ZM6.076 21.382C6.02582 21.2609 6 21.1311 6 21V17C6 16.7348 6.10536 16.4804 6.29289 16.2929C6.48043 16.1054 6.73478 16 7 16C7.26522 16 7.51957 16.1054 7.70711 16.2929C7.89464 16.4804 8 16.7348 8 17V18.586L10.292 16.292C10.385 16.199 10.4954 16.1253 10.6168 16.075C10.7383 16.0246 10.8685 15.9987 11 15.9987C11.1315 15.9987 11.2617 16.0246 11.3832 16.075C11.5046 16.1253 11.615 16.199 11.708 16.292C11.801 16.385 11.8747 16.4954 11.925 16.6168C11.9754 16.7383 12.0013 16.8685 12.0013 17C12.0013 17.1315 11.9754 17.2617 11.925 17.3832C11.8747 17.5046 11.801 17.615 11.708 17.708L9.414 20H11C11.2652 20 11.5196 20.1054 11.7071 20.2929C11.8946 20.4804 12 20.7348 12 21C12 21.2652 11.8946 21.5196 11.7071 21.7071C11.5196 21.8946 11.2652 22 11 22H6.994C6.79674 21.9994 6.60407 21.9404 6.44033 21.8304C6.27658 21.7205 6.15111 21.5644 6.076 21.382ZM21.382 6.076C21.498 6.124 21.608 6.196 21.702 6.288L21.712 6.298C21.8965 6.48508 22 6.73725 22 7V11C22 11.2652 21.8946 11.5196 21.7071 11.7071C21.5196 11.8946 21.2652 12 21 12C20.7348 12 20.4804 11.8946 20.2929 11.7071C20.1054 11.5196 20 11.2652 20 11V9.414L17.708 11.708C17.5202 11.8958 17.2656 12.0013 17 12.0013C16.7344 12.0013 16.4798 11.8958 16.292 11.708C16.1042 11.5202 15.9987 11.2656 15.9987 11C15.9987 10.7344 16.1042 10.4798 16.292 10.292L18.586 8H17C16.7348 8 16.4804 7.89464 16.2929 7.70711C16.1054 7.51957 16 7.26522 16 7C16 6.73478 16.1054 6.48043 16.2929 6.29289C16.4804 6.10536 16.7348 6 17 6H21C21.1311 6.00005 21.2609 6.02587 21.382 6.076ZM21.702 21.712C21.515 21.8967 21.2628 22.0002 21 22H17C16.7348 22 16.4804 21.8946 16.2929 21.7071C16.1054 21.5196 16 21.2652 16 21C16 20.7348 16.1054 20.4804 16.2929 20.2929C16.4804 20.1054 16.7348 20 17 20H18.586L16.292 17.708C16.199 17.615 16.1253 17.5046 16.075 17.3832C16.0246 17.2617 15.9987 17.1315 15.9987 17C15.9987 16.8685 16.0246 16.7383 16.075 16.6168C16.1253 16.4954 16.199 16.385 16.292 16.292C16.385 16.199 16.4954 16.1253 16.6168 16.075C16.7383 16.0246 16.8685 15.9987 17 15.9987C17.1315 15.9987 17.2617 16.0246 17.3832 16.075C17.5046 16.1253 17.615 16.199 17.708 16.292L20 18.586V17C20 16.7348 20.1054 16.4804 20.2929 16.2929C20.4804 16.1054 20.7348 16 21 16C21.2652 16 21.5196 16.1054 21.7071 16.2929C21.8946 16.4804 22 16.7348 22 17V21C22 21.2627 21.8965 21.5149 21.712 21.702L21.702 21.712ZM0 4C0 2.93913 0.421427 1.92172 1.17157 1.17157C1.92172 0.421427 2.93913 0 4 0H24C25.0609 0 26.0783 0.421427 26.8284 1.17157C27.5786 1.92172 28 2.93913 28 4V24C28 25.0609 27.5786 26.0783 26.8284 26.8284C26.0783 27.5786 25.0609 28 24 28H4C2.93913 28 1.92172 27.5786 1.17157 26.8284C0.421427 26.0783 0 25.0609 0 24V4ZM4 2C3.46957 2 2.96086 2.21071 2.58579 2.58579C2.21071 2.96086 2 3.46957 2 4V24C2 24.5304 2.21071 25.0391 2.58579 25.4142C2.96086 25.7893 3.46957 26 4 26H24C24.5304 26 25.0391 25.7893 25.4142 25.4142C25.7893 25.0391 26 24.5304 26 24V4C26 3.46957 25.7893 2.96086 25.4142 2.58579C25.0391 2.21071 24.5304 2 24 2H4Z" fill="#1C54A8"/>
                     </svg>`,

      fontSize: `<svg width="18" height="18" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <path class="accessibility-icon__path--fill" d="M17.8985 5.33888C17.6131 5.58387 17.2424 5.70515 16.8679 5.67604C16.4934 5.64693 16.1458 5.46982 15.9015 5.18366C15.6572 4.89751 15.5362 4.52575 15.5653 4.15017C15.5943 3.7746 15.7709 3.42597 16.0562 3.18098L19.3594 0.341626C19.616 0.121172 19.9427 0 20.2805 0C20.6184 0 20.9451 0.121172 21.2016 0.341626L24.5048 3.18098C24.6461 3.30228 24.7622 3.45031 24.8464 3.6166C24.9306 3.7829 24.9814 3.96421 24.9958 4.15017C25.0101 4.33614 24.9878 4.52313 24.9302 4.70045C24.8725 4.87778 24.7805 5.04197 24.6596 5.18366C24.5386 5.32535 24.391 5.44176 24.2252 5.52625C24.0593 5.61073 23.8786 5.66163 23.6931 5.67604C23.5077 5.69046 23.3212 5.6681 23.1444 5.61025C22.9676 5.5524 22.8039 5.46019 22.6626 5.33888L20.2805 3.28887L17.8985 5.3351V5.33888ZM9.89916 3.31348C9.61818 3.31354 9.34356 3.39745 9.11029 3.55453C8.87701 3.71162 8.69563 3.93477 8.58923 4.19557L0.0953912 25.0175C-0.0383963 25.3642 -0.0312099 25.7498 0.115406 26.0912C0.262022 26.4327 0.536366 26.7029 0.879485 26.8437C1.2226 26.9845 1.60711 26.9847 1.95038 26.8443C2.29365 26.7038 2.56828 26.434 2.71527 26.0926L5.44462 19.4031H14.3537L17.0831 26.0926C17.151 26.2687 17.2532 26.4293 17.3838 26.5653C17.5143 26.7012 17.6706 26.8096 17.8435 26.8843C18.0163 26.9589 18.2023 26.9982 18.3905 26.9999C18.5786 27.0017 18.7653 26.9657 18.9395 26.8942C19.1136 26.8228 19.2719 26.7172 19.4049 26.5836C19.5379 26.4501 19.643 26.2913 19.7141 26.1166C19.7852 25.9418 19.8208 25.7546 19.8189 25.5659C19.817 25.3772 19.7775 25.1907 19.7029 25.0175L11.2091 4.19557C11.1027 3.93477 10.9213 3.71162 10.688 3.55453C10.4548 3.39745 10.1802 3.31354 9.89916 3.31348ZM9.89916 8.4811L13.1948 16.5638H6.60544L9.89916 8.4811Z" fill="#1C54A8"/>
                 </svg>`,

      lineHeight: `<svg width="18" height="25" viewBox="0 0 28 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path class="accessibility-icon__path--fill" d="M15.1353 4.27632C14.7303 4.27632 14.3906 4.11842 14.1162 3.80263C13.8417 3.48684 13.705 3.09649 13.7059 2.63158C13.7059 2.16557 13.8431 1.77467 14.1176 1.45888C14.392 1.14309 14.7313 0.985745 15.1353 0.986842H26.5706C26.9756 0.986842 27.3153 1.14474 27.5898 1.46053C27.8642 1.77632 28.0009 2.16667 28 2.63158C28 3.09759 27.8628 3.48849 27.5883 3.80428C27.3139 4.12007 26.9746 4.27741 26.5706 4.27632H15.1353ZM15.1353 14.1447C14.7303 14.1447 14.3906 13.9868 14.1162 13.6711C13.8417 13.3553 13.705 12.9649 13.7059 12.5C13.7059 12.034 13.8431 11.6431 14.1176 11.3273C14.392 11.0115 14.7313 10.8542 15.1353 10.8553H26.5706C26.9756 10.8553 27.3153 11.0132 27.5898 11.3289C27.8642 11.6447 28.0009 12.0351 28 12.5C28 12.966 27.8628 13.3569 27.5883 13.6727C27.3139 13.9885 26.9746 14.1458 26.5706 14.1447H15.1353ZM15.1353 24.0132C14.7303 24.0132 14.3906 23.8553 14.1162 23.5395C13.8417 23.2237 13.705 22.8333 13.7059 22.3684C13.7059 21.9024 13.8431 21.5115 14.1176 21.1957C14.392 20.8799 14.7313 20.7226 15.1353 20.7237H26.5706C26.9756 20.7237 27.3153 20.8816 27.5898 21.1974C27.8642 21.5132 28.0009 21.9035 28 22.3684C28 22.8344 27.8628 23.2253 27.5883 23.5411C27.3139 23.8569 26.9746 24.0143 26.5706 24.0132H15.1353ZM4.1289 24.5066L0.412439 20.2303C0.150381 19.9287 0.0131575 19.5515 0.00076933 19.0987C-0.0116189 18.6458 0.125604 18.2555 0.412439 17.9276C0.674497 17.6261 1.00231 17.4682 1.39587 17.4539C1.78943 17.4397 2.12868 17.5839 2.41361 17.8865L3.70007 19.3257V5.67434L2.41361 7.11349C2.15155 7.41502 1.82374 7.56579 1.43018 7.56579C1.03661 7.56579 0.697367 7.40132 0.412439 7.07237C0.150381 6.77083 0.0193516 6.38706 0.0193516 5.92105C0.0193516 5.45504 0.150381 5.07127 0.412439 4.76974L4.1289 0.493421C4.41478 0.164473 4.74831 0 5.12948 0C5.51066 0 5.84419 0.164473 6.13007 0.493421L9.84653 4.76974C10.1086 5.07127 10.2458 5.44846 10.2582 5.90132C10.2706 6.35417 10.1334 6.74452 9.84653 7.07237C9.58447 7.3739 9.25666 7.5318 8.86309 7.54605C8.46953 7.56031 8.13028 7.41612 7.84536 7.11349L6.55889 5.67434V19.3257L7.84536 17.8865C8.10741 17.585 8.43522 17.4342 8.82879 17.4342C9.22235 17.4342 9.5616 17.5987 9.84653 17.9276C10.1086 18.2292 10.2396 18.6129 10.2396 19.0789C10.2396 19.545 10.1086 19.9287 9.84653 20.2303L6.13007 24.5066C5.84419 24.8355 5.51066 25 5.12948 25C4.74831 25 4.41478 24.8355 4.1289 24.5066Z" fill="#1C54A8"/>
                   </svg>`,

      letterSpacing: `<svg width="24" height="25" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path class="accessibility-icon__path--fill"  fill-rule="evenodd" clip-rule="evenodd" d="M9.3885 20.8615C9.64627 21.1193 9.79108 21.469 9.79108 21.8336C9.79108 22.1982 9.64627 22.5479 9.3885 22.8057L8.81925 23.375H24.1808L23.6115 22.8057C23.4802 22.6789 23.3754 22.5272 23.3034 22.3594C23.2313 22.1917 23.1934 22.0112 23.1918 21.8287C23.1902 21.6461 23.225 21.465 23.2941 21.2961C23.3633 21.1271 23.4654 20.9736 23.5945 20.8445C23.7236 20.7154 23.8771 20.6133 24.0461 20.5441C24.215 20.475 24.3961 20.4402 24.5787 20.4418C24.7612 20.4434 24.9417 20.4813 25.1094 20.5534C25.2772 20.6254 25.4289 20.7302 25.5558 20.8615L28.4721 23.7765C28.6 23.9042 28.7014 24.0558 28.7706 24.2228C28.8398 24.3897 28.8754 24.5686 28.8754 24.7493C28.8754 24.93 28.8398 25.1089 28.7706 25.2759C28.7014 25.4428 28.6 25.5944 28.4721 25.7221L25.5558 28.6385C25.2964 28.889 24.9491 29.0276 24.5886 29.0244C24.2281 29.0213 23.8832 28.8767 23.6282 28.6217C23.3733 28.3668 23.2287 28.0219 23.2256 27.6614C23.2224 27.3009 23.361 26.9536 23.6115 26.6942L24.1808 26.125H8.81925L9.3885 26.6942C9.51983 26.8211 9.62458 26.9728 9.69664 27.1406C9.7687 27.3083 9.80663 27.4888 9.80822 27.6713C9.80981 27.8539 9.77502 28.035 9.70588 28.2039C9.63674 28.3729 9.53465 28.5264 9.40554 28.6555C9.27644 28.7846 9.12292 28.8867 8.95394 28.9559C8.78495 29.025 8.6039 29.0598 8.42132 29.0582C8.23875 29.0566 8.05832 29.0187 7.89057 28.9466C7.72281 28.8746 7.57109 28.7698 7.44425 28.6385L4.52788 25.7235C4.40003 25.5958 4.29861 25.4442 4.22942 25.2772C4.16022 25.1103 4.12461 24.9314 4.12461 24.7507C4.12461 24.57 4.16022 24.3911 4.22942 24.2241C4.29861 24.0572 4.40003 23.9056 4.52788 23.7779L7.44425 20.8615C7.7021 20.6037 8.05177 20.4589 8.41638 20.4589C8.78098 20.4589 9.13065 20.6037 9.3885 20.8615ZM20.625 4.125C20.9618 4.12504 21.2868 4.24869 21.5385 4.47248C21.7902 4.69628 21.951 5.00465 21.9904 5.33912L22 5.5V10.0884C22.7441 9.73604 23.5662 9.58051 24.3877 9.63667C25.2091 9.69283 26.0024 9.9588 26.6917 10.4091C27.3809 10.8595 27.9431 11.4791 28.3245 12.2088C28.7059 12.9385 28.8937 13.7538 28.8699 14.5768C28.8462 15.3998 28.6116 16.203 28.1888 16.9095C27.766 17.6159 27.169 18.2021 26.4549 18.6119C25.7407 19.0218 24.9334 19.2415 24.1101 19.2502C23.2868 19.2589 22.4751 19.0562 21.7525 18.6615C21.5933 18.8908 21.3681 19.0661 21.1068 19.1642C20.8455 19.2622 20.5605 19.2784 20.2898 19.2104C20.0191 19.1425 19.7755 18.9937 19.5915 18.7839C19.4074 18.574 19.2917 18.3131 19.2596 18.0359L19.25 17.875V5.5C19.25 5.13533 19.3949 4.78559 19.6527 4.52773C19.9106 4.26987 20.2603 4.125 20.625 4.125ZM11 4.125C11.4441 4.12491 11.8794 4.24915 12.2565 4.48365C12.6337 4.71815 12.9376 5.05355 13.134 5.45187L13.2179 5.643L17.7815 17.3772C17.9058 17.7036 17.9013 18.065 17.7688 18.3881C17.6364 18.7113 17.386 18.9719 17.0684 19.1171C16.7508 19.2623 16.3899 19.2813 16.0588 19.1701C15.7278 19.0589 15.4514 18.826 15.2859 18.5185L15.2185 18.3727L13.9549 15.125H8.04513L6.7815 18.3727C6.65418 18.6993 6.40698 18.9649 6.09041 19.1153C5.77384 19.2656 5.41179 19.2895 5.07824 19.1818C4.7447 19.0742 4.46483 18.8433 4.29584 18.5363C4.12684 18.2292 4.08147 17.8692 4.169 17.5299L4.2185 17.3772L8.78213 5.643C8.95568 5.19588 9.26034 4.81166 9.65614 4.54076C10.0519 4.26986 10.5204 4.12494 11 4.125ZM24.0625 12.375C23.5155 12.375 22.9909 12.5923 22.6041 12.9791C22.2173 13.3659 22 13.8905 22 14.4375C22 14.9845 22.2173 15.5091 22.6041 15.8959C22.9909 16.2827 23.5155 16.5 24.0625 16.5C24.6095 16.5 25.1341 16.2827 25.5209 15.8959C25.9077 15.5091 26.125 14.9845 26.125 14.4375C26.125 13.8905 25.9077 13.3659 25.5209 12.9791C25.1341 12.5923 24.6095 12.375 24.0625 12.375ZM11 7.52537L9.11488 12.375H12.8865L11 7.52537Z" fill="#1C54A8"/>
                      </svg>`,

      titlesHighlight: `<svg width="17" height="20" viewBox="0 0 17 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path class="accessibility-icon__path--fill" d="M17 1.44444C17 1.06135 16.8507 0.693954 16.5851 0.423068C16.3194 0.152182 15.9591 0 15.5833 0C15.2076 0 14.8473 0.152182 14.5816 0.423068C14.3159 0.693954 14.1667 1.06135 14.1667 1.44444V11.5556C14.1667 13.0879 13.5696 14.5575 12.5069 15.6411C11.4442 16.7246 10.0029 17.3333 8.5 17.3333C6.99711 17.3333 5.55577 16.7246 4.49306 15.6411C3.43036 14.5575 2.83333 13.0879 2.83333 11.5556V1.44444C2.83333 1.06135 2.68408 0.693954 2.4184 0.423068C2.15272 0.152182 1.79239 0 1.41667 0C1.04094 0 0.680609 0.152182 0.414932 0.423068C0.149256 0.693954 0 1.06135 0 1.44444V11.5556C0 13.8541 0.895533 16.0585 2.48959 17.6838C4.08365 19.3091 6.24566 20.2222 8.5 20.2222C10.7543 20.2222 12.9163 19.3091 14.5104 17.6838C16.1045 16.0585 17 13.8541 17 11.5556V1.44444ZM1.41667 23.1111C1.04094 23.1111 0.680609 23.2633 0.414932 23.5342C0.149256 23.8051 0 24.1725 0 24.5556C0 24.9386 0.149256 25.306 0.414932 25.5769C0.680609 25.8478 1.04094 26 1.41667 26H15.5833C15.9591 26 16.3194 25.8478 16.5851 25.5769C16.8507 25.306 17 24.9386 17 24.5556C17 24.1725 16.8507 23.8051 16.5851 23.5342C16.3194 23.2633 15.9591 23.1111 15.5833 23.1111H1.41667Z" fill="#1C54A8"/>
                        </svg>`,
      linksHighlight: `<svg width="20" height="20"  viewBox="0 0 20 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path class="accessibility-icon__path--fill" d="M11.856 21.174c.123.143.22.314.286.502a1.79 1.79 0 0 1 0 1.187 1.591 1.591 0 0 1-.286.502l-.65.766c-1.23 1.45-2.9 2.266-4.641 2.266s-3.411-.815-4.642-2.266C.692 22.68 0 20.712 0 18.66c0-2.053.692-4.02 1.923-5.472l2.638-3.108c1.183-1.397 2.774-2.209 4.448-2.268 1.675-.06 3.305.638 4.557 1.949.129.135.234.3.31.483a1.812 1.812 0 0 1 .06 1.186c-.058.192-.146.37-.26.522a1.363 1.363 0 0 1-.41.366 1.133 1.133 0 0 1-1.006.07 1.29 1.29 0 0 1-.444-.307c-.751-.786-1.728-1.204-2.732-1.169-1.004.035-1.958.521-2.668 1.358L3.78 15.377c-.739.87-1.154 2.05-1.154 3.281 0 1.232.415 2.412 1.154 3.282.738.87 1.74 1.36 2.785 1.36 1.044 0 2.046-.49 2.784-1.36l.65-.765c.122-.144.267-.258.426-.336.16-.078.33-.118.503-.118.172 0 .343.04.502.118.16.078.304.192.426.336ZM19.96 2.869C18.727 1.42 17.057.607 15.317.607c-1.74 0-3.41.813-4.642 2.262l-.65.766A1.7 1.7 0 0 0 9.64 4.73c0 .41.139.805.385 1.095.247.29.581.454.93.454.349 0 .683-.163.93-.454l.65-.765c.738-.87 1.74-1.36 2.784-1.36 1.044 0 2.046.49 2.785 1.36.738.87 1.153 2.05 1.153 3.281 0 1.231-.415 2.412-1.153 3.282l-2.637 3.11c-.71.836-1.666 1.322-2.67 1.356-1.004.034-1.981-.385-2.731-1.172-.13-.135-.28-.24-.444-.306a1.133 1.133 0 0 0-1.006.07 1.363 1.363 0 0 0-.41.365c-.115.152-.203.33-.26.522a1.81 1.81 0 0 0 .06 1.186c.075.184.18.348.31.483 1.25 1.311 2.88 2.009 4.553 1.95 1.674-.058 3.265-.867 4.448-2.263l2.638-3.108c1.231-1.452 1.923-3.42 1.923-5.472 0-2.052-.69-4.02-1.92-5.473v-.003Z" fill="#1C54A8"/>
                       </svg>`,

      /// COLORS ///
      saturation: `<svg width="22" height="22" viewBox="0 0 30 30"  fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path class="accessibility-icon__path--fill"  d="M13 28C5.837 28 0 21.714 0 14S5.837 0 13 0s13 5.656 13 12.6c0 4.634-3.497 8.4-7.8 8.4h-2.301c-.364 0-.65.308-.65.7 0 .168.065.322.169.462.533.658.832 1.484.832 2.338 0 .928-.342 1.819-.952 2.475A3.137 3.137 0 0 1 13 28Zm0-25.2C7.267 2.8 2.6 7.826 2.6 14c0 6.174 4.667 11.2 10.4 11.2.364 0 .65-.308.65-.7a.788.788 0 0 0-.182-.49 3.633 3.633 0 0 1-.819-2.31c0-.928.342-1.819.952-2.475a3.137 3.137 0 0 1 2.298-1.025H18.2c2.873 0 5.2-2.506 5.2-5.6 0-5.404-4.667-9.8-10.4-9.8Z" fill="#1C54A8"/>
                    <path class="accessibility-icon__path--fill"  d="M5.85 15.4c1.077 0 1.95-.94 1.95-2.1 0-1.16-.873-2.1-1.95-2.1s-1.95.94-1.95 2.1c0 1.16.873 2.1 1.95 2.1ZM9.75 9.8c1.077 0 1.95-.94 1.95-2.1 0-1.16-.873-2.1-1.95-2.1S7.8 6.54 7.8 7.7c0 1.16.873 2.1 1.95 2.1ZM16.25 9.8c1.077 0 1.95-.94 1.95-2.1 0-1.16-.873-2.1-1.95-2.1s-1.95.94-1.95 2.1c0 1.16.873 2.1 1.95 2.1ZM20.15 15.4c1.077 0 1.95-.94 1.95-2.1 0-1.16-.873-2.1-1.95-2.1s-1.95.94-1.95 2.1c0 1.16.873 2.1 1.95 2.1Z" fill="#1C54A8"/>
                   </svg>`,
      contrast: `<svg id='accessibilityContrastSVG' width="18" height="30" viewBox="0 0 28 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path class="accessibility-icon__path--stroke" id="accessibilityContrastSVGPath" d="M17.9 4.11111H24.4C25.6259 4.11111 26.2382 4.11111 26.6191 4.56689C27 5.02267 27 5.75533 27 7.22222V22.7778C27 24.2447 27 24.9773 26.6191 25.4331C26.2382 25.8889 25.6259 25.8889 24.4 25.8889H17.9M10.1 4.11111H3.6C2.3741 4.11111 1.7618 4.11111 1.3809 4.56689C1 5.02267 1 5.75533 1 7.22222V22.7778C1 24.2447 1 24.9773 1.3809 25.4331C1.7618 25.8889 2.3741 25.8889 3.6 25.8889H10.1M14 1V29" stroke="#1C54A8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>`,
      inversedColors: `<svg width="20" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path class="accessibility-icon__path--fill" d="M24.5 42.875C19.9743 42.875 16.1203 41.3009 12.938 38.1526C9.75575 35.0044 8.1653 31.2021 8.16666 26.7458C8.16666 24.5 8.592 22.4243 9.4427 20.5187C10.2934 18.6132 11.4674 16.9118 12.9646 15.4146L24.5 4.08333L36.0354 15.4146C37.5326 16.9118 38.7066 18.6132 39.5573 20.5187C40.408 22.4243 40.8333 24.5 40.8333 26.7458C40.8333 31.2035 39.2429 35.0064 36.0619 38.1547C32.881 41.3029 29.027 42.8764 24.5 42.875ZM24.5 38.7917V9.8L15.8229 18.375C14.6319 19.4979 13.7384 20.7658 13.1422 22.1786C12.546 23.5915 12.2486 25.1139 12.25 26.7458C12.25 30.0465 13.441 32.8797 15.8229 35.2453C18.2049 37.6109 21.0972 38.793 24.5 38.7917Z" fill="#1C54A8"/>
                       </svg>`,

      backgroundWhite: `<svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path class="accessibility-icon__path--fill" d="M2.69993 14.3964V18.225C2.69993 19.1201 3.05551 19.9786 3.68845 20.6115C4.32138 21.2444 5.17983 21.6 6.07493 21.6H20.9249C21.82 21.6 22.6785 21.2444 23.3114 20.6115C23.9444 19.9786 24.2999 19.1201 24.2999 18.225V8.77501C24.2999 7.8799 23.9444 7.02146 23.3114 6.38852C22.6785 5.75559 21.82 5.40001 20.9249 5.40001H12.7952L13.7011 6.30721C13.8415 6.44761 13.9711 6.59476 14.0858 6.75001H20.9249C21.462 6.75001 21.9771 6.96335 22.3568 7.34311C22.7366 7.72288 22.9499 8.23794 22.9499 8.77501V18.225C22.9499 18.7621 22.7366 19.2771 22.3568 19.6569C21.9771 20.0367 21.462 20.25 20.9249 20.25H6.07493C5.53787 20.25 5.0228 20.0367 4.64304 19.6569C4.26328 19.2771 4.04993 18.7621 4.04993 18.225V15.7464L2.69993 14.3964ZM6.74993 2.02501C6.74993 1.84598 6.82105 1.6743 6.94764 1.54771C7.07422 1.42112 7.24591 1.35001 7.42493 1.35001C7.60395 1.35001 7.77564 1.42112 7.90223 1.54771C8.02882 1.6743 8.09993 1.84598 8.09993 2.02501V3.60991C8.74793 3.63961 9.38783 3.90286 9.88193 4.39696L12.748 7.26301C13.2542 7.76933 13.5385 8.45596 13.5385 9.17191C13.5385 9.88785 13.2542 10.5745 12.748 11.0808L8.93018 14.9C8.67945 15.1508 8.38176 15.3498 8.05411 15.4855C7.72646 15.6213 7.37527 15.6912 7.02061 15.6912C6.66595 15.6912 6.31476 15.6213 5.98711 15.4855C5.65946 15.3498 5.36177 15.1508 5.11103 14.9L2.24633 12.0339C1.74016 11.5276 1.45581 10.8409 1.45581 10.125C1.45581 9.40906 1.74016 8.72243 2.24633 8.21611L6.06413 4.39696C6.27068 4.19041 6.50288 4.02436 6.74993 3.89881V2.02501ZM6.74993 7.42501V5.62141L3.59633 8.77501H12.1283C12.0638 8.56394 11.9484 8.372 11.7922 8.21611L8.92883 5.35141C8.70652 5.12883 8.41321 4.99125 8.09993 4.96261V7.42501C8.09993 7.60403 8.02882 7.77572 7.90223 7.9023C7.77564 8.02889 7.60395 8.10001 7.42493 8.10001C7.24591 8.10001 7.07422 8.02889 6.94764 7.9023C6.82105 7.77572 6.74993 7.60403 6.74993 7.42501ZM2.80523 10.125C2.80523 10.4706 2.93753 10.8162 3.20078 11.0795L6.06413 13.9428C6.18951 14.0683 6.3384 14.1679 6.50229 14.2358C6.66618 14.3038 6.84185 14.3387 7.01926 14.3387C7.19667 14.3387 7.37234 14.3038 7.53623 14.2358C7.70012 14.1679 7.84901 14.0683 7.97438 13.9428L11.7922 10.125H2.80523ZM13.7186 11.3751L14.0089 11.0255C14.0722 10.9545 14.1498 10.8978 14.2366 10.8589C14.3233 10.8201 14.4174 10.8 14.5124 10.8C14.6075 10.8 14.7015 10.8201 14.7883 10.8589C14.8751 10.8978 14.9527 10.9545 15.016 11.0255L15.3062 11.3765C15.4736 11.5884 15.6977 11.8895 15.9245 12.2405C16.3538 12.9114 16.8749 13.8983 16.8749 14.85C16.8749 16.2122 15.9664 17.55 14.5124 17.55C13.0571 17.55 12.1499 16.2122 12.1499 14.85C12.1499 13.8983 12.671 12.9114 13.1003 12.2418C13.3258 11.8895 13.5499 11.5884 13.7186 11.3751ZM14.5124 12.5645C14.4171 12.697 14.3252 12.832 14.237 12.9695C13.8239 13.6148 13.4999 14.3168 13.4999 14.85C13.4999 15.2456 13.6349 15.6141 13.8347 15.8612C13.9131 15.967 14.0153 16.0528 14.133 16.1117C14.2508 16.1705 14.3808 16.2008 14.5124 16.2C14.6441 16.201 14.7742 16.1708 14.892 16.112C15.0098 16.0531 15.1119 15.9671 15.1901 15.8612C15.4106 15.5705 15.5284 15.2148 15.5249 14.85C15.5249 14.3154 15.2009 13.6148 14.7878 12.9695C14.6996 12.832 14.6078 12.697 14.5124 12.5645Z" fill="#1C54A8"/>
                        </svg>`,

      /// TOOLS ///
      readingGuide: `<svg width="22" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path class="accessibility-icon__path--fill" d="M26.2083 33.9167V30.8333H30.8333V26.2083H33.9167V31.6042C33.9167 32.2208 33.6083 32.6833 33.1458 33.1458C32.6833 33.6083 32.0667 33.9167 31.6042 33.9167H26.2083ZM10.7917 33.9167H5.39584C4.77918 33.9167 4.31668 33.6083 3.85418 33.1458C3.39168 32.6833 3.08334 32.0667 3.08334 31.6042V26.2083H6.16668V30.8333H10.7917V33.9167ZM26.2083 3.08334H31.6042C32.2208 3.08334 32.6833 3.39168 33.1458 3.85418C33.6083 4.31668 33.9167 4.77918 33.9167 5.39584V10.7917H30.8333V6.16668H26.2083V3.08334ZM10.7917 3.08334V6.16668H6.16668V10.7917H3.08334V5.39584C3.08334 4.77918 3.39168 4.31668 3.85418 3.85418C4.31668 3.39168 4.77918 3.08334 5.39584 3.08334H10.7917ZM29.2917 16.9583H7.70834V20.0417H29.2917V16.9583Z" fill="#1C54A8"/>
                     </svg>`,
      flashlight: `<svg  width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path class="accessibility-icon__path--fill" d="M2.43832 12.8333L2.33332 12.8333C1.69166 12.8333 1.16666 13.3583 1.16666 14C1.16666 14.6416 1.69166 15.1666 2.33332 15.1666L2.43832 15.1666C2.71148 16.7882 3.55052 18.2606 4.80644 19.3221C6.06236 20.3837 7.65387 20.9657 9.29832 20.965L18.6667 20.965C22.1667 20.965 25.0133 18.445 25.5617 15.1666L25.6667 15.1666C26.3083 15.1666 26.8333 14.6416 26.8333 14C26.8333 13.3583 26.3083 12.8333 25.6667 12.8333L25.5617 12.8333C25.2858 11.2066 24.4411 9.73066 23.1783 8.6687C21.9155 7.60675 20.3166 7.02777 18.6667 7.03496L9.29832 7.03497C5.83332 6.99997 2.98666 9.55496 2.43832 12.8333ZM9.33332 9.3333L9.33332 10.5L6.29999 10.5C7.10499 9.79996 8.16666 9.3333 9.33332 9.3333ZM22.68 11.6666C23.0883 12.355 23.3333 13.1483 23.3333 14C23.3333 14.8516 23.0883 15.645 22.68 16.3333L18.6667 16.3333L18.6667 11.6666L22.68 11.6666ZM17.5 16.3333L10.5 16.3333L10.5 11.6666L17.5 11.6666L17.5 16.3333ZM17.5 17.5L17.5 18.6316L10.5 18.6316L10.5 17.5L17.5 17.5ZM5.31999 16.3333C4.91166 15.645 4.66666 14.8516 4.66666 14C4.66666 13.1483 4.91166 12.355 5.31999 11.6666L9.33332 11.6666L9.33332 16.3333L5.31999 16.3333ZM10.5 10.5L10.5 9.3333L17.5 9.3333L17.5 10.5L10.5 10.5ZM6.29999 17.5L9.33332 17.5L9.33332 18.6316L9.29832 18.6316C8.16666 18.6316 7.10499 18.2 6.29999 17.5ZM18.6667 18.6316L18.6667 17.5L21.7 17.5C20.895 18.2 19.8333 18.6316 18.7017 18.6316L18.6667 18.6316ZM21.7 10.5L18.6667 10.5L18.6667 9.3333C19.8333 9.3333 20.895 9.79996 21.7 10.5Z" fill="#1C54A8"/>
                   </svg>`,
      hiddenImages: `<svg width="28" height="28" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path class="accessibility-icon__path--fill" d="M30.0625 4.625H11.5625C10.9492 4.625 10.361 4.86864 9.92732 5.30232C9.49364 5.73599 9.25 6.32419 9.25 6.9375V9.25H6.9375C6.32419 9.25 5.73599 9.49364 5.30232 9.92732C4.86864 10.361 4.625 10.9492 4.625 11.5625V30.0625C4.625 30.6758 4.86864 31.264 5.30232 31.6977C5.73599 32.1314 6.32419 32.375 6.9375 32.375H25.4375C26.0508 32.375 26.639 32.1314 27.0727 31.6977C27.5064 31.264 27.75 30.6758 27.75 30.0625V27.75H30.0625C30.6758 27.75 31.264 27.5064 31.6977 27.0727C32.1314 26.639 32.375 26.0508 32.375 25.4375V6.9375C32.375 6.32419 32.1314 5.73599 31.6977 5.30232C31.264 4.86864 30.6758 4.625 30.0625 4.625ZM11.5625 6.9375H30.0625V16.9651L27.6488 14.5514C27.2152 14.1181 26.6272 13.8746 26.0142 13.8746C25.4011 13.8746 24.8132 14.1181 24.3795 14.5514L13.4949 25.4375H11.5625V6.9375ZM25.4375 30.0625H6.9375V11.5625H9.25V25.4375C9.25 26.0508 9.49364 26.639 9.92732 27.0727C10.361 27.5064 10.9492 27.75 11.5625 27.75H25.4375V30.0625ZM15.0312 12.7188C15.0312 12.2614 15.1669 11.8143 15.421 11.434C15.6751 11.0537 16.0362 10.7573 16.4588 10.5823C16.8813 10.4073 17.3463 10.3615 17.7949 10.4507C18.2435 10.5399 18.6555 10.7602 18.9789 11.0836C19.3023 11.407 19.5226 11.819 19.6118 12.2676C19.701 12.7162 19.6552 13.1812 19.4802 13.6037C19.3052 14.0263 19.0088 14.3874 18.6285 14.6415C18.2482 14.8956 17.8011 15.0312 17.3438 15.0312C16.7304 15.0312 16.1422 14.7876 15.7086 14.3539C15.2749 13.9203 15.0312 13.3321 15.0312 12.7188Z" fill="#1C54A8"/>
                     </svg>`,
      screenReader: `<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path class="accessibility-icon__path--fill" d="M22.3126 17.6458C22.0987 17.4319 21.9867 17.1597 21.9766 16.8292C21.9665 16.4986 22.0688 16.1972 22.2834 15.925C22.8862 15.1861 23.3575 14.3547 23.6974 13.4307C24.0373 12.5067 24.2076 11.5298 24.2084 10.5C24.2084 9.48889 24.0381 8.5264 23.6974 7.61251C23.3568 6.69862 22.8854 5.87223 22.2834 5.13334C22.0695 4.86112 21.9626 4.55973 21.9626 4.22917C21.9626 3.89862 22.0793 3.61667 22.3126 3.38334C22.5848 3.11112 22.9107 2.97501 23.2903 2.97501C23.6698 2.97501 23.9759 3.11112 24.2084 3.38334C25.0251 4.37501 25.6668 5.47362 26.1334 6.67917C26.6001 7.88473 26.8334 9.15834 26.8334 10.5C26.8334 11.8417 26.6001 13.1153 26.1334 14.3208C25.6668 15.5264 25.0251 16.625 24.2084 17.6167C23.9751 17.8889 23.669 18.0301 23.2903 18.0402C22.9115 18.0503 22.5856 17.9188 22.3126 17.6458ZM18.5501 13.8833C18.3362 13.6694 18.2145 13.3922 18.1849 13.0515C18.1554 12.7108 18.2382 12.3756 18.4334 12.0458C18.5695 11.8125 18.6718 11.5648 18.7403 11.3027C18.8087 11.0406 18.8425 10.773 18.8418 10.5C18.8418 10.2278 18.8079 9.96023 18.7403 9.69734C18.6726 9.43445 18.5703 9.18673 18.4334 8.95417C18.239 8.62362 18.1561 8.2884 18.1849 7.94851C18.2137 7.60862 18.3354 7.33134 18.5501 7.11667C18.8223 6.84445 19.1529 6.71339 19.5418 6.72351C19.9306 6.73362 20.232 6.88412 20.4459 7.17501C20.7765 7.66112 21.039 8.18145 21.2334 8.73601C21.4279 9.29056 21.5251 9.87856 21.5251 10.5C21.5251 11.1222 21.4279 11.7106 21.2334 12.2652C21.039 12.8197 20.7765 13.3397 20.4459 13.825C20.232 14.1167 19.9306 14.2676 19.5418 14.2777C19.1529 14.2878 18.8223 14.1563 18.5501 13.8833ZM10.5001 15.1667C9.21675 15.1667 8.11814 14.7097 7.20425 13.7958C6.29036 12.8819 5.83342 11.7833 5.83342 10.5C5.83342 9.21667 6.29036 8.11806 7.20425 7.20417C8.11814 6.29028 9.21675 5.83334 10.5001 5.83334C11.7834 5.83334 12.882 6.29028 13.7959 7.20417C14.7098 8.11806 15.1668 9.21667 15.1668 10.5C15.1668 11.7833 14.7098 12.8819 13.7959 13.7958C12.882 14.7097 11.7834 15.1667 10.5001 15.1667ZM2.33342 24.5C2.00286 24.5 1.72559 24.388 1.50159 24.164C1.27759 23.94 1.16597 23.6631 1.16675 23.3333V21.2333C1.16675 20.5917 1.33203 19.9889 1.66259 19.425C1.99314 18.8611 2.45009 18.4333 3.03342 18.1417C4.02509 17.6361 5.14314 17.2083 6.38758 16.8583C7.63203 16.5083 9.00286 16.3333 10.5001 16.3333C11.9973 16.3333 13.3681 16.5083 14.6126 16.8583C15.857 17.2083 16.9751 17.6361 17.9668 18.1417C18.5501 18.4333 19.007 18.8611 19.3376 19.425C19.6681 19.9889 19.8334 20.5917 19.8334 21.2333V23.3333C19.8334 23.6639 19.7214 23.9412 19.4974 24.1652C19.2734 24.3892 18.9965 24.5008 18.6668 24.5H2.33342Z" fill="#1C54A8"/>
                     </svg>`,
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

        /// CONTENT ///
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

        /// COLORS ///
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

        /// TOOLS ///
        const spanNameTools = document.getElementById("spanNameTools");
        const spanNameReadingGuide = document.getElementById(
          "spanNameReadingGuide"
        );
        const spanNameFlashlight =
          document.getElementById("spanNameFlashlight");
        const spanNameHiddenImages = document.getElementById(
          "spanNameHiddenImages"
        );
        const spanNameScreenReader = document.getElementById(
          "spanNameScreenReader"
        );

        if (lang === "ro") {
          this.state.lang = "ro";
          document.dispatchEvent(new Event("langChanged"));
          //main
          accessibilityTitle.innerText = "SETARI ACCESIBILITATE";
          spanNameContentAdjusting.innerText = "AJUSTARE CONTINUT";
          //content
          spanNameContentScaling.innerText = "SCALARE CONTINUT";
          spanNameFontSizing.innerText = "MARIME FONT";
          spanNameLineHeight.innerText = "SPATIERE RANDURI";
          spanNameLetterSpacing.innerText = "SPATIERE LITERE";
          spanNameTitlesHighlight.innerText = "TITLURI EVIDENTIATE";
          spanNameLinksHighlight.innerText = "LINKURI EVIDENTIATE";

          //colors
          spanNameColorAdjustments.innerText = "AJUSTARE CULORI";
          spanNameContrast.innerText = "CONTRAST";
          spanNameSaturation.innerText = "SATURATIE";
          spanNameColorsInversed.innerText = "INVERSARE CULORI";
          spanNameWhiteBackground.innerText = "FUNDAL ALB";

          //tools
          spanNameTools.innerText = "UNELTE";
          spanNameReadingGuide.innerText = "GHID CITIRE";
          spanNameFlashlight.innerText = "LANTERNA";
          spanNameHiddenImages.innerText = "IMAGINI ASCUNSE";
          spanNameScreenReader.innerText = "CITITOR ECRAN";

          accessibilityLangSlider.classList.remove(
            "accessibility-language__slider--eng"
          );
          accessibilityLangSlider.classList.add(
            "accessibility-language__slider--ro"
          );
        }

        if (lang === "eng") {
          this.state.lang = "eng";
          document.dispatchEvent(new Event("langChanged"));

          accessibilityTitle.innerText = "ACCESSIBILITY SETTINGS";
          spanNameContentAdjusting.innerText = "CONTENT ADJUSTING";
          //content
          spanNameContentScaling.innerText = "CONTENT SCALING";
          spanNameFontSizing.innerText = "FONT SIZING";
          spanNameLineHeight.innerText = "LINE HEIGHT";
          spanNameLetterSpacing.innerText = "LETTER SPACING";
          spanNameTitlesHighlight.innerText = "TITLES HIGHLIGHT";
          spanNameLinksHighlight.innerText = "LINKS HIGHLIGHT";

          //colors
          spanNameColorAdjustments.innerText = "COLORS ADJUSTING";
          spanNameContrast.innerText = "CONTRAST";
          spanNameSaturation.innerText = "SATURATION";
          spanNameColorsInversed.innerText = "COLORS INVERSED";
          spanNameWhiteBackground.innerText = "WHITE BACKGROUND";

          spanNameTools.innerText = "TOOLS";
          spanNameReadingGuide.innerText = "READING GUIDE";
          spanNameFlashlight.innerText = "FLASHLIGHT";
          spanNameHiddenImages.innerText = "HIDDEN IMAGES";
          spanNameScreenReader.innerText = "SCREEN READER";

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
      const accessibilityThemeBtn = document.getElementById('accessibilityThemeBtn')

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

      accessibilityThemeBtn.addEventListener('click', () => {
          this.#dom.state.theme === 'light' ?
          this.#setTheme('dark') :
          this.#setTheme('light')
        })
    },

    //bind this -> contentAdjustments
    //prettier-ignore
    contentAdjusting() {
      const contentResetBtn = document.getElementById('contentResetBtn')
      const plusBtnContentScaling = document.getElementById('plusBtnContentScaling')
      const minusBtnContentScaling = document.getElementById('minusBtnContentScaling')
      const plusBtnFontSizing = document.getElementById("plusBtnFontSizing");
      const minusBtnFontSizing = document.getElementById("minusBtnFontSizing");
      const plusBtnLineHeight = document.getElementById("plusBtnLineHeight");
      const minusBtnLineHeight = document.getElementById("minusBtnLineHeight");
      const plusBtnLetterSpacing = document.getElementById("plusBtnLetterSpacing");
      const minusBtnLetterSpacing = document.getElementById("minusBtnLetterSpacing");
      const btnTitlesHighlight = document.getElementById("btnTitlesHighlight");
      const btnLinksHighlight = document.getElementById("btnLinksHighlight");

      contentResetBtn.addEventListener('click', () => this.reset())

      plusBtnContentScaling.addEventListener('click', () => this.contentScaling.increase())
      minusBtnContentScaling.addEventListener('click', () => this.contentScaling.decrease())

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
      const resetBtn = document.getElementById('accessibilityToolsResetBtn')
      const btnReadingGuide = document.getElementById('btnReadingGuide')
      const btnFlashlight = document.getElementById('btnFlashlight')
      const btnHideImages = document.getElementById('btnHiddenImages')
      const btnScreenReader = document.getElementById('btnScreenReader')

      resetBtn.addEventListener('click', () => this.reset())

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

      btnScreenReader.addEventListener('click', () => {
        this.state.isScreenReader ?
        this.screenReader.off() :
        this.screenReader.on()
      })
    },
  };

  //prettier-ignore
  #setTheme(theme) {
    if (theme === "dark") {
      this.#dom.state.theme = "dark";
      this.#dom.switchThemeIcon('light')
      document.documentElement.style.setProperty("--background","#0B1732")
      document.documentElement.style.setProperty("--sectionBackground","#000B1B");   
      document.documentElement.style.setProperty("--button","#0A3B85");         
      document.documentElement.style.setProperty("--component","#15253B");   
      document.documentElement.style.setProperty("--componentBtns","#000B1B");   
      document.documentElement.style.setProperty("--offToggledBtn","#061420");   
      document.documentElement.style.setProperty("--text","#ebebeb");   
      document.documentElement.style.setProperty("--slider","#ebebeb");   
      document.documentElement.style.setProperty("--componentName","#c0d9ff");  
   
    }

    if (theme === "light") {
      this.#dom.state.theme = "light";
      this.#dom.switchThemeIcon('dark')
      document.documentElement.style.setProperty('--background', '#c0d9ff')
      document.documentElement.style.setProperty("--sectionBackground","#eaf1fc");
      document.documentElement.style.setProperty("--button","#327def");
      document.documentElement.style.setProperty("--component","#fff");
      document.documentElement.style.setProperty("--componentBtns","#c0d9ff"); 
      document.documentElement.style.setProperty("--offToggledBtn","#85B6FF");    
      document.documentElement.style.setProperty("--text","#1c54a8"); 
      document.documentElement.style.setProperty("--slider","#327def"); 
      document.documentElement.style.setProperty("--componentName","#1c54a8");  
    }
  }

  //prettier-ignore
  #bindObjects() {
    this.#helpersFunc.bindObj(this.contentAdjustments.contentScaling,"resizeContent",this.contentAdjustments);
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
    this.#helpersFunc.bindObj(this.tools.screenReader,"off",this.tools);
    this.#helpersFunc.bindObj(this.tools.screenReader,"off",this.tools);

    
    this.#helpersFunc.bindObj(this.#dom._util, "setLang",this.#dom);

    this.#helpersFunc.bindObj(this.#controller,"contentAdjusting",this.contentAdjustments);  
    this.#helpersFunc.bindObj(this.#controller,"colorAdjusting",this.colorAdjustments);   
    this.#helpersFunc.bindObj(this.#controller,"tools",this.tools);   
  }

  #helpersFunc = {
    bindObj(targetObj, methodName, objToBind) {
      targetObj[methodName] = targetObj[methodName].bind(objToBind);
    },
    wrapBody() {
      let bodyWrapper = document.createElement("div");
      bodyWrapper.id = "bodyWrapper";
      let bodyChildren = Array.from(document.body.children);
      for (let i = 0; i < bodyChildren.length; i++) {
        if (bodyChildren[i].id === "accessibilityMenu") continue;
        if (bodyChildren[i].tagName === "SCRIPT") continue;
        bodyWrapper.appendChild(bodyChildren[i]);
      }
      document.body.prepend(bodyWrapper);
    },
    unwrapBody() {
      let bodyWrapper = document.getElementById("bodyWrapper");
      if (bodyWrapper) {
        let bodyChildren = Array.from(bodyWrapper.children);
        for (let i = 0; i < bodyChildren.length; i++) {
          document.body.appendChild(bodyChildren[i]);
        }
        bodyWrapper.remove();
      }
    },
  };
}

export default new Accessibility();
