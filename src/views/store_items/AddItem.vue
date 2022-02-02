<template>
  <div id="container" class="h-full relative bg-white">
    <div class="relative h-full w-full p-3">
      <div class="bg-white h-full overflow-y-auto pb-20">
        <div class="sticky top-0 bg-modern-green text-white">
          <p class="text-center uppercase p-3 md:mb-3 font-bold">
            Add New Item
          </p>
        </div>
        <div class="p-2 grid grid-flow-row grid-cols-1 md:grid-cols-2">
          <p class="py-2 text-sm text-gray-500">Store</p>
          <select
            @change="selectStore()"
            v-model="item.store_id"
            class="p-3 border rounded"
          >
            <option
              v-for="store in user.info.stores"
              :key="store.key"
              :value="store.id"
            >
              {{ store.name }}
            </option>
            <!-- <option value="">test</option> -->
          </select>
        </div>
        <div class="p-2 grid grid-flow-row grid-cols-1 md:grid-cols-2">
          <p class="py-2 text-sm text-gray-500">Item Name</p>
          <input
            v-model="item.name"
            type="text"
            name="itemName"
            class="p-3 border rounded"
          />
        </div>
        <div class="p-2 grid grid-flow-row grid-cols-1 md:grid-cols-2">
          <p class="py-2 text-sm text-gray-500">Category</p>
          <select v-model="item.store_category_id" class="p-3 border rounded">
            <option
              v-for="category in categories"
              :key="category.key"
              :value="category.id"
            >
              {{ category.name }}
            </option>
            <!-- <option value="">test</option> -->
          </select>
        </div>
        <!-- v-if="item.have_variants == true" -->
        <div class="p-2 grid grid-flow-row grid-cols-1 md:grid-cols-2">
          <p class="py-2 text-sm text-gray-500">Variants</p>
          <div class="grid grid-flow-row grid-cols-3 gap-2">
            <div
              @click="showAddNewVariant()"
              class="
                border-2
                p-3
                align-middle
                bg-gray-500
                text-white
                rounded-md
                active:bg-gray-200
                justify-center
                flex
                items-center
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <div
              v-for="variant in item.variants"
              :key="variant.key"
              class="
                border-2
                p-3
                align-middle
                bg-gray-50
                rounded-md
                active:bg-gray-200
                text-center
                relative
              "
            >
              <div
                @click="removeVariant(index)"
                class="
                  absolute
                  items-center
                  justify-center
                  flex
                  -top-3
                  -right-3
                  rounded-full
                  text-red-500
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              {{ variant.name }}
            </div>
          </div>
        </div>
        <div class="p-2 grid grid-flow-row grid-cols-1 md:grid-cols-2">
          <p class="py-2 text-sm text-gray-500">Options</p>
          <div class="grid grid-flow-row grid-cols-3 gap-2">
            <div
              @click="showEditOptions()"
              class="
                border-2
                p-3
                align-middle
                bg-gray-500
                text-white
                rounded-md
                active:bg-gray-200
                justify-center
                flex
                items-center
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
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </div>
            <div
              v-for="option in item.options"
              :key="option.key"
              class="
                border-2
                p-3
                align-middle
                bg-gray-50
                rounded-md
                active:bg-gray-200
                text-center
              "
            >
              {{ option.name }}
            </div>
          </div>
        </div>
        <div class="p-2 grid grid-flow-row grid-cols-1 md:grid-cols-2">
          <p class="py-2 text-sm text-gray-500">Sales Type</p>
          <div class="grid grid-flow-row grid-cols-2 md:grid-cols-3 gap-2">
            <div
              @click="showEditSalesType()"
              class="
                border-2
                p-3
                align-middle
                bg-gray-500
                text-white
                rounded-md
                active:bg-gray-200
                justify-center
                flex
                items-center
                shadow
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
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </div>
            <div
              v-for="sales_type in item.sales_types"
              :key="sales_type.key"
              class="
                border-2
                p-3
                align-middle
                bg-gray-50
                rounded-md
                active:bg-gray-200
                text-center
              "
            >
              <p>{{ sales_type.name }}</p>
              <hr class="border-gray-400" />
              <p>{{ currency(sales_type.price) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- back button -->
    <button @click="goBack()" type="submit" class="absolute top-6 left-4 z-20">
      <svg
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
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>

    <!-- Save Button -->
    <button
      @click="save()"
      type="submit"
      class="
        absolute
        bottom-4
        right-4
        z-20
        flex
        items-center
        bg-modern-green
        text-white
        py-3
        px-4
        rounded
        shadow-lg
      "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
        />
      </svg>
      SAVE
    </button>

    <!-- Modal Add Variant -->
    <modal-add-variant @add-new-variant="addNewVariant" />

    <!-- Modal Edit Options -->
    <modal-edit-options
      :options="options"
      :itemOptions="item.options"
      @edit-options="editOptions"
    />

    <!-- Modal Edit Sales Type -->
    <modal-edit-sales-type
      :salesType="salesType"
      :itemSalesType="item.sales_types"
      @edit-sales-type="editSalesType"
    />
  </div>
</template>

<script>
import moment from "moment";
import "moment/locale/id";
import * as numberFormat from "@/custom_package/number.js";
import axios from "axios";
import ModalAddVariant from "@/views/components/ModalAddVariant.vue";
import ModalEditOptions from "@/views/components/ModalEditOptions.vue";
import ModalEditSalesType from "../components/ModalEditSalesType.vue";
let apiHost = process.env.VUE_APP_BACKEND_HOST;

export default {
  name: "AddItem",
  components: {
    ModalAddVariant,
    ModalEditOptions,
    ModalEditSalesType,
  },

  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
      item: {
        store_id: null, // from user
        name: "",
        sku: "",
        store_category_id: null,
        variants: [
          // {
          //   name: "",
          //   sku: "",
          // },
        ],
        options: [], // from optionsSelected
        sales_types: [
          // {
          //   id: null,
          //   price: null,
          // },
        ],
      },
      categories: [
        {
          id: null,
          store_id: null,
          name: "",
        },
      ],
      options: [
        {
          id: null,
          name: "",
          price: null,
        },
      ],
      optionsSelected: [],
      salesType: [
        {
          id: null,
          name: "",
        },
      ],
    };
  },

  methods: {
    reset() {
      this.optionsSelected = [];
      this.item.options = [];
      this.item.store_category_id = null;
      this.item.variants = [];
      this.item.sales_types = [];
    },
    currency(number) {
      return numberFormat.currency(number);
    },
    separator(number) {
      return numberFormat.separator(number);
    },
    formatDateInIDN(date) {
      return moment(date).format("LL");
    },
    goBack() {
      this.$router.go(-1);
    },
    selectStore() {
      this.reset();
      this.fetchCategories();
      this.fetchOptions();
      this.fetchSalesType();
    },
    async fetchCategories() {
      try {
        let headers = { Authorization: `Bearer ${this.user.token}` };
        const response = await axios.get(apiHost + "/api/store/categories", {
          headers,
          params: {
            store_id: this.item.store_id,
          },
        });
        this.categories = response.data.data;
      } catch (error) {
        console.log(error.response);
      }
    },
    async fetchOptions() {
      try {
        let headers = { Authorization: `Bearer ${this.user.token}` };
        const response = await axios.get(apiHost + "/api/store/options", {
          headers,
          params: {
            store_id: this.item.store_id,
          },
        });
        this.options = response.data.data;
      } catch (error) {
        console.log(error.response);
      }
    },
    async fetchSalesType() {
      try {
        let headers = { Authorization: `Bearer ${this.user.token}` };
        const response = await axios.get(apiHost + "/api/store/sales-types", {
          headers,
          params: {
            store_id: this.item.store_id,
          },
        });
        this.salesType = response.data.data;
      } catch (error) {
        console.log(error.response);
      }
    },

    showAddNewVariant() {
      let modal = document.getElementById("modal-add-variant");
      modal.style.display = "block";
    },
    addNewVariant(data) {
      let variant = JSON.parse(JSON.stringify(data));
      this.item.variants.push(variant);
    },
    removeVariant(index) {
      this.item.variants.splice(index, 1);
    },

    showEditOptions() {
      let modal = document.getElementById("modal-edit-options");
      modal.style.display = "block";
    },
    editOptions(options, viewOptions) {
      this.optionsSelected = options;
      this.item.options = viewOptions;
    },
    // removeOptionsObject() {
    //   if (this.optionsSelected.length == 0) {
    //     this.item.options.forEach((option) => {
    //       this.optionsSelected.push(option.id);
    //     });
    //   }
    // },

    showEditSalesType() {
      let modal = document.getElementById("modal-edit-sales-type");
      modal.style.display = "block";
    },
    editSalesType(salesType) {
      let data = [];
      salesType.forEach((selected) => {
        if (selected.price) {
          data.push(selected);
        }
      });
      this.item.sales_types = data;
    },

    async save() {
      try {
        // this.removeOptionsObject();
        this.item.options = this.optionsSelected;
        let headers = { Authorization: `Bearer ${this.user.token}` };
        const response = await axios.post(
          apiHost + "/api/store/items",
          this.item,
          {
            headers,
          }
        );
        this.$router.go(-1);
        alert("berhasil menambah data");
        console.log(response);
        this.reset();
      } catch (error) {
        console.log(error);
      }
    },
  },

  mounted() {
    this.fetchCategories();
    this.fetchOptions();
    this.fetchSalesType();
  },
};
</script>
