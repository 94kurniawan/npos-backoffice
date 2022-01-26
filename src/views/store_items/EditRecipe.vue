<template>
  <div id="container" class="h-full relative bg-white">
    <div class="relative h-full w-full p-3">
      <div class="bg-white h-full overflow-y-auto pb-20">
        <div class="sticky top-0 bg-modern-green text-white">
          <p class="text-center uppercase p-3 md:mb-3 font-bold">Edit Recipe</p>
        </div>
        <p class="p-2 text-md text-right text-gray-500 uppercase">
          {{ item.name }}
        </p>

        <div class="p-2">
          <div class="grid grid-cols-3 items-center bg-gray-200 shadow-md">
            <div v-if="item.have_variants == true" class="col-span-3">
              <div
                class="
                  px-4
                  py-2
                  grid grid-cols-10
                  gap-2
                  uppercase
                  font-medium
                  items-center
                  bg-gray
                "
              >
                <div class="col-span-3">variant</div>
                <div class="col-span-7">recipe</div>
              </div>
              <div
                v-for="variant in item.variants"
                :key="variant.key"
                class="
                  px-4
                  py-2
                  grid grid-cols-10
                  w-full
                  gap-2
                  even:bg-gray-50
                  odd:bg-gray-100
                "
              >
                <div class="col-span-3 uppercase">{{ variant.name }}</div>
                <div v-if="variant.recipes.length != 0" class="col-span-7">
                  <div
                    v-for="ingredient in variant.recipes"
                    :key="ingredient.key"
                    class="md:flex md:gap-2"
                  >
                    <p class="uppercase flex items-center">
                      <svg
                        @click="
                          remove(ingredient.store_ingredient_id, variant.id)
                        "
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6 text-red-400 mr-1"
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
                      {{ ingredient.name }}
                    </p>
                    <p class="text-sm">
                      -> {{ ingredient.amount }} {{ ingredient.unit }}
                    </p>
                  </div>
                </div>
                <div
                  v-if="variant.recipes.length == 0"
                  class="col-span-7 px-4 bg-red-100"
                >
                  Belum ada recipe
                </div>
              </div>
            </div>
            <div v-if="item.have_variants == false" class="col-span-3">
              <div class="px-4 py-2 uppercase font-medium bg-gray">
                <div class="">recipe</div>
              </div>
              <div
                v-for="ingredient in item.recipes"
                :key="ingredient.key"
                class="
                  px-4
                  py-2
                  md:flex md:gap-2
                  even:bg-gray-50
                  odd:bg-gray-100
                "
              >
                <p class="uppercase flex items-center">
                  <svg
                    @click="remove(ingredient.store_ingredient_id, null)"
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-red-400 mr-1"
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
                  {{ ingredient.name }}
                </p>
                <p class="text-sm">
                  -> {{ ingredient.amount }} {{ ingredient.unit }}
                </p>
              </div>
              <div v-if="item.recipes.length == 0" class="px-4 bg-red-100">
                Belum ada recipe
              </div>
            </div>
          </div>
          <p class="mt-3">Tambah Recipe :</p>
          <!-- choose variant -->
          <div
            v-if="item.have_variants == true"
            class="grid grid-flow-row grid-cols-6 items-start py-2"
          >
            <div
              class="
                col-span-2
                py-2
                mr-2
                flex
                items-center
                text-sm text-gray-500
              "
            >
              Pilih Variant
              <!-- <svg
                  @click="addNewLine()"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 ml-2"
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
                </svg> -->
            </div>
            <select
              v-model="dataEdit.variant_id"
              class="border-2 rounded col-span-4 p-2.5"
            >
              <option
                v-for="variant in item.variants"
                :key="variant.key"
                :value="variant.id"
              >
                {{ variant.name }}
              </option>
            </select>
          </div>

          <!-- add recipe -->
          <div class="grid grid-flow-row grid-cols-6 items-start py-2">
            <div
              class="col-span-6 py-2 flex justify-between text-sm text-gray-500"
            >
              <div>Recipe</div>
              <div>Jumlah</div>
            </div>
            <div class="col-span-6 py-1 rounded">
              <div
                v-for="recipe in dataEdit.recipes"
                :key="recipe.key"
                class="grid grid-cols-8 gap-2"
              >
                <div class="col-span-6">
                  <select
                    v-model="recipe.ingredient"
                    class="border-2 rounded w-full py-2.5"
                  >
                    <!-- v-model="recipe.store_ingredient_id" -->
                    <option
                      v-for="ingredient in rawMaterials"
                      :key="ingredient.key"
                      :value="ingredient"
                    >
                      {{ ingredient.name }}
                    </option>
                  </select>
                </div>
                <div class="col-span-2">
                  <input
                    v-model="recipe.amount"
                    type="number"
                    class="border-2 rounded w-full text-right p-2"
                  />
                  <p class="text-xs text-right text-gray-500">
                    {{ recipe.ingredient.unit }}
                  </p>
                </div>
              </div>
            </div>
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
      @click="save()"
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
  </div>
</template>

<script>
import axios from "axios";
let apiHost = process.env.VUE_APP_BACKEND_HOST;

export default {
  name: "EditRecipe",

  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
      item: { id: null },
      dataEdit: {
        store_item_id: null, // from item.id
        variant_id: null,
        recipes: [
          {
            store_ingredient_id: null,
            amount: null,
            ingredient: { unit: "" },
          },
        ],
      },
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
    };
  },

  methods: {
    reset() {
      this.dataEdit = {
        store_item_id: null,
        variant_id: null,
        recipes: [
          {
            store_ingredient_id: null,
            amount: null,
            ingredient: { unit: "" },
          },
        ],
      };
    },
    goBack() {
      this.$router.go(-1);
    },
    getItem() {
      this.item = JSON.parse(localStorage.getItem("itemSelected"));
      // localStorage.removeItem("itemSelected");
    },
    addNewLine() {
      let recipe = {
        store_ingredient_id: null,
        amount: null,
      };
      this.dataEdit.recipes.push(recipe);
    },

    async fetchRawMaterials() {
      try {
        let headers = { Authorization: `Bearer ${this.user.token}` };
        const response = await axios.get(apiHost + "/api/store/ingredients", {
          headers,
          params: {
            store_id: localStorage.getItem("selectedStore"),
          },
        });
        this.rawMaterials = response.data.data;
      } catch (error) {
        console.log(error.response);
      }
    },

    async save() {
      try {
        this.dataEdit.store_item_id = this.item.id;
        this.dataEdit.recipes.forEach((recipe) => {
          recipe.store_ingredient_id = recipe.ingredient.id;
        });
        let headers = { Authorization: `Bearer ${this.user.token}` };
        await axios.post(apiHost + "/api/store/recipes", this.dataEdit, {
          headers,
        });
        this.showRecipe(this.item.id);
        alert("berhasil mengubah recipe");
        this.reset();
      } catch (error) {
        console.log(error);
      }
    },

    async showRecipe(id) {
      try {
        let headers = { Authorization: `Bearer ${this.user.token}` };
        const response = await axios.get(apiHost + "/api/store/recipes", {
          headers,
          params: {
            store_item_id: id,
          },
        });
        localStorage.setItem(
          "itemSelected",
          JSON.stringify(response.data.data)
        );
        this.getItem();
      } catch (error) {
        console.log(error);
      }
    },

    async remove(id, variant_id) {
      try {
        let headers = { Authorization: `Bearer ${this.user.token}` };
        const response = await axios.delete(apiHost + "/api/store/recipes", {
          headers,
          params: {
            store_item_id: this.item.id,
            variant_id: variant_id,
            ingredients_id: [id],
          },
        });
        this.showRecipe(this.item.id);
      } catch (error) {
        console.log(error);
      }
    },
  },

  mounted() {
    this.getItem();
    this.fetchRawMaterials();
  },
};
</script>
