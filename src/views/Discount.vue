<template>
  <div id="container" class="h-full relative bg-white">
    <div class="relative h-full w-full p-3">
      <div class="bg-white h-full overflow-y-auto pb-20">
        <div class="sticky top-0 bg-gray-700 text-white">
          <p class="text-center uppercase p-3 md:mb-3 font-bold">Discount</p>
        </div>
        <div
          class="py-3 grid grid-flow-row md:grid-cols-4 md:gap-5 mobile:gap-2"
        >
          <select
            v-model="storeSelected"
            class="
              md:col-start-3
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
              :value="store"
            >
              {{ store.name }}
            </option>
          </select>
          <button
            @click="showModalAddDiscount()"
            class="
              bg-modern-green
              text-white
              md:col-start-4
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
            Tambah Discount Baru
          </button>
        </div>
        <div class="grid grid-flow-row md:grid-cols-4 gap-2">
          <div
            v-for="discount in discounts"
            :key="discount.key"
            class="text-center"
          >
            <div class="bg-gray-300 text-gray-700 rounded-t-lg px-3 py-2">
              {{ discount.name }}
            </div>
            <div
              class="
                bg-gradient-to-br
                from-green-900
                to-gray-300
                rounded-b-lg
                px-3
                py-10
              "
            >
              <p class="font-bold text-white text-4xl shado">
                {{ discount.percentage * 100 }} %
              </p>
            </div>
          </div>
        </div>
        <div
          v-if="discounts.length == 0"
          class="flex justify-center p-10 text-gray-400 text-sm"
        >
          <div class="p-5 border-2 rounded-xl shadow-lg">
            <p class="flex justify-center animate-bounce">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </p>
            <p class="text-center">Belum Ada Discount untuk</p>
            <p class="text-center">Cabang {{ storeSelected.name }}</p>
          </div>
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

    <!-- add new category -->
    <modal-add-discount :user="user" @addDiscount="addDiscount" />
  </div>
</template>

<script>
import SideMenu from "@/views/components/SideMenu.vue";
import axios from "axios";
import ModalAddDiscount from "@/views/components/ModalAddDiscount.vue";
let apiHost = process.env.VUE_APP_BACKEND_HOST;

export default {
  name: "Discount",
  components: {
    SideMenu,
    ModalAddDiscount,
  },

  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
      storeSelected: JSON.parse(localStorage.getItem("selectedStoreDetails")),
      discounts: [
        {
          id: null,
          store_id: null,
          name: "",
          percentage: null,
          created_at: null,
          updated_at: null,
        },
      ],
      // Temporary Data
      showSideMenu: false,
    };
  },

  watch: {
    storeSelected() {
      this.fetchDiscounts();
    },
  },

  methods: {
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
    async fetchDiscounts() {
      try {
        let headers = { Authorization: `Bearer ${this.user.token}` };
        const response = await axios.get(apiHost + "/api/store/discounts", {
          headers,
          params: {
            store_id: this.storeSelected.id,
          },
        });
        this.discounts = response.data.data;
      } catch (error) {
        console.log(error.response);
      }
    },
    showModalAddDiscount() {
      let modal = document.getElementById("modal-add-discount");
      modal.style.display = "block";
    },
    async addDiscount(discount) {
      try {
        let headers = { Authorization: `Bearer ${this.user.token}` };
        const response = await axios.post(
          apiHost + "/api/store/discounts",
          discount,
          {
            headers,
          }
        );
        this.fetchDiscounts();
        alert("berhasil menambah discount");
      } catch (error) {
        console.log(error);
      }
    },
  },

  created() {
    this.fetchDiscounts();
  },
};
</script>
