<template>
  <div id="container" class="h-full relative bg-white">
    <div class="relative h-full w-full p-3">
      <div class="bg-white h-full overflow-y-auto pb-20">
        <div class="sticky top-0 bg-gray-700 text-white">
          <p class="text-center uppercase p-3 md:mb-3 font-bold">Store Items</p>
        </div>
        <div class="py-3">
          <button
            @click="addNewItem()"
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
            Tambah Item Baru
          </button>
          <table class="w-full">
            <thead class="sticky top-12 bg-white text-sm">
              <tr class="uppercase">
                <th class="py-3 px-4 text-left">item</th>
                <th class="py-3 px-4 text-right">category</th>
              </tr>
            </thead>
            <tbody class="text-gray-800 text-sm font-light">
              <tr
                v-for="item in items"
                :key="item.key"
                @click="showItem(item)"
                class="
                  border-b border-gray-200
                  hover:bg-gray-100
                  odd:bg-gray-50
                  align-top
                "
              >
                <td class="py-3 px-4 text-left">
                  <p>{{ item.name }}</p>
                  <i
                    v-for="variant in item.variants"
                    :key="variant.key"
                    class="not-italic text-gray-500"
                  >
                    {{ variant.name + ", " }}</i
                  >
                </td>
                <td class="py-3 px-4 text-right">
                  {{ item.store_category_name }}
                </td>
              </tr>
            </tbody>
          </table>
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

    <!-- show item -->
    <modal-show-item :item="itemSelected" />
  </div>
</template>

<script>
import moment from "moment";
import "moment/locale/id";
import * as numberFormat from "@/custom_package/number.js";
import SideMenu from "@/views/components/SideMenu.vue";
import ModalShowItem from "@/views/components/ModalShowItem.vue";
import axios from "axios";
let apiHost = process.env.VUE_APP_BACKEND_HOST;

export default {
  name: "StoreItems",
  components: {
    SideMenu,
    ModalShowItem,
  },

  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
      items: [
        {
          id: null,
          name: "",
          store_category_id: null,
          store_category_name: "",
          stock: null,
          have_variants: true,
          variants: [],
          options: [],
          sales_types: [],
        },
      ],
      // Temporary Data
      showSideMenu: false,
      itemSelected: {
        id: null,
        name: "",
        store_category_id: null,
        store_category_name: "",
        stock: null,
        have_variants: true,
        variants: [
          {
            id: null,
            name: "",
            sku: "",
            stock: null,
          },
        ],
        options: [],
        sales_types: [
          {
            id: null,
            name: "",
            price: null,
            additional_cost: [
              {
                id: null,
                name: "",
                percentage: null,
              },
            ],
          },
        ],
      },
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
    async fetchItems() {
      try {
        let headers = { Authorization: `Bearer ${this.user.token}` };
        const response = await axios.get(apiHost + "/api/store/items", {
          headers,
          params: {
            store_id: localStorage.getItem("selectedStore"),
          },
        });
        this.items = response.data.data;
      } catch (error) {
        console.log(error.response);
      }
    },
    showItem(item) {
      this.itemSelected = item;
      let modal = document.getElementById("modal-show-item");
      modal.style.display = "block";
    },
    addNewItem() {
      this.$router.push("add-item");
    },
  },

  created() {
    this.fetchItems();
  },
};
</script>
