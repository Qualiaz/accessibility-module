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
}

export default new Accessibility();
