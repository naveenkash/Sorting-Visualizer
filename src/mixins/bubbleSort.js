export default {
  methods: {
    async bubbleSort() {
      let array = this.array,
        length = this.array.length,
        swapped = false;
      for (let i = 0; i < length - 1; i++) {
        swapped = false;
        let j = 0;
        for (j = 0; j < length - i - 1; j++) {
          let bars = document.querySelectorAll(".bar");
          await new Promise((resolve) => {
            bars[j] ? bars[j].classList.add("current") : "";
            bars[j + 1] ? bars[j + 1].classList.add("current") : "";
            if (array[j] > array[j + 1]) {
              // swap
              let temp = array[j];
              array[j] = array[j + 1];
              array[j + 1] = temp;
              swapped = true;
            }
            setTimeout(() => {
              resolve();
            }, this.speed);
          });
          // set default color back
          bars[j] ? bars[j].classList.remove("current") : "";
          bars[j + 1] ? bars[j + 1].classList.remove("current") : "";
        }
        // no swap done array sorted
        if (swapped == false) break;
        this.array = array;
      }
      this.finish();
    },
  },
};
