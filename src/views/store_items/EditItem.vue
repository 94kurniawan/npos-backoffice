<template>
  <div id="container" class="h-full relative bg-white">
    <div class="relative h-full w-full p-3">
      <div class="bg-white h-full overflow-y-auto pb-20">
        <div class="sticky top-0 bg-modern-green text-white">
          <p class="text-center uppercase p-3 md:mb-3 font-bold">Edit Item</p>
        </div>
        <div class="py-3 px-2 grid grid-flow-row grid-cols-1 md:grid-cols-2">
          <p class="py-2 text-sm text-gray-500">Item Name</p>
          <input
            v-model="item.name"
            type="text"
            name="itemName"
            class="p-3 border rounded"
          />
        </div>
      </div>
    </div>

    <!-- back button -->
    <button @click="goBack()" type="submit" class="absolute top-6 left-4 z-20">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>
  </div>
</template>

<script>
import moment from "moment";
import "moment/locale/id";
import * as numberFormat from "@/custom_package/number.js";
import axios from "axios";
let apiHost = process.env.VUE_APP_BACKEND_HOST;

export default {
  name: "EditItem",
  components: {},

  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
      item: {},
    };
  },

  methods: {
    currency(number) {
      return numberFormat.currency(number);
    },
    separator(number) {
      return numberFormat.separator(number);
    },
    formatDateInIDN(date) {
      return moment(date).format("LL");
    },
    goBack() {
      this.$router.go(-1);
    },
    getItem() {
      this.item = JSON.parse(localStorage.getItem("itemSelected"));
      localStorage.removeItem("itemSelected");
    },
  },

  mounted() {
    this.getItem();
  },
};
</script>
