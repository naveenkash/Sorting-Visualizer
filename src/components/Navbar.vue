<template>
  <nav class="navbar-wrapper">
    <div class="navbar-container border-bottom">
      <div class="navbar">
        <span
          @click.prevent="generate"
          class="generate-btn navbar-link"
          :class="{ disable: started }"
          >Generate New Array</span
        >
        <span class="slider-wrapper" :class="{ disable: started }"
          >Array Length
          <input
            type="range"
            v-model="arrayVal"
            @input="updateArrayLength"
            min="5"
            max="200"
            :disabled="started"
            class="slider"
            :class="{ disable: started }"
        /></span>
        <span class="slider-wrapper" :class="{ disable: started }"
          >Sorting Speed
          <input
            type="range"
            v-model="speedVal"
            min="10"
            max="400"
            :disabled="started"
            class="slider"
            :class="{ disable: started }"
            @input="updateSortingSpeed"
        /></span>
        <div class="dropdown dropdown-algo navbar-link">
          <div
            @click.stop="showDropDown"
            class="algo-info"
            :class="{ disable: started }"
          >
            <label ref="algoLabel">Algorithms</label>
            <span><i ref="dropdownIcon" class="fas fa-chevron-down"></i></span>
          </div>
          <ul ref="dropdownUl" class="navbar-items">
            <li
              v-for="(item, i) in navList"
              :key="item + i"
              class="navbar-item"
              :class="{ disable: started }"
              :id="item.id"
              @click.stop="selectAlgorithm(item.id, item.text)"
            >
              <span>{{ item.text }}</span>
            </li>
          </ul>
        </div>
        <span
          v-if="selected"
          @click.prevent="start"
          class="navbar-link sort-btn"
          :class="{ disable: started, active: started }"
          >Sort</span
        >
        <span
          @click.prevent="changeBarDirection"
          class="navbar-link sort-btn"
          :class="{ disable: started, active: barDirChanged }"
          >Change Bar Direction</span
        >
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  name: "Navbar",
  emits: [
    "sort-algo-select",
    "start-sort-click",
    "generate-new",
    "change-array-length",
    "change-sorting-speed",
    "change-bar-dir",
  ],
  data() {
    return {
      navList: [
        { text: "Bubble Sort", id: "bubbleSort" },
        { text: "Merge Sort", id: "mergeSort" },
        { text: "Quick Sort", id: "quickSort" },
        { text: "Heap Sort", id: "heapSort" },
        { text: "Insertion Sort", id: "insertionSort" },
        { text: "Selection Sort", id: "selectionSort" },
      ],
      arrayVal: 100,
      speedVal: 100,
      openDropDown: false,
      selected: false,
      started: false,
      barDirChanged: false,
    };
  },
  mounted() {
    document.addEventListener("click", (e) => {
      this.$nextTick(() => {
        if (!this.$refs.dropdownUl.contains(e.target) && this.openDropDown) {
          this.openDropDown = !this.openDropDown;
          this.$refs.dropdownIcon.style.transition = "0.3s";
          this.$refs.dropdownIcon.style.transform = "rotate(0deg)";
          this.$refs.dropdownUl.style.display = "none";
        }
      });
    });
  },
  methods: {
    showDropDown() {
      if (this.started) {
        return;
      }
      let dropDownUl = this.$refs.dropdownUl;
      this.openDropDown = !this.openDropDown;
      if (this.openDropDown) {
        this.$refs.dropdownIcon.style.transition = "0.3s";
        this.$refs.dropdownIcon.style.transform = "rotate(180deg)";
        dropDownUl.style.display = "block";
      } else {
        this.$refs.dropdownIcon.style.transition = "0.3s";
        this.$refs.dropdownIcon.style.transform = "rotate(0deg)";
        dropDownUl.style.display = "none";
      }
    },
    updateArrayLength() {
      if (this.started) {
        return;
      }
      this.$emit("change-array-length", this.arrayVal);
    },
    updateSortingSpeed() {
      if (this.started) {
        return;
      }
      this.$emit("change-sorting-speed", this.speedVal);
    },
    selectAlgorithm(algoSelect, algoText) {
      if (this.started) {
        return;
      }
      let algoLabel = this.$refs.algoLabel;
      algoLabel.innerText = algoText;
      this.$emit("sort-algo-select", algoSelect);
      this.selected = true;
      this.showDropDown();
    },
    start() {
      if (this.selected && !this.started) {
        this.$emit("start-sort-click", true);
        this.started = true;
      }
    },
    generate() {
      if (this.started) {
        return;
      }
      this.$emit("generate-new", true);
    },
    changeBarDirection() {
      if (this.started) {
        return;
      }
      this.barDirChanged = !this.barDirChanged;
      this.$emit("change-bar-dir", this.barDirChanged);
    },
  },
};
</script>

<style lang="css" scoped>
.navbar-wrapper {
  width: 100%;
  height: auto;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}
.navbar {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  padding: 0 20px;
  position: relative;
}
.navbar-container {
  width: 100%;
  height: auto;
  padding: 10px 0;
  position: relative;
  z-index: 1000;
  background: #dfe4ed;
}
.slider {
  margin: 0;
  margin-left: 5px;
  cursor: pointer;
}
.algo-info {
  cursor: pointer;
}
.algo-info label {
  margin-right: 10px;
}
.navbar-link {
  cursor: pointer;
  margin: 0 8px;
  display: flex;
  align-items: center;
  padding: 4px;
}
.slider-wrapper {
  margin: 0 8px;
  display: flex;
  align-items: center;
}
.navbar-link:hover {
  color: #2472ff;
}
.active {
  background: #2472ff !important;
  color: rgb(255, 255, 255) !important;
}
.dropdown {
  position: relative;
}
.dropdown ul {
  position: absolute;
  top: 100%;
  left: 0;
  margin: 0;
  display: none;
  list-style-type: none;
  width: 200px;
  height: auto;
  background-color: #dfe4ed;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  padding: 8px;
  margin-left: 15px;
}
.dropdown ul li {
  list-style-type: none;
  border-radius: 6px;
  width: auto;
  height: 100%;
  display: block;
  font-size: 16px;
  align-items: center;
  padding: 8px 14px;
  transition: 0.3s;
  cursor: pointer;
  margin-bottom: 4px;
  border-radius: 40px;
}
.dropdown ul li:hover span {
  color: #2472ff;
}
.navbar-item span {
  text-decoration: none;
  color: rgb(51, 51, 51);
  font-weight: lighter;
  font-size: 16px;
}
.disable {
  cursor: not-allowed;
  color: #8f8d8d !important;
}
</style>