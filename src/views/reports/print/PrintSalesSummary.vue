<template>
  <!-- <div id="container" class="h-full relative bg-white">
    <div class="relative h-full w-full p-3"> -->
  <div class="bg-white">
    <div class="bg-white">
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
    </div>
    <div class="py-3">
      <div class="flex justify-end md:hidden">
        <div class="w-full md:w-1/2 bg-blue-50 rounded-lg p-4">
          <!-- gross sales -->
          <div class="flex justify-between pb-2">
            <p class="uppercase font-bold">Gross Sales</p>
            <p class="text-right">
              {{ currency(report.total_gross_sales) }}
            </p>
          </div>
          <!-- discount -->
          <p class="uppercase">discount :</p>
          <div
            v-for="disc in report.discounts"
            :key="disc.key"
            class="col-span-2 flex justify-between"
          >
            <div class="">
              <p class="uppercase">-- {{ disc.discount_name }}</p>
            </div>
            <div class="">
              <p class="text-right text-gray-500">
                ({{ currency(disc.amount) }})
              </p>
            </div>
          </div>
          <!-- net sales -->
          <div class="flex justify-between py-2">
            <p class="uppercase font-bold">net Sales</p>
            <p class="text-right">
              {{ currency(report.net_sales) }}
            </p>
          </div>
          <!-- additional costs -->
          <p class="uppercase">add costs :</p>
          <div
            v-for="addCost in report.additional_costs"
            :key="addCost.key"
            class="col-span-2 flex justify-between"
          >
            <div class="">
              <p class="uppercase">-- {{ addCost.add_cost_name }}</p>
            </div>
            <div class="">
              <p class="text-right text-gray-500">
                {{ currency(addCost.amount) }}
              </p>
            </div>
          </div>
          <!-- total collected -->
          <div class="flex justify-between mt-2 py-3 border-t-2 border-b-2">
            <p class="uppercase font-bold">total collected</p>
            <p class="text-right font-bold">
              {{ currency(report.total_collect) }}
            </p>
          </div>
        </div>
      </div>

      <p class="px-4 pt-4">Sales Details :</p>
      <table v-if="reportByCategory == 'false'" class="w-full">
        <thead class="sticky top-0 bg-white text-sm">
          <tr class="uppercase">
            <th class="py-3 px-4 text-left">item</th>
            <th class="py-3 px-4 text-left mobile:hidden">variant</th>
            <th class="py-3 px-4 text-right">sold</th>
            <th class="py-3 px-4 text-right mobile:hidden">gross sales</th>
            <th class="py-3 px-4 text-right mobile:hidden">discount</th>
            <th class="py-3 px-4 text-right mobile:hidden">net sale</th>
            <th class="py-3 px-4 text-right mobile:hidden">add cost</th>
            <th class="py-3 px-4 text-right">collected</th>
          </tr>
        </thead>
        <tbody class="text-gray-800 text-sm font-light">
          <tr
            v-for="item in report.items"
            :key="item.key"
            class="
              border-b border-gray-200
              hover:bg-gray-100
              odd:bg-gray-50
              align-top
            "
          >
            <td class="py-3 px-4 text-left">
              {{ item.store_item_name }}
              <p class="sm:hidden text-gray-500">{{ item.variant }}</p>
            </td>
            <td class="py-3 px-4 text-left mobile:hidden">
              {{ item.variant }}
            </td>
            <td class="py-3 px-4 text-right">{{ separator(item.sold) }}</td>
            <td class="py-3 px-4 text-right mobile:hidden">
              {{ separator(item.gross_sales) }}
            </td>
            <td class="py-3 px-4 text-right mobile:hidden">
              {{ separator(item.total_discount) }}
            </td>
            <td class="py-3 px-4 text-right mobile:hidden">
              {{ separator(item.net_sale) }}
            </td>
            <td class="py-3 px-4 text-right mobile:hidden">
              {{ separator(item.additional_cost) }}
            </td>
            <td class="py-3 px-4 text-right">
              {{ separator(item.total_collected) }}
            </td>
          </tr>
        </tbody>
      </table>

      <table v-if="reportByCategory == 'true'" class="w-full">
        <thead class="sticky top-0 bg-white text-sm">
          <tr class="uppercase">
            <th class="py-3 px-4 text-left">item</th>
            <th class="py-3 px-4 text-left mobile:hidden">variant</th>
            <th class="py-3 px-4 text-right">sold</th>
            <th class="py-3 px-4 text-right mobile:hidden">gross sales</th>
            <th class="py-3 px-4 text-right mobile:hidden">discount</th>
            <th class="py-3 px-4 text-right mobile:hidden">net sale</th>
            <th class="py-3 px-4 text-right mobile:hidden">add cost</th>
            <th class="py-3 px-4 text-right">collected</th>
          </tr>
        </thead>
        <tbody
          v-for="category in report.categories"
          :key="category.key"
          class="text-gray-800 text-sm font-light"
        >
          <tr
            v-if="category.items.length != 0"
            class="border-b bg-blue-100 border-gray-200 align-top"
          >
            <td colspan="8" class="py-1 px-4 text-left">
              <p class="font-bold text-left">
                <i class="mobile:hidden">Category: </i>{{ category.name }}
              </p>
            </td>
          </tr>
          <tr
            v-for="item in category.items"
            :key="item.key"
            class="
              border-b border-gray-200
              hover:bg-gray-100
              odd:bg-gray-50
              align-top
            "
          >
            <td class="py-3 px-4 text-left">
              {{ item.store_item_name }}
              <p class="sm:hidden text-gray-500">{{ item.variant }}</p>
            </td>
            <td class="py-3 px-4 text-left mobile:hidden">
              {{ item.variant }}
            </td>
            <td class="py-3 px-4 text-right">
              {{ separator(item.sold) }}
            </td>
            <td class="py-3 px-4 text-right mobile:hidden">
              {{ separator(item.gross_sales) }}
            </td>
            <td class="py-3 px-4 text-right mobile:hidden">
              {{ separator(item.total_discount) }}
            </td>
            <td class="py-3 px-4 text-right mobile:hidden">
              {{ separator(item.net_sale) }}
            </td>
            <td class="py-3 px-4 text-right mobile:hidden">
              {{ separator(item.additional_cost) }}
            </td>
            <td class="py-3 px-4 text-right">
              {{ separator(item.total_collected) }}
            </td>
          </tr>
        </tbody>
      </table>

      <div class="flex justify-end mt-3 mobile:hidden">
        <div class="w-full md:w-1/2 bg-blue-50 rounded-lg p-4">
          <!-- gross sales -->
          <div class="flex justify-between pb-2">
            <p class="uppercase font-bold">Gross Sales</p>
            <p class="text-right">
              {{ currency(report.total_gross_sales) }}
            </p>
          </div>
          <!-- discount -->
          <p class="uppercase">discount :</p>
          <div
            v-for="disc in report.discounts"
            :key="disc.key"
            class="col-span-2 flex justify-between"
          >
            <div class="">
              <p class="uppercase">-- {{ disc.discount_name }}</p>
            </div>
            <div class="">
              <p class="text-right text-gray-500">
                ({{ currency(disc.amount) }})
              </p>
            </div>
          </div>
          <!-- net sales -->
          <div class="flex justify-between py-2">
            <p class="uppercase font-bold">net Sales</p>
            <p class="text-right">
              {{ currency(report.net_sales) }}
            </p>
          </div>
          <!-- additional costs -->
          <p class="uppercase">add costs :</p>
          <div
            v-for="addCost in report.additional_costs"
            :key="addCost.key"
            class="col-span-2 flex justify-between"
          >
            <div class="">
              <p class="uppercase">-- {{ addCost.add_cost_name }}</p>
            </div>
            <div class="">
              <p class="text-right text-gray-500">
                {{ currency(addCost.amount) }}
              </p>
            </div>
          </div>
          <!-- total collected -->
          <div class="flex justify-between mt-2 py-3 border-t-2 border-b-2">
            <p class="uppercase font-bold">total collected</p>
            <p class="text-right font-bold">
              {{ currency(report.total_collect) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- </div>
  </div> -->
</template>

<script>
import moment from "moment";
import "moment/locale/id";
import * as numberFormat from "@/custom_package/number.js";

export default {
  name: "PrintSalesSummary",

  data() {
    return {
      datePeriod: {},
      storeSelected: {},
      report: {},
      reportByCategory: null,
    };
  },

  methods: {
    currency(number) {
      return numberFormat.currency(number);
    },
    separator(number) {
      return numberFormat.separator(number);
    },
    formatDateInIDN(date) {
      return moment(date).format("LL");
    },
    fetchReport() {
      this.datePeriod = JSON.parse(localStorage.getItem("datePeriod"));
      this.storeSelected = JSON.parse(localStorage.getItem("storeSelected"));
      this.report = JSON.parse(localStorage.getItem("salesSummary"));
      this.reportByCategory = localStorage.getItem("reportByCategory");
      this.print();
    },
    print() {
      setTimeout(() => {
        window.print();
        window.close();
      }, 700);
      localStorage.removeItem("salesSummary");
      localStorage.removeItem("storeSelected");
      localStorage.removeItem("datePeriod");
      localStorage.removeItem("reportByCategory");
    },
  },

  created() {
    this.fetchReport();
  },
};
</script>
