<template>
  <div class="bg-white">
    <!-- <div class="bg-white">
      <p class="text-center uppercase pt-3 md:mb-3 font-bold">
        ({{ storeSelected.name }})
      </p>
      <hr />
      <p class="text-center uppercase p-3 md:mb-3 font-bold">
        Sales report - summary
      </p>
      <div
        class="
          grid
          items-center
          content-center
          justify-items-center
          grid-cols-2
          md:grid-cols-8
          gap-1
        "
      >
        <label class="mobile:hidden col-start-4 px-2">Period</label>
        <input
          disabled
          v-model="datePeriod.from"
          type="date"
          class="
            md:col-span-2
            w-full
            bg-white
            p-3
            border-2
            outline-none
            rounded-lg
          "
        />
        <input
          disabled
          v-model="datePeriod.to"
          type="date"
          class="
            md:col-span-2
            w-full
            bg-white
            p-3
            border-2
            outline-none
            rounded-lg
          "
        />
      </div>
    </div> -->
    <div class="py-3">
      <table class="w-full">
        <thead class="bg-white">
          <tr class="">
            <th colspan="3" class="py-3 px-4 text-center uppercase">
              STORE Ingredients ({{ selectedStoreDetails.name }})
            </th>
          </tr>
          <tr class="text-xs font-thin">
            <th colspan="3" class="py-3 px-4 text-right text-gray-500">
              dicetak : {{ today }}
            </th>
          </tr>
          <tr class="uppercase text-sm bg-gray-600 text-white">
            <th class="py-3 px-4 text-left">sku</th>
            <th class="py-3 px-4 text-left">item</th>
            <th class="py-3 px-4 text-right">Stok</th>
          </tr>
        </thead>
        <tbody class="text-gray-800 text-sm font-light">
          <tr
            v-for="item in rawMaterials"
            :key="item.key"
            class="
              border-b border-gray-200
              hover:bg-gray-100
              odd:bg-gray-50
              align-top
            "
          >
            <td class="py-3 px-4 text-left">
              <p class="text-sm text-gray-400">{{ item.sku }}</p>
            </td>
            <td class="py-3 px-4 text-left">
              <p>{{ item.name }}</p>
            </td>
            <td class="py-3 px-4 text-right">
              {{ separator(item.stock) }} {{ item.unit }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import "moment/locale/id";
import * as numberFormat from "@/custom_package/number.js";

export default {
  name: "PrintRawMaterials",

  data() {
    return {
      today: moment().format("LLLL"),
      selectedStoreDetails: JSON.parse(
        localStorage.getItem("selectedStoreDetails")
      ),
      rawMaterials: JSON.parse(localStorage.getItem("rawMaterials")),
    };
  },

  methods: {
    separator(number) {
      return numberFormat.separator(number);
    },
    print() {
      setTimeout(() => {
        window.print();
        window.close();
      }, 700);
      localStorage.removeItem("rawMaterials");
    },
  },

  created() {
    this.print();
  },
};
</script>
