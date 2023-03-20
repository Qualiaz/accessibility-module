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
  };
}

export default new Accessibility();
