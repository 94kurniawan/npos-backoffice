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
    id="modal-add-category"
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
            v-model="category_name"
          />
        </div>
        <div class="px-4">
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
  name: "ModalAddCategory",

  data() {
    return {
      category_name: "",
    };
  },

  methods: {
    closeModal() {
      let modal = document.getElementById("modal-add-category");
      modal.style.display = "none";
    },
    closeModalWindow() {
      let modal = document.getElementById("modal-add-category");
      if (window.event.target == modal) {
        modal.style.display = "none";
      }
    },
    save() {
      this.$emit("addCategory", this.category_name);
      this.closeModal();
      this.category_name = "";
    },
  },

  mounted() {},
};
</script>