export default {
  methods: {
    async selectionSort() {
      let array = this.array,
        length = this.array.length,
        minIndex = 0;
      for (let i = 0; i < length; i++) {
        await this.$nextTick(async () => {
          let bars = document.querySelectorAll(".bar"),
            minimunFound = false;
          minIndex = i;
          bars[i].classList.add("current");
          for (let j = i + 1; j < length; j++) {
            await new Promise((resolve) => {
              bars[j].classList.add("current");
              if (array[j] < array[minIndex]) {
                //remove previous min node class
                bars[minIndex].classList.remove("swaping");
                minIndex = j;
                bars[minIndex].classList.add("swaping");
                minimunFound = true;
              }
              setTimeout(() => {
                resolve();
              }, this.speed);
            });
            // set default color back
            bars[j].classList.remove("current");
          }
          // set default color back
          bars[i].classList.remove("current");
          bars[minIndex].classList.remove("swaping");
          //swap
          if (minimunFound) {
            let temp = array[minIndex];
            array[minIndex] = array[i];
            array[i] = temp;
          }
          this.array = array;
        });
      }
      this.finish();
    },
  },
};
