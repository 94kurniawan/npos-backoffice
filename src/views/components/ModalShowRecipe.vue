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
    id="modal-show-recipe"
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
            @click="goToEditRecipe()"
            class="bg-modern-green text-white py-3 px-6 rounded-md"
          >
            Edit
          </button>
        </div>
      </div>
      <div v-if="item.have_variants == true">
        <div
          class="grid grid-cols-3 items-center px-4 py-2 bg-gray-200 uppercase"
        >
          <p class="py-2 mr-2 text-sm">variant ({{ item.variants.length }})</p>
          <div class="col-span-2 py-1">recipe</div>
        </div>
        <div
          v-for="variant in item.variants"
          :key="variant.key"
          class="grid grid-cols-3 items-start px-4 py-2"
        >
          <p class="py-2 mr-2 text-sm text-gray-500 uppercase">
            {{ variant.name }}
          </p>
          <div
            v-if="variant.recipes.length != 0"
            class="col-span-2 py-1 px-3 bg-yellow-100 rounded"
          >
            <div v-for="ingredient in variant.recipes" :key="ingredient.key">
              {{ ingredient.amount }} {{ ingredient.unit }} -
              {{ ingredient.name }}
            </div>
          </div>
          <div
            v-if="variant.recipes.length == 0"
            class="col-span-2 py-1 px-3 rounded bg-red-100"
          >
            Belum ada recipe
          </div>
        </div>
      </div>
      <div v-if="item.have_variants == false">
        <div
          class="py-2 px-4 mb-1 bg-yellow-100"
          v-for="ingredient in item.recipes"
          :key="ingredient.key"
        >
          {{ ingredient.amount }} {{ ingredient.unit }} -
          {{ ingredient.name }}
        </div>
        <div
          v-if="item.recipes.length == 0"
          class="col-span-2 py-1 px-3 rounded bg-red-100"
        >
          Belum ada recipe
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as numberFormat from "@/custom_package/number.js";

export default {
  name: "ModalShowRecipe",
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
      let modal = document.getElementById("modal-show-recipe");
      modal.style.display = "none";
    },
    closeModalWindow() {
      let modal = document.getElementById("modal-show-recipe");
      if (window.event.target == modal) {
        modal.style.display = "none";
      }
    },
    goToEditRecipe() {
      localStorage.setItem("itemSelected", JSON.stringify(this.item));
      this.$router.push("edit-recipe");
    },
  },

  mounted() {},
};
</script>