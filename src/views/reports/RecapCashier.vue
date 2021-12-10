<template>
  <div id="container" class="h-full relative bg-white">
    <div class="relative h-full w-full p-3">
      <div class="bg-white h-full overflow-y-auto pb-3">
        <div class="sticky top-0 z-10 bg-white">
          <p class="text-center uppercase p-3 md:mb-3 font-bold">
            Recap cashier
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
            <label class="mobile:hidden px-2">Period</label>
            <input
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
            <label class="mobile:hidden px-2">Cashier</label>
            <select
              v-model="selectedUser"
              class="
                col-span-2
                w-full
                bg-white
                py-3
                pr-3
                pl-5
                border-2
                outline-none
                rounded-lg
              "
            >
              <option v-for="user in users" :key="user.key" :value="user.id">
                {{ user.name }}
              </option>
            </select>
          </div>
        </div>
        <div v-if="selectedUser != null" class="py-3 flex">
          <!-- <div class="flex bg-red-200"> -->
          <div class="relative font-mono mx-auto z-0 top-5">
            <div class="absolute -top-3 -left-1 text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                />
              </svg>
            </div>
            <div class="bg-white px-3 py-3 shadow-xl border-b-4">
              <p class="text-center font-bold uppercase">
                {{ recapCash.user_info.store_name }}
              </p>
              <p class="text-center">
                {{ recapCash.user_info.store_address }}
              </p>
              <p class="text-center">======================================</p>

              <div class="flex">
                <!-- <p class="mobile:hidden">Tanggal</p> -->
                <p class="text-right flex-grow">
                  {{ formatDateInIDN(datePeriod.from) }} s/d
                  {{ formatDateInIDN(datePeriod.to) }}
                </p>
              </div>
              <div class="grid grid-cols-2">
                <p>Kasir</p>
                <p class="text-right">{{ recapCash.user_info.name }}</p>
              </div>

              <p class="text-center">======================================</p>
              <div class="flex items-center content-center py-3">
                <p>MODAL</p>
                <p class="text-right flex-grow">
                  {{ currency(recapCash.total_patty_cash) }}
                </p>
              </div>
              <p class="text-center">======================================</p>

              <p class="text-center">PENJUALAN</p>
              <p class="text-sm">Type Pembayaran:</p>
              <div
                v-for="sales in recapCash.total_sales"
                :key="sales.key"
                class="grid grid-flow-col grid-cols-6 font-bold"
              >
                <p class="col-span-4 uppercase">{{ sales.name }}</p>
                <p class="col-span-2 text-right">
                  {{ currency(sales.total) }}
                </p>
              </div>
              <p class="text-center">--------------------------------------</p>
              <div class="grid grid-flow-col grid-cols-6 font-bold">
                <p class="col-span-4 uppercase text-right">Total</p>
                <p class="col-span-2 text-right">
                  {{ currency(totalSales) }}
                </p>
              </div>
              <p class="text-center">======================================</p>
              <p class="text-center">KAS KELUAR</p>
              <p class="text-sm">rincian (cash):</p>
              <div
                v-for="(cashOut, index) in recapCash.cash_outs"
                :key="cashOut.key"
                class="grid grid-flow-col grid-cols-6 text-sm"
              >
                <p class="col-span-4 capitalize ml-2">
                  {{ ++index }}. {{ cashOut.note }}
                </p>
                <p class="col-span-2 text-right">
                  ({{ currency(cashOut.amount) }})
                </p>
              </div>
              <p class="text-center">--------------------------------------</p>
              <div class="grid grid-flow-col grid-cols-6 font-bold">
                <p class="col-span-4 uppercase text-right">Total cash</p>
                <p class="col-span-2 text-right">
                  ({{ currency(totalCashOut) }})
                </p>
              </div>

              <p class="text-center">======================================</p>
              <div class="grid grid-flow-col grid-cols-6 font-bold">
                <p class="col-span-4 uppercase">SISA KAS (cash)</p>
                <p class="col-span-2 text-right">{{ currency(totalCash) }}</p>
              </div>
              <p class="text-center">--------------------------------------</p>
              <div class="grid grid-flow-col grid-cols-6 font-bold">
                <p class="col-span-4 uppercase">SISA MODAL</p>
                <p class="col-span-2 text-right">
                  {{ currency(totalModal) }}
                </p>
              </div>
              <p class="text-center">======================================</p>
            </div>
            <br /><br /><br /><br />
          </div>
          <!-- </div> -->
        </div>
      </div>
    </div>

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

    <div v-if="showSideMenu === true" class="absolute h-full w-full top-0 z-20">
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
  name: "RecapCashier",
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

      users: [],
      selectedUser: null,

      recapCash: {
        user_info: {
          user_id: 4,
          username: "kasir_maleber",
          name: "Kasir Maleber",
          role: "cashier",
          store_id: 1,
          store_name: "Pada suka Cab. Maleber",
          store_address: "Jln. Maleber",
        },
        total_sales: [
          {
            id: null,
            name: "",
            total: null,
          },
        ],
        total_cash_out: "",
        cash_outs: [
          {
            id: null,
            note: "",
            amount: null,
          },
        ],
        total_patty_cash: null,
      },

      showSideMenu: true,
    };
  },

  watch: {
    datePeriod: {
      handler: function (val, oldVal) {
        this.fetchRecapCash();
      },
      deep: true,
    },
    selectedUser: {
      handler: function () {
        this.fetchRecapCash();
      },
      deep: true,
    },
  },

  computed: {
    totalSales() {
      let total = 0;
      this.recapCash.total_sales.forEach((sales) => {
        total += sales.total;
      });
      return total;
    },
    totalCashOut() {
      let total = 0;
      this.recapCash.cash_outs.forEach((cash) => {
        total += cash.amount || 0;
      });
      return total;
    },
    totalCash() {
      let cash = this.recapCash.total_sales[0].total;
      let total = cash - this.totalCashOut;
      if (total < 0) {
        total = 0;
      }
      return total;
    },
    totalModal() {
      let modal = +this.recapCash.total_patty_cash;
      let cash = this.recapCash.total_sales[0].total;
      let total = cash - this.totalCashOut;
      if (total < 0) {
        modal = +this.recapCash.total_patty_cash + total;
      }
      return modal;
    },
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
    async fetchRecapCash() {
      try {
        let headers = { Authorization: `Bearer ${this.user.token}` };
        const response = await axios.get(apiHost + "/api/store/recap-cashier", {
          headers,
          params: {
            date_from: this.datePeriod.from,
            date_to: this.datePeriod.to,
            store_id: localStorage.getItem("selectedStore"),
            user_id: this.selectedUser,
          },
        });
        this.recapCash = response.data.data;
      } catch (error) {
        console.log(error.response);
      }
    },
    async fetchUsers() {
      try {
        let headers = { Authorization: `Bearer ${this.user.token}` };
        const response = await axios.get(apiHost + "/api/users", {
          headers,
          params: {
            store_id: localStorage.getItem("selectedStore"),
          },
        });
        this.users = response.data.data;
      } catch (error) {
        console.log(error.response);
      }
    },
  },

  created() {
    this.fetchRecapCash();
    this.fetchUsers();
  },
};
</script>
