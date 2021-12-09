<template>
  <div id="container" class="h-full relative bg-white">
    <div class="relative h-full w-full p-3 overflow-y-auto">
      <p class="text-center uppercase p-3">Sales report - summary</p>
      <div class="bg-white col-span-5 overflow-y-auto pb-3">
        <div class="sticky top-0">
          <div class="grid grid-cols-2">
            <input
              @change="fetchSales()"
              v-model="datePeriod.from"
              type="date"
              class="w-full bg-white p-3 border-b-2 border-r-2 outline-none"
            />
            <input
              @change="fetchSales()"
              v-model="datePeriod.to"
              type="date"
              class="w-full bg-white p-3 border-b-2 outline-none"
            />
          </div>
        </div>
        <div class="py-3">
          <!-- <table class="h-full w-full">
            <tbody class="text-gray-800 text-sm font-light">
              <tr
                v-for="history in salesHistory"
                :key="history.key"
                @click="showReceipt(history)"
                class="
                  border-b border-gray-200
                  hover:bg-gray-100
                  odd:bg-gray-50
                  align-top
                "
              >
                <td class="py-3 px-4 text-left">
                  <p class="font-bold">
                    {{ history.payment.number }}
                  </p>
                  <p class="">
                    {{ formatDateInIDN(history.order_date) }}
                  </p>
                </td>
                <td class="py-3 px-4 text-left whitespace-nowrap">
                  <p>{{ history.customer_name }}</p>
                  <p>Table: {{ history.table_number }}</p>
                </td>
                <td class="py-3 px-4 text-right whitespace-nowrap">
                  {{ currency(history.total) }}
                </td>
              </tr>
            </tbody>
          </table> -->
          <div
            v-for="history in salesHistory"
            :key="history.key"
            @click="showReceipt(history)"
            class="
              px-4
              py-1
              grid grid-cols-11
              gap-1
              border-b
              odd:bg-gray-50
              active:bg-gray-100
            "
          >
            <div class="col-span-3 text-sm">
              <p class="truncate">{{ history.payment.number }}</p>
              <p class="text-sm text-gray-400">
                {{ formatDateInIDN(history.order_date) }}
              </p>
            </div>
            <div class="col-span-4">
              <p class="truncate">{{ history.customer_name }}</p>
              <p v-if="history.table_number" class="text-sm text-gray-400">
                {{ "TABLE :" + history.table_number }}
              </p>
            </div>
            <div class="col-span-4 text-right">
              <p class="truncate">{{ currency(history.total) }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Print & refund Button -->
      <div
        :class="{ hidden: hideReceipt }"
        class="absolute w-full flex gap-4 justify-end bottom-3 right-8"
      >
        <button
          class="
            py-4
            w-52
            bg-blue-400
            text-white
            flex
            justify-center
            items-center
            content-center
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
          <p class="ml-1 text-xl">Print Receipt</p>
        </button>
        <button
          @click="confirmDelete()"
          class="py-4 w-40 bg-red-400 text-white"
        >
          Refund
        </button>
      </div>

      <!-- modal confirm Delete -->
      <modal-delete @yes="deleteSale" />
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
            md:col-span-3
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
import ModalDelete from "@/views/components/ModalDelete.vue";
import axios from "axios";
let apiHost = process.env.VUE_APP_BACKEND_HOST;

export default {
  name: "SalesSummary",
  components: {
    SideMenu,
    ModalDelete,
  },

  data() {
    return {
      token: localStorage.getItem("token"),
      user: JSON.parse(localStorage.getItem("user")),
      datePeriod: {
        from: moment().format("YYYY-MM-DD"),
        to: moment().format("YYYY-MM-DD"),
      },

      sales: {
        cashier: {
          id: null,
          name: "",
          store_name: "a",
          store_address: "",
        },
        orders: [
          {
            id: 1,
            order_number: "1638785651",
            customer_name: null,
            table_number: null,
            order_date: "2021-12-06",
            items: [
              {
                id: 4,
                name: "Teh Botol",
                sku: "TH-1",
                variant: null,
                sales_type: "Dine in",
                quantity: 2,
                price: 5000,
                option: null,
                option_price: null,
                discount_name: null,
                discount_percentage: null,
                additional_costs: [
                  {
                    name: "PPN 5%",
                    percentage: 0.05,
                  },
                ],
              },
              {
                id: 3,
                name: "Air Mineral",
                sku: "MNRL-1",
                variant: null,
                sales_type: "Dine in",
                quantity: 1,
                price: 3000,
                option: null,
                option_price: null,
                discount_name: null,
                discount_percentage: null,
                additional_costs: [
                  {
                    name: "PPN 5%",
                    percentage: 0.05,
                  },
                ],
              },
              {
                id: 2,
                name: "Paket betina",
                sku: "PKTBTN-D",
                variant: "Dada",
                sales_type: "Dine in",
                quantity: 3,
                price: 20000,
                option: "Nasi TO",
                option_price: 0,
                discount_name: "50%",
                discount_percentage: 0.5,
                additional_costs: [
                  {
                    name: "PPN 5%",
                    percentage: 0.05,
                  },
                ],
              },
            ],
            payment: {
              id: 1,
              number: "PYMT-1638785651",
              date: "2021-12-06",
              type: "Cash",
              received: 100000,
            },
          },
        ],
      },

      hideReceipt: true,
      receipt: {
        id: null,
        order_number: "",
        customer_name: null,
        table_number: null,
        order_date: "",
        items: [
          // {
          //   id: 4,
          //   name: "Teh Botol",
          //   sku: "TH-1",
          //   variant: null,
          //   sales_type: "Dine in",
          //   quantity: 2,
          //   price: 5000,
          //   option: null,
          //   option_price: 0,
          //   discount_name: null,
          //   discount_percentage: 0,
          //   additional_costs: [
          //     { name: "PPN 5%", percentage: 0.05, total: 500 },
          //   ],
          //   total: 10000,
          //   total_discount: 0,
          // },
          // {
          //   id: 3,
          //   name: "Air Mineral",
          //   sku: "MNRL-1",
          //   variant: null,
          //   sales_type: "Dine in",
          //   quantity: 1,
          //   price: 3000,
          //   option: null,
          //   option_price: 0,
          //   discount_name: null,
          //   discount_percentage: 0,
          //   additional_costs: [
          //     { name: "PPN 5%", percentage: 0.05, total: 150 },
          //   ],
          //   total: 3000,
          //   total_discount: 0,
          // },
          // {
          //   id: 2,
          //   name: "Paket betina",
          //   sku: "PKTBTN-D",
          //   variant: "Dada",
          //   sales_type: "Dine in",
          //   quantity: 3,
          //   price: 20000,
          //   option: "Nasi TO",
          //   option_price: 0,
          //   discount_name: "50%",
          //   discount_percentage: 0.5,
          //   additional_costs: [
          //     { name: "PPN 5%", percentage: 0.05, total: 1500 },
          //   ],
          //   total: 60000,
          //   total_discount: 30000,
          // },
        ],
        payment: {
          // id: 1,
          // number: "PYMT-1638785651",
          // date: "2021-12-06",
          // type: "Cash",
          // received: 100000,
        },
        total_price: null,
        total_option: null,
        total_discount: null,
        additional_cost: [{ name: "", total: null }],
        total_additional_cost: null,
        total: null,
        change: null,
        store: {
          name: "",
          address: "",
          cashier_name: "",
        },
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
    resetReceipt() {
      this.receipt = {
        id: null,
        order_number: "",
        customer_name: null,
        table_number: null,
        order_date: "",
        items: [{}],
        payment: {},
        total_price: null,
        total_option: null,
        total_discount: null,
        additional_cost: [{ name: "", total: null }],
        total_additional_cost: null,
        total: null,
        change: null,
        store: {
          name: "",
          address: "",
          cashier_name: "",
        },
      };
    },
    showReceipt(receipt) {
      this.receipt = receipt;
      this.hideReceipt = false;
    },
    closeReceipt() {
      this.resetReceipt();
      this.hideReceipt = true;
    },
    async fetchSales() {
      try {
        let headers = { Authorization: `Bearer ${this.token}` };
        const response = await axios.get(apiHost + "/api/store/order", {
          headers,
          params: {
            date_from: this.datePeriod.from,
            date_to: this.datePeriod.to,
          },
        });
        this.sales = response.data.data;
        this.closeReceipt();
      } catch (error) {
        console.log(error.response);
      }
    },
    confirmDelete() {
      let modal = document.getElementById("modal-delete");
      modal.style.display = "block";
    },
    async deleteSale() {
      try {
        let headers = { Authorization: `Bearer ${this.token}` };
        const response = await axios.delete(
          apiHost + "/api/store/order/" + this.receipt.id,
          {
            headers,
          }
        );
        console.log(response);
        this.fetchSales();
        alert(response.data.message);
      } catch (error) {
        console.log(error.response);
      }
    },
  },

  created() {
    this.fetchSales();
  },
};
</script>
