<template>
  <div id="container" class="h-full relative bg-white">
    <div class="relative h-full w-full p-3">
      <div class="bg-white h-full overflow-y-auto pb-20">
        <div class="sticky top-0 bg-modern-green text-white">
          <p class="text-center uppercase p-3 md:mb-3 font-bold">
            Create New Adjustment
          </p>
        </div>
        <p class="text-center pb-2">
          -- {{ formatDateInIDN(adjustment.date) }} --
        </p>
        <div class="p-2 grid grid-flow-row grid-cols-1 md:grid-cols-2">
          <p class="py-2 text-sm text-gray-500">Store</p>
          <select
            @change="selectStore()"
            v-model="adjustment.store_id"
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
          <p class="py-2 text-sm text-gray-500">Keterangan</p>
          <textarea
            v-model="adjustment.note"
            type="text"
            name="itemName"
            class="p-3 border rounded"
          />
        </div>

        <div class="py-2">
          <table class="w-full">
            <thead class="sticky top-28 bg-white text-sm">
              <tr class="">
                <th class="py-3 px-4 text-left">
                  BAHANBAKU
                  <a
                    @click="showConfirmResetAllStock()"
                    class="text-red-500 underline"
                    >Reset Semua Stok</a
                  >
                </th>
                <th class="py-3 px-4 text-right">Stok Saat Ini</th>
              </tr>
            </thead>
            <tbody class="text-gray-800 text-sm font-light">
              <tr
                v-for="(data, index) in adjustment.ingredients"
                :key="data.key"
                class="
                  border-b border-gray-200
                  hover:bg-gray-100
                  odd:bg-gray-50
                  align-top
                "
              >
                <td class="py-3 px-2 text-left flex gap-2">
                  <button
                    @click="removeRow(index)"
                    class="px-3 bg-gray-200 rounded-lg"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6 text-red-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                  <div class="w-full">
                    <select
                      v-model="data.ingredient"
                      class="p-3 border rounded w-full"
                    >
                      <option
                        v-for="ingredient in rawMaterials"
                        :key="ingredient.key"
                        :value="ingredient"
                      >
                        {{ ingredient.name }}
                      </option>
                    </select>
                    <p v-if="data.ingredient.stock != undefined" class="pl-3">
                      stok sebelumnya = {{ data.ingredient.stock }}
                      {{ data.ingredient.unit }}
                    </p>
                  </div>
                </td>
                <td class="py-3 px-2 text-right">
                  <input
                    v-model="data.quantity"
                    type="text"
                    name="itemName"
                    class="p-3 border rounded w-full"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div class="flex justify-center py-2">
            <button
              @click="addNewRow()"
              class="
                border-2
                p-3
                align-middle
                bg-gray-100
                text-gray-600
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
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Tambah Data
            </button>
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
      @click="cleanAdjustmentData()"
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

    <!-- modal confirm -->
    <modal-confirm :message="message" @yes="resetAllStock" />
  </div>
</template>

<script>
import moment from "moment";
import "moment/locale/id";
import * as numberFormat from "@/custom_package/number.js";
import ModalConfirm from "@/views/components/ModalConfirm.vue";
import axios from "axios";
let apiHost = process.env.VUE_APP_BACKEND_HOST;

export default {
  name: "CreateAdjustment",
  components: {
    ModalConfirm,
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

      adjustment: {
        store_id: null,
        note: "",
        date: moment().format("YYYY-MM-DD"),
        ingredients: [
          {
            ingredient: {},
            id: null, //from ingredient.id
            quantity: null,
          },
        ],
      },

      message: "",
    };
  },

  methods: {
    reset() {
      this.adjustment.ingredients = [
        {
          ingredient: {},
          id: null,
          quantity: null,
        },
      ];
    },
    separator(number) {
      return numberFormat.separator(number);
    },
    formatDateInIDN(date) {
      return moment(date).format("LL");
    },
    addNewRow() {
      this.adjustment.ingredients.push({
        ingredient: {},
        id: null,
        quantity: null,
      });
    },
    removeRow(index) {
      this.adjustment.ingredients.splice(index, 1);
    },
    goBack() {
      this.$router.go(-1);
    },
    selectStore() {
      this.reset();
      this.fetchRawMaterials();
    },
    async fetchRawMaterials() {
      try {
        let headers = { Authorization: `Bearer ${this.user.token}` };
        const response = await axios.get(apiHost + "/api/store/ingredients", {
          headers,
          params: {
            store_id: this.adjustment.store_id,
          },
        });
        this.rawMaterials = response.data.data;
      } catch (error) {
        console.log(error.response);
      }
    },

    cleanAdjustmentData() {
      let data = JSON.parse(JSON.stringify(this.adjustment));
      data.ingredients.forEach((data) => {
        data.id = data.ingredient.id;
        delete data.ingredient;
      });
      this.save(data);
    },

    async save(dataAdjustment) {
      try {
        let headers = { Authorization: `Bearer ${this.user.token}` };
        await axios.post(
          apiHost + "/api/store/adjustments/ingredients",
          dataAdjustment,
          {
            headers,
          }
        );
        this.$router.go(-1);
        alert("berhasil membuat adjustment");
      } catch (error) {
        console.log(error);
      }
    },

    showConfirmResetAllStock() {
      this.message =
        "Pastikan Sudah Memilih Store yang sesuai. Jika dilanjutkan maka Stok Semua Bahanbaku akan berubah menjadi 0 (nol)";
      let modal = document.getElementById("modal-confirm");
      modal.style.display = "block";
    },

    resetAllStock() {
      let data = JSON.parse(JSON.stringify(this.adjustment));
      data.note = "Reset All Stock (" + data.note + ")";
      data.ingredients = [];
      this.rawMaterials.forEach((rawMaterial) => {
        data.ingredients.push({
          id: rawMaterial.id,
          quantity: 0,
        });
      });
      this.save(data);
    },
  },
};
</script>
