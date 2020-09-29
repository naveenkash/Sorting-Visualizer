export default {
  methods: {
    async quickSort(left, right) {
      let pivot = right,
        partitionIndex = null;
      if (left < right) {
        partitionIndex = await this.partitionQuickSort(pivot, left, right);
        await new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, this.speed);
        });
        await this.quickSort(left, partitionIndex - 1);
        // await new Promise((resolve) => {
        //   setTimeout(() => {
        //     resolve();
        //   }, this.speed);
        // });
        await this.quickSort(partitionIndex + 1, right);
      }
    },
    async partitionQuickSort(pivot, left, right) {
      let pivotValue = this.array[pivot],
        partitionIndex = left,
        bars = document.querySelectorAll(".bar");
      for (let i = left; i < right; i++) {
        bars = document.querySelectorAll(".bar");
        await new Promise((resolve) => {
          if (this.array[i] < pivotValue) {
            bars[i].classList.add("current");
            bars[partitionIndex].classList.add("current");
            bars[pivot].classList.add("swaping");
            let temp = this.array[i];
            this.array[i] = this.array[partitionIndex];
            this.array[partitionIndex] = temp;
            partitionIndex++;
          }
          setTimeout(() => {
            resolve();
          }, this.speed);
        });
        bars[i].classList.remove("current");
        bars[partitionIndex - 1]
          ? bars[partitionIndex - 1].classList.remove("current")
          : "";
      }
      bars[pivot].classList.remove("swaping");
      let temp = this.array[partitionIndex];
      this.array[partitionIndex] = this.array[right];
      this.array[right] = temp;
      return partitionIndex;
    },
  },
};
