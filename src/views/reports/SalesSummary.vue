<template>
  <div id="container" class="h-full relative bg-white">
    <div class="relative h-full w-full p-3">
      <div class="bg-white h-full overflow-y-auto pb-3">
        <div class="sticky top-0">
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
              @change="fetchSales()"
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
              @change="fetchSales()"
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
          <table class="w-full">
            <thead class="sticky top-10 text-sm">
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
        class="h-full bg-gray-500 bg-opacity-40 grid grid-cols-12"
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

      report: {
        total_gross_sales: 99000,
        discounts: [
          {
            discount_name: "50%",
            discount_percentage: 0.5,
            amount: 45000,
          },
        ],
        net_sales: 54000,
        additional_costs: [
          {
            add_cost_name: "PPN 5%",
            percentage: 0.05,
            amount: 2250,
          },
        ],
        total_collect: 56250,
        items: [
          {
            store_item_name: "Paket Kampung",
            store_item_id: 1,
            variant: "Dada",
            sold: "3",
            gross_sales: "90000",
            total_discount: 15000,
            net_sale: 45000,
            additional_cost: 2250,
            total_collected: 47250,
          },
          {
            store_item_name: "Air Mineral",
            store_item_id: 3,
            variant: null,
            sold: "3",
            gross_sales: "9000",
            total_discount: 0,
            net_sale: 9000,
            additional_cost: null,
            total_collected: null,
          },
        ],
      },

      showSideMenu: true,
    };
  },

  computed: {
    salesHistory() {
      let arr = [];
      let user = this.sales.cashier;
      // let user = JSON.parse(localStorage.getItem("user"));
      this.sales.orders.forEach((sale) => {
        let data = sale;
        let totalPrice = 0;
        let totalOption = 0;
        let totalDiscount = 0;
        let additionalCost = [];
        let totalAdditionalCost = 0;

        data.items.forEach((item) => {
          if (!item.discount_percentage) {
            item.discount_percentage = 0;
          }

          if (!item.option_price) {
            item.option_price = 0;
          }

          let total = item.quantity * item.price;
          let discount = total * item.discount_percentage || 0;
          let totalAfterDiscount = total - discount;
          totalPrice += total;
          totalOption += item.option_price || 0;
          totalDiscount += discount;
          item.total = total;
          item.total_discount = discount;
          // additional cost
          item.additional_costs.forEach((cost) => {
            let obj = {
              name: cost.name,
              total: cost.percentage * totalAfterDiscount,
            };
            cost.total = obj.total;
            let findAdditionalCost = [];
            additionalCost.forEach((addCost) => {
              if (addCost.name === obj.name) {
                addCost.total += obj.total;
                findAdditionalCost.push(true);
              } else {
                findAdditionalCost.push(false);
              }
            });
            if (!findAdditionalCost.includes(true)) {
              additionalCost.push(obj);
            }
          });
        });
        // total additional cost
        additionalCost.forEach((cost) => {
          totalAdditionalCost += cost.total;
        });

        data.total_price = totalPrice;
        data.total_option = totalOption;
        data.total_discount = totalDiscount;
        data.additional_cost = additionalCost;
        data.total_additional_cost = totalAdditionalCost;
        data.total =
          totalPrice + totalOption + totalAdditionalCost - totalDiscount;
        data.change = data.payment.received - data.total;
        data.store = {
          // name: user.store_name.toUpperCase(),
          address: user.store_address,
          cashier_name: user.name,
        };
        arr.push(data);
      });
      return arr;
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
    async fetchReport() {
      try {
        let headers = { Authorization: `Bearer ${this.user.token}` };
        const response = await axios.get(
          apiHost + "/api/store/fetch-sales-reports",
          {
            headers,
            params: {
              date_from: this.datePeriod.from,
              date_to: this.datePeriod.to,
              store_id: localStorage.getItem("selectedStore"),
            },
          }
        );
        this.report = response.data.data;
      } catch (error) {
        console.log(error.response);
      }
    },
  },

  created() {
    this.fetchReport();
  },
};
</script>
