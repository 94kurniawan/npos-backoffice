<template>
  <div id="container" class="h-full relative bg-white">
    <div class="relative h-full w-full p-3">
      <div class="bg-white h-full overflow-y-auto pb-20">
        <div class="sticky top-0 bg-gray-700 text-white">
          <p class="text-center uppercase p-3 md:mb-3 font-bold">Category</p>
        </div>
        <div class="py-3">
          <button
            @click="showModalAddCategory()"
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
            Tambah Category Baru
          </button>
          <table class="w-full">
            <thead class="sticky top-12 bg-white text-sm">
              <tr class="uppercase">
                <th class="py-3 px-4 text-left">category</th>
                <th class="py-3 px-4 text-right">opt</th>
              </tr>
            </thead>
            <tbody class="text-gray-800 text-sm font-light">
              <tr
                v-for="category in categories"
                :key="category.key"
                class="
                  border-b border-gray-200
                  hover:bg-gray-100
                  odd:bg-gray-50
                  align-top
                "
              >
                <td class="py-3 px-4 text-left">
                  <p>{{ category.name }}</p>
                </td>
                <td class="py-3 px-4 flex justify-end">
                  <svg
                    @click="showEdit(category)"
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
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
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
    <modal-add-category @addCategory="addCategory" />

    <!-- edit category -->
    <modal-show-category
      :category="categorySelected"
      @editCategory="editCategory"
    />
  </div>
</template>

<script>
import moment from "moment";
import "moment/locale/id";
import * as numberFormat from "@/custom_package/number.js";
import SideMenu from "@/views/components/SideMenu.vue";
import axios from "axios";
import ModalShowCategory from "@/views/components/ModalShowCategory.vue";
import ModalAddCategory from "@/views/components/ModalAddCategory.vue";
let apiHost = process.env.VUE_APP_BACKEND_HOST;

export default {
  name: "Category",
  components: {
    SideMenu,
    ModalShowCategory,
    ModalAddCategory,
  },

  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
      categories: [
        {
          id: null,
          store_id: null,
          name: "",
        },
      ],
      // Temporary Data
      showSideMenu: false,
      categorySelected: {
        id: null,
        store_id: null,
        name: "",
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
    async fetchCategories() {
      try {
        let headers = { Authorization: `Bearer ${this.user.token}` };
        const response = await axios.get(apiHost + "/api/store/categories", {
          headers,
          params: {
            store_id: localStorage.getItem("selectedStore"),
          },
        });
        this.categories = response.data.data;
      } catch (error) {
        console.log(error.response);
      }
    },
    showModalAddCategory() {
      let modal = document.getElementById("modal-add-category");
      modal.style.display = "block";
    },
    async addCategory(category) {
      try {
        let data = { name: category };
        let headers = { Authorization: `Bearer ${this.user.token}` };
        const response = await axios.post(
          apiHost + "/api/store/categories",
          data,
          {
            headers,
            params: {
              store_id: localStorage.getItem("selectedStore"),
            },
          }
        );
        console.log(response);
        this.fetchCategories();
        alert("berhasil menambah category");
      } catch (error) {
        console.log(error.response);
      }
    },
    showEdit(category) {
      this.categorySelected = category;
      let modal = document.getElementById("modal-show-category");
      modal.style.display = "block";
    },
    async editCategory() {
      try {
        let headers = { Authorization: `Bearer ${this.user.token}` };
        const response = await axios.put(
          apiHost + "/api/store/categories/" + this.categorySelected.id,
          { name: this.categorySelected.name },
          {
            headers,
            // params: {
            //   name: this.categorySelected.name,
            // },
          }
        );
        this.fetchCategories();
        alert("berhasil mengubah category");
      } catch (error) {
        console.log(error.response);
      }
    },
  },

  created() {
    this.fetchCategories();
  },
};
</script>
