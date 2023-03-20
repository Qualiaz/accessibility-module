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
        const paragraphs = document.querySelectorAll("p");
        if (direction === "increase") {
          this.state.textSize += 0.01;
        }
        if (direction === "decrease") {
          this.state.textSize -= 0.01;
        }
        paragraphs.forEach((paragraph) => {
          const elStyles = window.getComputedStyle(paragraph);
          const elFontSize = elStyles.getPropertyValue("font-size");

          const size = parseInt(elFontSize);
          if (!paragraph.dataset.initialFontSize) {
            paragraph.dataset.initialFontSize = size;
          }

          const unit = elFontSize.substring(size.toString().length);

          const newSize =
            paragraph.dataset.initialFontSize * this.state.textSize;

          paragraph.style.fontSize = Math.floor(newSize) + unit;
        });
      },
    },
  };
}

export default new Accessibility();
