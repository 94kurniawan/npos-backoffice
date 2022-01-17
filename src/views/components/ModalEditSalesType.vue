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
      <div class="mt-3">
        <div
          v-for="type in salesTypeSelected"
          :key="type.key"
          class="flex items-center justify-between gap-2 px-3 py-1"
        >
          <label>{{ type.name }}</label>
          <input
            type="number"
            v-model="type.price"
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
export default {
  name: "ModalEditSalesType",
  props: {
    salesType: Array,
    itemSalesType: Array,
  },

  watch: {
    salesType: {
      handler: function (val, oldVal) {
        this.salesTypeSelected = JSON.parse(JSON.stringify(val));
        this.fillSalesType();
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
    fillSalesType() {
      this.salesTypeSelected.forEach((type) => {
        this.itemSalesType.forEach((selected) => {
          if (type.id == selected.id) {
            type.price = selected.price;
          }
        });
      });
    },

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