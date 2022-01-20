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
    id="modal-edit-options"
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
          v-for="option in options"
          :key="option.key"
          class="flex items-center gap-2 p-3"
        >
          <input
            v-model="optionsSelected"
            :id="'check' + option.id"
            :value="option.id"
            type="checkbox"
          />
          <label :for="'check' + option.id">{{ option.name }}</label>
        </div>
        <div class="items-center px-4 py-3">
          <button
            @click="saveOptions()"
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
            Simpan Options
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalEditOptions",
  props: {
    options: Array,
    itemOptions: Array,
  },

  watch: {
    itemOptions: {
      handler: function (val, oldVal) {
        val.forEach((option) => {
          this.optionsSelected.push(option.id);
        });
      },
      deep: true,
    },
  },

  data() {
    return {
      optionsSelected: [],
    };
  },

  methods: {
    closeModalWindow() {
      let modal = document.getElementById("modal-edit-options");
      if (window.event.target == modal) {
        modal.style.display = "none";
      }
    },
    closeModal() {
      let modal = document.getElementById("modal-edit-options");
      modal.style.display = "none";
    },
    viewOptions() {
      let data = [];
      this.optionsSelected.forEach((id) => {
        this.options.forEach((option) => {
          if (option.id == id) {
            data.push(option);
          }
        });
      });
      let filterArray = [...new Map(data.map((v) => [v.id, v])).values()];
      return filterArray;
    },
    saveOptions() {
      let data = JSON.parse(JSON.stringify(this.optionsSelected));
      let arr = Array.from(new Set(data));
      this.$emit(
        "edit-options",
        arr,
        // JSON.stringify(new Set(data)),
        this.viewOptions()
      );
      this.closeModal();
    },
  },
};
</script>