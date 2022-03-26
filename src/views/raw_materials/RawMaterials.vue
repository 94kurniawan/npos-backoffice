<template>
  <div id="container" class="h-full relative bg-white">
    <div class="relative h-full w-full p-3">
      <div class="bg-white h-full overflow-y-auto pb-20">
        <div class="sticky top-0 bg-gray-700 text-white">
          <p class="text-center uppercase p-3 md:mb-3 font-bold">
            Store Ingredients
          </p>
        </div>
        <div class="py-3">
          <table class="w-full">
            <thead class="sticky top-12 bg-white text-sm">
              <tr class="uppercase">
                <th class="py-3 px-4 text-left">item</th>
                <th class="py-3 px-4 text-right">Stok</th>
              </tr>
            </thead>
            <tbody class="text-gray-800 text-sm font-light">
              <tr
                v-for="item in rawMaterials"
                :key="item.key"
                class="
                  border-b border-gray-200
                  hover:bg-gray-100
                  odd:bg-gray-50
                  align-top
                "
              >
                <td class="py-3 px-4 text-left">
                  <p>{{ item.name }}</p>
                  <p class="text-sm text-gray-400">{{ item.sku }}</p>
                </td>
                <td class="py-3 px-4 text-right">
                  {{ item.stock }}
                  <p class="text-sm text-gray-400">{{ item.unit }}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- print button -->
    <button
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
    </button>

    <!-- side menu -->
    <button
      @click="showMenu()"
      type="submit"
      class="absolute top-6 left-4 z-20"
    >
      <svg
        v-if="showSideMenu === false"
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
// import ModalShowItem from "@/views/components/ModalShowItem.vue";
import axios from "axios";
let apiHost = process.env.VUE_APP_BACKEND_HOST;

export default {
  name: "RawMaterials",
  components: {
    SideMenu,
    // ModalShowItem,
  },

  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
      rawMaterials: [
        {
          id: null,
          warehouse_item_id: null,
          sku: "",
          name: "",
          stock: null,
          unit: "",
        },
      ],
      // Temporary Data
      showSideMenu: false,
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
    async fetchRawMaterials() {
      try {
        let headers = { Authorization: `Bearer ${this.user.token}` };
        const response = await axios.get(apiHost + "/api/store/ingredients", {
          headers,
          params: {
            store_id: localStorage.getItem("selectedStore"),
          },
        });
        this.rawMaterials = response.data.data;
      } catch (error) {
        console.log(error.response);
      }
    },
    print() {
      // localStorage.setItem("storeSelected", JSON.stringify(this.storeSelected));
      localStorage.setItem("rawMaterials", JSON.stringify(this.rawMaterials));
      let router = this.$router.resolve({
        name: "PrintRawMaterials",
      });

      window.open(router.href, "", "width=1000,height=650");
    },
  },

  created() {
    this.fetchRawMaterials();
  },
};
</script>
