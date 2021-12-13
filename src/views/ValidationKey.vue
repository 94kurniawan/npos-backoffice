<template>
  <div id="container" class="h-full relative bg-gray-100">
    <div class="relative h-full w-full md:w-1/3 md:mx-auto p-3 overflow-y-auto">
      <p class="text-center uppercase p-3 md:mb-3 font-bold">Validation Key</p>
      <div class="grid grid-flow-row gap-1 bg-white rounded-lg shadow-lg">
        <div
          class="
            flex
            p-3
            justify-between
            items-center
            content-center
            bg-blue-200
            rounded-t-lg
          "
        >
          <p>STORE</p>
          <p>KEY</p>
        </div>
        <div class="flex p-3 justify-between items-center content-center">
          <p>Nama Store</p>
          <p>122345454k</p>
        </div>
        <div class="flex p-3 justify-between items-center content-center">
          <p>Nama Store</p>
          <p>122345454k</p>
        </div>
        <div class="flex p-3 justify-between items-center content-center">
          <p>Nama Store</p>
          <p>122345454k</p>
        </div>
        <div class="flex p-3 justify-between items-center content-center">
          <p>Nama Store</p>
          <p>122345454k</p>
        </div>
        <div class="flex p-3 justify-between items-center content-center">
          <p>Nama Store</p>
          <p>122345454k</p>
        </div>
        <div class="flex p-3 justify-between items-center content-center">
          <p>Nama Store</p>
          <p>122345454k</p>
        </div>
      </div>
      <div
        class="
          absolute
          bg-white
          w-full
          grid grid-flow-row
          gap-1
          bottom-0
          left-0
          p-3
        "
      >
        <div class="grid items-center content-center grid-cols-3 gap-1">
          <label class="px-2">STORE</label>
          <select
            v-model="selectedUser"
            class="
              w-full
              col-span-2
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
        <div class="grid items-center content-center grid-cols-3 gap-1">
          <label class="px-2">KEY</label>
          <input
            placeholder="masukkan validation key baru"
            type="text"
            class="
              w-full
              col-span-2
              bg-white
              p-3
              border-2
              outline-none
              rounded-lg
            "
          />
        </div>
        <button class="p-3 bg-blue-400 text-white">save</button>
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
  name: "ValidationKey",
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

      showSideMenu: false,
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
    formatDateTime(date) {
      return moment(date).format("LL, h:mm:ss");
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
