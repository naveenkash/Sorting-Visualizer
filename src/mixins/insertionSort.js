export default {
  methods: {
    async insertionSort() {
      let array = this.array,
        length = this.array.length;
      for (let i = 1; i < length; i++) {
        let bars = document.querySelectorAll(".bar"),
          startedVal = array[i],
          j = i,
          swapped = false;
        while (j > 0 && array[j - 1] > startedVal) {
          await new Promise((resolve) => {
            this.$nextTick(async () => {
              bars = document.querySelectorAll(".bar");
              bars[j - 1].classList.add("current");
              array[j] = array[j - 1];
              j--;
              swapped = true;
              setTimeout(() => {
                resolve();
              }, this.speed);
            });
          });
          // set default color back
          bars[j].classList.remove("current");
        }
        if (swapped) {
          array[j] = startedVal;
        }
        this.array = array;
      }
      this.finish();
    },
  },
};
