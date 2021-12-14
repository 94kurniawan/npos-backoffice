<template>
  <div id="container" class="h-full relative bg-gray-100 md:bg-white">
    <div class="relative h-full w-full md:w-1/3 p-3">
      <p class="bg-gray-100 text-center uppercase p-3 md:mb-3 font-bold">
        Validation Key
      </p>

      <div class="h-4/6 overflow-y-auto">
        <div class="grid grid-flow-row gap-1 pb-5 rounded-lg shadow-lg">
          <div
            class="
              sticky
              top-0
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
          <div
            v-for="key in keys"
            :key="key.key"
            class="
              p-3
              grid grid-cols-5
              gap-1
              items-start
              content-center
              odd:bg-blue-50
            "
          >
            <p class="col-span-3">{{ key.store_name }}</p>
            <i
              v-if="key.key === null"
              class="col-span-2 text-right text-gray-400"
              >belum ada key</i
            >
            <p
              v-if="key.key != null"
              class="col-span-2 text-right text-blue-600"
            >
              {{ key.key }}
            </p>
          </div>
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
            v-model="request.store_id"
            class="
              w-full
              col-span-2
              bg-white
              p-3
              border-2
              outline-none
              rounded-lg
            "
          >
            <option
              v-for="user in user.info.stores"
              :key="user.key"
              :value="user.id"
            >
              {{ user.name }}
            </option>
          </select>
        </div>
        <div class="grid items-center content-center grid-cols-3 gap-1">
          <label class="px-2">KEY</label>
          <input
            v-model="request.key"
            placeholder="validation key baru"
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
        <button @click="postNewKey()" class="p-3 bg-blue-400 text-white">
          save
        </button>
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
      showSideMenu: false,
      keys: [
        {
          store_id: null,
          store_name: "",
          key: "",
        },
      ],
      request: {
        store_id: "",
        key: "",
      },
    };
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
    async fetchKeys() {
      try {
        let headers = { Authorization: `Bearer ${this.user.token}` };
        const response = await axios.get(
          apiHost + "/api/users/validation-keys",
          {
            headers,
          }
        );
        this.keys = response.data.data;
      } catch (error) {
        console.log(error.response);
      }
    },
    async postNewKey() {
      try {
        let headers = { Authorization: `Bearer ${this.user.token}` };
        const response = await axios.post(
          apiHost + "/api/users/validation-keys",
          this.request,
          {
            headers,
          }
        );
        this.fetchKeys();
        alert(response.data.message);
        this.request = {};
      } catch (error) {
        console.log(error.response);
      }
    },
  },

  created() {
    this.fetchKeys();
  },
};
</script>
