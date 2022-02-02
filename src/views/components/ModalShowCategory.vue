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
    id="modal-show-category"
  >
    <!--modal content-->
    <div
      class="
        relative
        mx-auto
        top-14
        border
        w-5/6
        shadow-lg
        rounded-md
        bg-white
        overflow-y-auto
      "
    >
      <div class="flex justify-between py-3 shadow-md sticky top-0 bg-white">
        <div class="px-4 my-auto flex-grow">
          <input
            type="text"
            class="border-2 p-2 w-full rounded-md"
            v-model="category.name"
          />
        </div>
        <div class="px-4">
          <button
            @click="goToEdit()"
            class="bg-modern-green text-white py-3 px-6 rounded-md"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalShowCategory",
  props: ["category"],

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
      let modal = document.getElementById("modal-show-category");
      modal.style.display = "none";
    },
    closeModalWindow() {
      let modal = document.getElementById("modal-show-category");
      if (window.event.target == modal) {
        modal.style.display = "none";
      }
    },
    goToEdit() {
      this.$emit("editCategory");
    },
  },

  mounted() {},
};
</script>