export default {
  methods: {
    async mergeSort(start, end) {
      if (start < end) {
        let mid = Math.floor((start + end) / 2);
        await new Promise((resolve) => {
          this.$nextTick(async () => {
            await this.mergeSort(start, mid);
            setTimeout(() => {
              resolve();
            }, this.speed);
          });
        });
        await new Promise((resolve) => {
          this.$nextTick(async () => {
            await this.mergeSort(mid + 1, end);
            setTimeout(() => {
              resolve();
            }, this.speed);
          });
        });
        await this.merge(start, mid, end);
      }
    },
    async merge(start, mid, end) {
      // create a temp array
      let temp = new Array(end - start + 1),
        i = start,
        j = mid + 1,
        k = 0;
      // traverse both arrays and in each iteration add smaller of both elements in temp
      while (i <= mid && j <= end) {
        let bars = document.querySelectorAll(".bar"),
          tempI = i,
          tempJ = j;
        await new Promise((resolve) => {
          bars[tempI].classList.add("current");
          bars[tempJ].classList.add("current");
          if (this.array[i] <= this.array[j]) {
            temp[k] = this.array[i];
            k++;
            i++;
          } else {
            temp[k] = this.array[j];
            k++;
            j++;
          }
          setTimeout(() => {
            resolve();
          }, this.speed);
        });
        bars[tempI] ? bars[tempI].classList.remove("current") : "";
        bars[tempJ] ? bars[tempJ].classList.remove("current") : "";
      }
      // add elements left in the first array
      while (i <= mid) {
        temp[k] = this.array[i];
        k++;
        i++;
      }
      // add elements left in the second array
      while (j <= end) {
        temp[k] = this.array[j];
        k++;
        j++;
      }
      // copy temp to original array
      for (i = start; i <= end; i++) {
        await new Promise((resolve) => {
          this.array[i] = temp[i - start];
          setTimeout(() => {
            resolve();
          }, this.speed);
        });
      }
    },
  },
};
