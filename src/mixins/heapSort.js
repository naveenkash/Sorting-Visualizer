export default {
  methods: {
    async heapSort() {
      let array = this.array;
      let length = array.length;
      let startIdx = Math.floor(length / 2);
      for (let i = startIdx; i >= 0; i--) {
        await this.heapify(array, i, length);
      }
      let n = length - 1;
      while (n >= 0) {
        await new Promise((resolve) => {
          this.$nextTick(async () => {
            let temp = array[0];
            array[0] = array[n];
            array[n] = temp;
            n--;
            //passing n to heapify method to stop heapifying element from end again
            await this.heapify(array, 0, n);
            setTimeout(() => {
              resolve();
            }, this.speed);
          });
        });
      }
    },
    async heapify(array, index, n) {
      let leftChild = 2 * index + 1,
        rightChild = 2 * index + 2,
        length = n,
        largest = index;
      if (leftChild <= length && array[leftChild] > array[largest]) {
        largest = leftChild;
      }
      if (rightChild <= length && array[rightChild] > array[largest]) {
        largest = rightChild;
      }
      if (largest !== index) {
        let bars = document.querySelectorAll(".bar");
        await new Promise((resolve) => {
          bars[largest].classList.add("current");
          bars[index].classList.add("current");
          let temp = array[largest];
          array[largest] = array[index];
          array[index] = temp;
          setTimeout(() => {
            resolve();
          }, this.speed);
        });
        bars[index].classList.remove("current");
        bars[largest].classList.remove("current");
        await this.heapify(array, largest, n);
      }
    },
  },
};
