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
    id="modal-show-item"
  >
    <!--modal content-->
    <div
      class="
        relative
        mx-auto
        top-14
        border
        w-5/6
        h-5/6
        shadow-lg
        rounded-md
        bg-white
        overflow-y-auto
      "
    >
      <div class="flex justify-between py-3 shadow-md sticky top-0 bg-white">
        <p class="px-4 my-auto">
          <i class="uppercase not-italic">{{ item.name }}</i>
        </p>
        <div class="px-4">
          <button
            @click="goToEditItem()"
            class="bg-modern-green text-white py-3 px-6 rounded-md"
          >
            Edit
          </button>
        </div>
      </div>
      <div class="flex items-center px-4 py-2">
        <p class="py-2 mr-2 text-sm text-gray-500">Category</p>
        <div class="py-1 px-3 bg-yellow-200 rounded">
          {{ item.store_category_name }}
        </div>
      </div>
      <div v-if="item.variants.length > 0" class="px-4 py-2">
        <p class="py-2 text-sm text-gray-500">Variants</p>
        <div class="grid grid-flow-row mobile:grid-cols-2 grid-cols-3 gap-3">
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
            "
          >
            {{ variant.name }}
          </div>
        </div>
      </div>
      <div v-if="item.options.length > 0" class="px-4 py-2">
        <p class="py-2 text-sm text-gray-500">Options</p>
        <div class="grid grid-flow-row mobile:grid-cols-2 grid-cols-3 gap-3">
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
            "
          >
            {{ option.name }}
          </div>
        </div>
      </div>
      <div class="px-4 py-2">
        <p class="py-2 text-sm text-gray-500">Sales Type</p>
        <div class="grid grid-flow-row mobile:grid-cols-2 grid-cols-3 gap-3">
          <div
            v-for="salesType in item.sales_types"
            :key="salesType.key"
            class="
              border-2
              p-3
              align-middle
              bg-gray-50
              rounded-md
              active:bg-gray-200
            "
          >
            <p>{{ salesType.name }}</p>
            <p>{{ currency(salesType.price) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as numberFormat from "@/custom_package/number.js";

export default {
  name: "ModalShowItem",
  props: {
    item: Object,
  },

  data() {
    return {
      temporary: {},
    };
  },

  methods: {
    currency(number) {
      return numberFormat.currency(number);
    },
    closeModal() {
      let modal = document.getElementById("modal-show-item");
      modal.style.display = "none";
    },
    closeModalWindow() {
      let modal = document.getElementById("modal-show-item");
      if (window.event.target == modal) {
        modal.style.display = "none";
      }
    },
    goToEditItem() {
      localStorage.setItem("itemSelected", JSON.stringify(this.item));
      this.$router.push("edit-item");
    },
  },

  mounted() {},
};
</script>