<template>
  <div id="container" class="h-full relative bg-white">
    <div class="relative h-full w-full p-3">
      <div class="bg-white h-full overflow-y-auto pb-20">
        <div class="bg-white">
          <p class="text-center uppercase p-3 md:mb-3 font-bold">
            Sales report - summary
          </p>
          <div
            class="
              grid
              items-start
              justify-items-center
              grid-cols-2
              md:grid-cols-8
              gap-1
            "
          >
            <label class="mobile:hidden col-start-2 px-2">Period</label>
            <input
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
            <div class="col-span-2 w-full text-right">
              <select
                v-model="storeSelected"
                class="
                  w-full
                  bg-white
                  px-3
                  py-3.5
                  border-2
                  outline-none
                  rounded-lg
                "
              >
                <option
                  v-for="store in user.info.stores"
                  :key="store.key"
                  :value="store"
                >
                  {{ store.name }}
                </option>
              </select>
              <input
                @click="groupByCategoryChecked()"
                checked
                type="checkbox"
                id="checkbox1"
                value="1"
                class="checked:bg-red-600 checked:border-red-500"
              />
              <label for="checkbox1"> Group by Category</label>
            </div>
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
          <table v-if="reportByCategory == false" class="w-full">
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
                @click="showReceipt(history)"
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

          <table v-if="reportByCategory == true" class="w-full">
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
                @click="showReceipt(history)"
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
    </div>

    <!-- print button -->
    <button
      @click="print()"
      type="submit"
      class="
        absolute
        flex
        bg-blue-400
        text-white
        p-3
        rounded
        items-center
        bottom-6
        left-4
      "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
        />
      </svg>
      <p class="px-1">Print</p>
    </button>

    <!-- side menu -->
    <button
      @click="showMenu()"
      type="submit"
      class="absolute top-6 left-4 z-20"
    >
      <svg
        v-if="showSideMenu === false"
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
      <svg
        v-if="showSideMenu === true"
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>

    <div v-if="showSideMenu === true" class="absolute h-full w-full top-0">
      <div
        id="sideMenuSalesHistory"
        @click="closeMenuWindow()"
        class="h-full backdrop-filter backdrop-blur-sm grid grid-cols-12"
      >
        <div
          class="
            h-full
            col-span-8
            sm:col-span-4
            lg:col-span-3
            bg-gray-200
            overflow-y-auto
          "
        >
          <side-menu />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import "moment/locale/id";
import * as numberFormat from "@/custom_package/number.js";
import SideMenu from "@/views/components/SideMenu.vue";
import axios from "axios";
let apiHost = process.env.VUE_APP_BACKEND_HOST;

export default {
  name: "SalesSummary",
  components: {
    SideMenu,
  },

  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
      datePeriod: {
        from: moment().format("YYYY-MM-DD"),
        to: moment().format("YYYY-MM-DD"),
      },
      storeSelected: JSON.parse(localStorage.getItem("selectedStoreDetails")),

      report: {
        total_gross_sales: null,
        discounts: [
          {
            discount_name: "",
            discount_percentage: null,
            amount: null,
          },
        ],
        net_sales: null,
        additional_costs: [
          {
            add_cost_name: "",
            percentage: null,
            amount: null,
          },
        ],
        total_collect: null,
        items: [
          // {
          //   store_item_name: "",
          //   store_item_id: null,
          //   variant: null,
          //   sold: "",
          //   gross_sales: "",
          //   total_discount: null,
          //   net_sale: null,
          //   additional_cost: null,
          //   total_collected: null,
          // },
        ],
      },

      reportByCategory: true,

      showSideMenu: true,
    };
  },

  watch: {
    reportByCategory() {
      this.fetchReport();
    },

    datePeriod: {
      handler: function () {
        this.fetchReport();
      },
      deep: true,
    },
    storeSelected: {
      handler: function () {
        this.fetchReport();
      },
      deep: true,
    },
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
    showMenu() {
      if (this.showSideMenu === false) {
        this.showSideMenu = true;
      } else {
        this.showSideMenu = false;
      }
    },
    closeMenuWindow() {
      let win = document.getElementById("sideMenuSalesHistory");
      if (window.event.target == win) {
        this.showSideMenu = false;
      }
    },
    fillStoreSelected() {
      // this.user = JSON.parse(localStorage.getItem("user"));
      this.storeSelected = this.user.info.stores[0];
    },
    async fetchReport() {
      let link = "";
      if (this.reportByCategory == true) {
        link = "/api/store/fetch-sales-reports-by-category";
      } else {
        link = "/api/store/fetch-sales-reports";
      }
      try {
        let headers = { Authorization: `Bearer ${this.user.token}` };
        const response = await axios.get(apiHost + link, {
          headers,
          params: {
            date_from: this.datePeriod.from,
            date_to: this.datePeriod.to,
            store_id: this.storeSelected.id,
          },
        });
        this.report = response.data.data;
      } catch (error) {
        console.log(error.response);
      }
    },

    groupByCategoryChecked() {
      let check = document.querySelector("#checkbox1").checked; // true or false
      this.reportByCategory = check;
    },
    print() {
      localStorage.setItem("datePeriod", JSON.stringify(this.datePeriod));
      localStorage.setItem("storeSelected", JSON.stringify(this.storeSelected));
      localStorage.setItem("salesSummary", JSON.stringify(this.report));
      localStorage.setItem("reportByCategory", this.reportByCategory);
      let router = this.$router.resolve({
        name: "PrintSalesSummary",
      });

      window.open(router.href, "", "width=1000,height=650");
    },
  },

  mounted() {
    this.fetchReport();
  },
};
</script>
