<template>
  <div id="listMenu" class="h-full bg-gray-100">
    <!-- store name -->
    <div
      class="
        h-1/4
        p-2
        border-t-4
        grid grid-cols-3
        gap-2
        content-center
        items-center
        text-gray-600
        overflow-y-auto
      "
    >
      <div class="flex justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-12 w-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      </div>
      <div class="col-span-2 uppercase text-sm">
        <p class="text-xs mb-2 underline">{{ userInfo.info.name }}</p>
        <div class="font-bold">
          <select
            @change="selectStore()"
            v-model="selectedStore"
            class="w-full border-2 p-2 rounded-lg bg-gray-200"
          >
            <option
              v-for="store in userInfo.info.stores"
              :key="store.key"
              :value="store.id"
            >
              {{ store.name }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <!-- list Menu -->
    <div
      id="listMenuItems"
      class="
        h-3/4
        grid grid-flow-row
        auto-rows-min
        gap-1
        px-4
        pt-1
        pb-20
        rounded-t-3xl
        bg-gray-100
        overflow-y-auto
      "
    >
      <!-- <router-link to="/home" class="py-4 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
          />
        </svg>
        <p class="ml-1">Dashboard</p>
      </router-link> -->
      <div @click="showReports()" class="py-4 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <p class="ml-1 flex-grow">Reports</p>
        <svg
          v-if="showAllReports === false"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
        <svg
          v-if="showAllReports === true"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <div v-if="showAllReports === true">
        <router-link to="/sales-summary" class="py-4 pl-4 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p class="ml-1">Sales - Summary</p>
        </router-link>
        <router-link to="/recap-cashier" class="py-4 pl-4 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <p class="ml-1">Recap Cashier</p>
        </router-link>
      </div>
      <!-- <router-link to="/home" class="py-4 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
        <p class="ml-1">Point of Sale</p>
      </router-link> -->
    </div>

    <!-- logout -->
    <button
      @click="logOut()"
      class="
        fixed
        flex
        items-center
        bottom-2
        left-4
        bg-gray-400
        text-gray-50
        rounded-xl
        shadow-lg
        px-2
        py-1
      "
    >
      <p class="mr-1">keluar</p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
        />
      </svg>
    </button>
  </div>
</template>

<style>
#listMenu a.router-link-exact-active {
  color: #447246;
  background-color: transparent;
}
</style>

<script>
import axios from "axios";
let apiHost = process.env.VUE_APP_BACKEND_HOST;

export default {
  name: "SideMenu",
  components: {},

  data() {
    return {
      userInfo: {
        token: "",
        info: {
          user_id: null,
          username: "",
          name: "",
          warehouses: [
            {
              id: null,
              name: "",
              address: "",
            },
          ],
          stores: [
            {
              id: null,
              name: "",
              address: "",
            },
          ],
        },
      },
      showAllReports: true,

      selectedStore: null,
    };
  },

  created() {
    this.userInfo = JSON.parse(localStorage.getItem("user"));
    this.selectedStore = localStorage.getItem("selectedStore");
  },

  methods: {
    showReports() {
      if (this.showAllReports === false) {
        this.showAllReports = true;
      } else {
        this.showAllReports = false;
      }
    },

    selectStore() {
      localStorage.setItem("selectedStore", this.selectedStore);
      this.$router.go();
    },

    async logOut() {
      try {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("receipt");
        this.$router.push("/");
        let headers = { Authorization: `Bearer ${this.userInfo.token}` };
        await axios.get(apiHost + "/api/logout", {
          headers,
        });
      } catch (error) {
        console.log(error.response);
      }
    },
  },
};
</script>
