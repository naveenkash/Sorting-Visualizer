<template>
  <div class="sort">
    <ul class="sort-container" :class="{ 'bar-dir': barDir }">
      <li
        :style="{ height: item + 'px', width: width + 'px' }"
        :key="item"
        v-for="item in array"
        class="bar"
      ></li>
    </ul>
  </div>
</template>

<script>
import BubbleSort from "../mixins/bubbleSort";
import InsertionSort from "../mixins/insertionSort";
import MergeSort from "../mixins/mergeSort";
import SelectionSort from "../mixins/selectionSort";
import HeapSort from "../mixins/heapSort";
import QuickSort from "../mixins/quickSort";
export default {
  name: "Sort",
  props: ["sortAlgo","barDir"],
  mixins: [
    BubbleSort,
    InsertionSort,
    MergeSort,
    SelectionSort,
    HeapSort,
    QuickSort,
  ],
  emits: ["sorted"],
  data() {
    return {
      length: 100,
      array: [],
      speed: 100,
      width: 0,
    };
  },
  mounted() {
    this.generate();
  },
  methods: {
    generate() {
      this.reset();
      this.array = [];
      this.createItems(this.length);
    },
    createItems(length) {
      let map = new Map();
      for (let i = 0; i < length; i++) {
        // height min 100 max 500
        let value = Math.floor(Math.random() * 400 + 100);
        if (map.get(value)) {
          while (map.get(value)) {
            // height min 100 max 500
            value = Math.floor(Math.random() * 400 + 100);
          }
        }
        map.set(value, value);
        this.array.push(value);
      }
      this.width =
        document.querySelector(".sort-container").clientWidth / this.length;
    },
    updateArrayLength(arrayLength) {
      this.reset();
      this.array = [];
      this.length = arrayLength;
      this.createItems(arrayLength);
    },
    async finish() {
      this.$nextTick(async () => {
        let bars = document.querySelectorAll(".bar");
        for (let i = 0; i < this.array.length; i++) {
          await new Promise((resolve) => {
            bars[i].classList.add("current");
            setTimeout(() => {
              resolve();
            }, 20);
          });
        }
        this.$emit("sorted", true);
      });
    },
    reset() {
      let bars = document.querySelectorAll(".bar");
      for (let i = 0; i < this.array.length; i++) {
        bars[i].classList.remove("current");
        bars[i].classList.remove("swaping");
      }
    },
    async startSort() {
      if (this.sortAlgo && this.sortAlgo.length > 0 && this[this.sortAlgo]) {
        if (this.sortAlgo == "mergeSort") {
          await this[this.sortAlgo](0, this.array.length - 1);
        } else if (this.sortAlgo == "quickSort") {
          await this[this.sortAlgo](0, this.array.length - 1);
        } else {
          await this[this.sortAlgo]();
        }
        this.finish();
      } else {
        alert("Please select a algorithm to sort!");
        this.$emit("sorted", true);
      }
    },
  },
};
</script>
<style lang="css" scoped>
.sort {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100vh;
}
.bar-dir {
  align-items: baseline;
}
.sort-container {
  width: 800px;
  height: 600px;
  padding: 0;
  margin: 0;
  display: flex;
  margin-top: 55px;
}
.bar {
  background: #00d2d6;
  margin: 0 1px;
  list-style: none;
}
.current {
  background: #7255c2 !important;
}
.swaping {
  background: red;
}
</style>
