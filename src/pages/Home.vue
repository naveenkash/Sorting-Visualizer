<template>
  <div>
    <Navbar
      @sort-algo-select="setAlgo"
      @start-sort-click="sort"
      @generate-new="generate"
      @change-array-length="updateArrayLength"
      @change-sorting-speed="updateSortingSpeed"
      @change-bar-dir="changeBarDirection"
      ref="navbar"
    />
    <SortingVisualizer
      :sortAlgo="algo"
      ref="sort"
      @sorted="enableNavbaritems"
      :barDir="barDir"
    />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import SortingVisualizer from "@/components/SortingVisualizer.vue";
export default {
  name: "Home",
  components: {
    Navbar,
    SortingVisualizer,
  },
  data() {
    return {
      algo: "",
      start: false,
      barDir: false,
    };
  },
  methods: {
    setAlgo(algo) {
      this.algo = algo;
    },
    sort() {
      this.$refs.sort.startSort();
    },
    generate() {
      this.$refs.sort.generate();
    },
    updateArrayLength(arrayLength) {
      this.$refs.sort.updateArrayLength(arrayLength);
    },
    updateSortingSpeed(speed) {
      this.$refs.sort.speed = speed;
    },
    enableNavbaritems() {
      this.$refs.navbar.started = false;
    },
    changeBarDirection(val) {
      this.barDir = val;
    },
  },
};
</script>
