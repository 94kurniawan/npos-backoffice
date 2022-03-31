<template>
  <div
    @click="closeModalWindow()"
    class="
      hidden
      fixed
      inset-0
      backdrop-filter backdrop-blur-md
      overflow-y-auto
      h-full
      w-full
    "
    id="modal-add-discount"
  >
    <!--modal content-->
    <div
      class="
        relative
        mx-auto
        top-14
        border
        mobile:w-5/6
        w-3/6
        shadow-lg
        rounded-md
        bg-white
        overflow-y-auto
      "
    >
      <div class="py-3 shadow-md sticky top-0 bg-white">
        <div class="px-4 my-auto flex-grow">
          <p class="px-1 text-gray-500">Select Store</p>
          <select
            v-model="discount.store_id"
            class="w-full bg-white px-2 py-2.5 border-2 outline-none rounded-lg"
          >
            <option
              v-for="store in user.info.stores"
              :key="store.key"
              :value="store.id"
            >
              {{ store.name }}
            </option>
          </select>
          <p class="px-1 text-gray-500">Discount Name</p>
          <input
            v-model="discount.name"
            type="text"
            class="border-2 p-2 w-full rounded-md"
            placeholder="Ex. Disc Owner"
          />
          <p class="px-1 text-gray-500">
            Discount Percentage ({{ percentage }}%)
          </p>
          <input
            v-model="percentage"
            type="number"
            class="border-2 p-2 w-full rounded-md"
            placeholder="Ex. 100"
          />
        </div>
        <div class="p-4 text-right">
          <button
            @click="save()"
            class="bg-modern-green text-white py-3 px-6 rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalAddDiscount",
  props: { user: Object },

  data() {
    return {
      percentage: null,
      discount: {
        store_id: null,
        name: "",
        percentage: null,
      },
    };
  },

  watch: {
    percentage(val, oldVal) {
      this.discount.percentage = val / 100;
    },
  },

  methods: {
    closeModal() {
      let modal = document.getElementById("modal-add-discount");
      modal.style.display = "none";
    },
    closeModalWindow() {
      let modal = document.getElementById("modal-add-discount");
      if (window.event.target == modal) {
        modal.style.display = "none";
      }
    },
    save() {
      this.$emit("addDiscount", this.discount);
      this.closeModal();
      this.discount = {};
      this.percentage = null;
    },
  },

  mounted() {},
};
</script>