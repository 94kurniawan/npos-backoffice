<template>
  <div id="container" class="h-full relative bg-white">
    <div class="relative h-full w-full p-3">
      <div class="bg-white h-full overflow-y-auto pb-20">
        <div class="bg-white sticky top-0">
          <p class="text-center uppercase p-3 md:mb-3 font-bold">
            Stock Adjustment
          </p>
          <div
            class="
              grid
              items-center
              content-center
              justify-items-center
              grid-cols-2
              md:grid-cols-8
              gap-1
            "
          >
            <label class="mobile:hidden col-start-2 px-2">Period</label>
            <input
              @change="fetchAdjustmentHistory()"
              v-model="datePeriod.from"
              type="date"
              class="
                md:col-span-2
                w-full
                bg-white
                p-3
                border-2
                outline-none
                rounded-lg
              "
            />
            <input
              @change="fetchAdjustmentHistory()"
              v-model="datePeriod.to"
              type="date"
              class="
                md:col-span-2
                w-full
                bg-white
                p-3
                border-2
                outline-none
                rounded-lg
              "
            />
            <select
              @change="fetchAdjustmentHistory()"
              v-model="store_id"
              class="
                col-span-2
                w-full
                bg-white
                px-3
                py-3.5
                border-2
                outline-none
                rounded-lg
              "
            >
              <option
                v-for="store in user.info.stores"
                :key="store.key"
                :value="store.id"
              >
                {{ store.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="py-3 w-full">
          <div class="flex justify-end">
            <router-link to="/create-adjustment">
              <button
                class="
                  bg-modern-green
                  text-white
                  py-2
                  px-3
                  rounded
                  flex
                  items-center
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Buat Penyesuaian Baru
              </button>
            </router-link>
          </div>
          <table class="w-full">
            <thead class="sticky top-28 bg-white text-sm">
              <tr class="uppercase">
                <th class="py-3 px-4 text-left">Tanggal</th>
                <th class="py-3 px-4 text-left">item</th>
                <th class="py-3 px-4 text-right">note</th>
              </tr>
            </thead>
            <tbody class="text-gray-800 text-sm font-light">
              <tr
                v-for="data in adjustmentHistory"
                :key="data.key"
                class="
                  border-b border-gray-200
                  hover:bg-gray-100
                  odd:bg-gray-50
                  align-top
                "
              >
                <td class="py-3 px-4 text-left">
                  {{ formatDateInIDN(data.date) }}
                  <!-- <p>(id: {{ data.id }})</p> -->
                </td>
                <td class="py-3 px-4 text-left">
                  <table class="w-full">
                    <tbody v-for="item in data.ingredients" :key="item.key">
                      <tr class="border-b-2">
                        <td>
                          <p class="font-bold"># {{ item.name }}</p>
                          <p>Stok Sebelumnya = {{ item.previous_stock }}</p>
                        </td>
                        <td class="text-left">
                          <p>Stok Saat ini</p>
                          <p>= {{ item.quantity }} {{ item.unit }}</p>
                        </td>
                      </tr>
                      <!-- <tr v-if="item.note != null">
                  <td>Note: {{ item.note }}</td>
                </tr> -->
                    </tbody>
                  </table>
                </td>
                <td class="py-3 px-4 text-right">{{ data.note }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- print button -->
    <!-- <button
      @click="print()"
      type="submit"
      class="
        absolute
        flex
        bg-blue-400
        text-white
        p-3
        rounded
        items-center
        bottom-6
        left-4
      "
    >
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
          d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
        />
      </svg>
      <p class="px-1">Print</p>
    </button> -->

    <!-- side menu -->
    <button
      @click="showMenu()"
      type="submit"
      class="absolute top-6 left-4 z-20"
    >
      <svg
        v-if="showSideMenu === false"
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
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
      <svg
        v-if="showSideMenu === true"
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
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>

    <div v-if="showSideMenu === true" class="absolute h-full w-full top-0">
      <div
        id="sideMenuSalesHistory"
        @click="closeMenuWindow()"
        class="h-full backdrop-filter backdrop-blur-sm grid grid-cols-12"
      >
        <div
          class="
            h-full
            col-span-8
            sm:col-span-4
            lg:col-span-3
            bg-gray-200
            overflow-y-auto
          "
        >
          <side-menu />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import "moment/locale/id";
import * as numberFormat from "@/custom_package/number.js";
import SideMenu from "@/views/components/SideMenu.vue";
import axios from "axios";
let apiHost = process.env.VUE_APP_BACKEND_HOST;

export default {
  name: "StockAdjustment",
  components: {
    SideMenu,
  },

  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
      datePeriod: {
        from: moment().format("YYYY-MM-DD"),
        to: moment().format("YYYY-MM-DD"),
      },
      store_id: localStorage.getItem("selectedStore"),

      adjustmentHistory: [
        {
          id: null,
          note: "",
          date: "",
          ingredients: [
            {
              id: null,
              name: "",
              unit: "",
              previous_stock: null,
              quantity: null,
            },
          ],
        },
      ],

      showSideMenu: true,
    };
  },

  methods: {
    separator(number) {
      return numberFormat.separator(number);
    },
    formatDateInIDN(date) {
      return moment(date).format("LL");
    },
    showMenu() {
      if (this.showSideMenu === false) {
        this.showSideMenu = true;
      } else {
        this.showSideMenu = false;
      }
    },
    closeMenuWindow() {
      let win = document.getElementById("sideMenuSalesHistory");
      if (window.event.target == win) {
        this.showSideMenu = false;
      }
    },
    async fetchAdjustmentHistory() {
      let headers = { Authorization: `Bearer ${this.user.token}` };
      const response = await axios.get(
        apiHost + "/api/store/adjustments/ingredients",
        {
          headers,
          params: {
            date_from: this.datePeriod.from,
            date_to: this.datePeriod.to,
            store_id: this.store_id,
          },
        }
      );
      this.adjustmentHistory = response.data.data;
    },
  },

  created() {
    this.fetchAdjustmentHistory();
  },
};
</script>
