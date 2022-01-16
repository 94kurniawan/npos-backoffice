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
    id="modal-add-variant"
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
        <div class="flex items-center justify-between gap-2 p-3">
          <label>Nama Variant</label>
          <input
            @keyup.enter="saveVariant()"
            v-model="variant.name"
            class="border rounded p-3"
            type="text"
          />
        </div>
        <div class="flex items-center justify-between gap-2 p-3">
          <label>SKU</label>
          <input
            v-model="variant.sku"
            class="border rounded p-3"
            type="text"
            placeholder="Boleh Kosong"
          />
        </div>
        <div class="items-center px-4 py-3">
          <button
            @click="saveVariant()"
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
            Tambah Variant
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalAddVariant",
  components: {},

  data() {
    return {
      variant: {
        name: "",
        sku: "",
      },
    };
  },

  methods: {
    closeModalWindow() {
      let modal = document.getElementById("modal-add-variant");
      if (window.event.target == modal) {
        modal.style.display = "none";
      }
    },
    closeModal() {
      let modal = document.getElementById("modal-add-variant");
      modal.style.display = "none";
    },
    saveVariant() {
      this.$emit("add-new-variant", this.variant);
      this.closeModal();
    },
  },
};
</script>