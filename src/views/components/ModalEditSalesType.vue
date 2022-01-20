<template>
  <div
    @click="closeModalWindow()"
    class="
      hidden
      fixed
      inset-0
      bg-gray-600 bg-opacity-50
      overflow-y-auto
      h-full
      w-full
    "
    id="modal-edit-sales-type"
  >
    <!--modal content-->
    <div
      class="
        relative
        mx-auto
        top-16
        border
        md:w-2/6
        w-5/6
        h-auto
        shadow-lg
        rounded-md
        bg-white
        overflow-y-auto
      "
    >
      <p class="p-3 flex items-center border-b-2 text-gray-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8 mr-2 text-yellow-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clip-rule="evenodd"
          />
        </svg>
        Cukup mengisi harga untuk Sales Type yang digunakan
      </p>
      <div class="mt-3">
        <div
          v-for="type in salesTypeSelected"
          :key="type.key"
          class="flex items-center justify-between gap-2 px-3 py-1"
        >
          <label>{{ type.name }}</label>
          <!-- <input
            type="number"
            v-model="type.price"
            class="p-2 border border-gray-500 rounded text-right"
          /> -->
          <currency-input
            v-model="type.price"
            :options="{
              currency: 'IDR',
              hideGroupingSeparatorOnFocus: false,
              currencyDisplay: 'narrowSymbol',
            }"
            class="p-2 border border-gray-500 rounded text-right"
          />
        </div>
        <div class="items-center px-4 py-3">
          <button
            @click="saveSalesType()"
            class="
              px-4
              py-4
              bg-modern-green
              text-white text-base
              font-medium
              rounded-md
              w-full
              shadow-sm
              hover:bg-green-600
              focus:outline-none focus:ring-2 focus:ring-green-300
            "
          >
            Simpan Sales Type
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CurrencyInput from "@/views/components/CurrencyInput.vue";
export default {
  name: "ModalEditSalesType",
  components: { CurrencyInput },
  props: {
    salesType: Array,
    itemSalesType: Array,
  },

  watch: {
    salesType: {
      handler: function (val, oldVal) {
        this.salesTypeSelected = JSON.parse(JSON.stringify(val));
        // this.fillSalesType();
      },
      deep: true,
    },
  },

  data() {
    return {
      salesTypeSelected: [],
    };
  },

  methods: {
    // fillSalesType() {
    //   this.salesTypeSelected.forEach((type) => {
    //     this.itemSalesType.forEach((selected) => {
    //       if (type.id == selected.id) {
    //         type.price = selected.price;
    //       }
    //     });
    //   });
    // },

    closeModalWindow() {
      let modal = document.getElementById("modal-edit-sales-type");
      if (window.event.target == modal) {
        modal.style.display = "none";
      }
    },
    closeModal() {
      let modal = document.getElementById("modal-edit-sales-type");
      modal.style.display = "none";
    },
    saveSalesType() {
      this.$emit("edit-sales-type", this.salesTypeSelected);
      this.closeModal();
    },
  },
};
</script>