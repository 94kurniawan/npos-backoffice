<template>
  <div id="container" class="h-full relative bg-white">
    <div class="relative h-full w-full p-3">
      <div class="bg-white h-full overflow-y-auto pb-20">
        <div class="sticky top-0 bg-white">
          <p class="text-center uppercase p-3 md:mb-3 font-bold">
            Riwayat Stok Masuk
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
              @change="fetchReport()"
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
              @change="fetchReport()"
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
              @change="fetchReport()"
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
        <div class="py-3 w-full overflow-x-auto">
          <table class="w-full">
            <thead class="sticky top-0 bg-white text-sm">
              <tr class="uppercase">
                <th class="py-3 px-4 text-left">nomor / pengirim</th>
                <th class="py-3 px-4 text-left">item</th>
                <th class="py-3 px-4 text-right">note</th>
              </tr>
            </thead>
            <tbody class="text-gray-800 text-sm font-light">
              <tr
                v-for="data in receivedFromWarehouse"
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
                  <p>{{ data.number }}</p>
                  <p class="text-gray-500">Gudang Pusat</p>
                </td>
                <td class="py-3 px-4 text-left">
                  <table class="w-full">
                    <tbody v-for="item in data.items" :key="item.key">
                      <tr>
                        <td class="font-bold"># {{ item.name }}</td>
                        <td>+{{ item.quantity }}</td>
                        <!-- <td>{{ item.unit }}</td> -->
                      </tr>
                      <!-- <tr v-if="item.note != null">
                  <td>Note: {{ item.note }}</td>
                </tr> -->
                    </tbody>
                  </table>
                </td>
                <td class="py-3 px-4 text-right">{{}}</td>
              </tr>
              <tr
                v-for="data in receivedFromAnotherStore"
                :key="data.key"
                class="border-b border-gray-200 hover:bg-gray-100 align-top"
              >
                <td class="py-3 px-4 text-left whitespace-nowrap">
                  {{ data.store_sender_name }}
                  <p>Kasir - {{ data.underwriter }}</p>
                  <p>{{ formatDateInIDN(data.date) }}</p>
                  <p>Jam - {{ data.time }}</p>
                </td>
                <td class="py-3 px-4 text-left whitespace-nowrap">
                  <table class="w-full">
                    <tbody v-for="item in data.items" :key="item.key">
                      <tr>
                        <td class="font-bold"># {{ item.name }}</td>
                        <td>+{{ item.quantity }}</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
                <td class="py-3 px-4 text-left whitespace-nowrap">
                  {{ data.note }}
                </td>
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
        class="h-full bg-gray-500 bg-opacity-40 grid grid-cols-12"
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
  name: "StockHistory",
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

      receivedFromWarehouse: [
        {
          number: "",
          date: "",
          items: [
            {
              id: null,
              name: "",
              unit: "",
              quantity: null,
            },
          ],
        },
      ],
      receivedFromAnotherStore: [],

      showSideMenu: true,
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
    fetchReport() {
      this.fetchReceivedFromWarehouse();
      this.fetchReceivedFromAnotherStore();
    },
    async fetchReceivedFromWarehouse() {
      try {
        let headers = { Authorization: `Bearer ${this.user.token}` };
        const response = await axios.get(
          apiHost + "/api/warehouses/deliveries",
          {
            headers,
            params: {
              date_from: this.datePeriod.from,
              date_to: this.datePeriod.to,
              recipient_type: "STORE",
              recipient_id: this.store_id,
            },
          }
        );
        this.receivedFromWarehouse = response.data.data;
      } catch (error) {
        console.log(error.response);
      }
    },
    async fetchReceivedFromAnotherStore() {
      let headers = { Authorization: `Bearer ${this.user.token}` };
      const response = await axios.get(
        apiHost + "/api/store/ingredients/transfer-stocks",
        {
          headers,
          params: {
            date_from: this.datePeriod.from,
            date_to: this.datePeriod.to,
            recipient_id: this.store_id,
          },
        }
      );
      this.receivedFromAnotherStore = response.data.data;
    },
    // print() {
    //   localStorage.setItem("salesSummary", JSON.stringify(this.report));
    //   let router = this.$router.resolve({
    //     name: "print-storages",
    //   });

    //   window.open(router.href, "", "width=1000,height=650");
    // },
  },

  created() {
    this.fetchReport();
  },
};
</script>
