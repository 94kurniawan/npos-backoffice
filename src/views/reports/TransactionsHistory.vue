<template>
  <div id="container" class="h-full relative bg-white">
    <div class="relative h-full w-full p-3">
      <div class="bg-white h-full overflow-y-auto pb-20">
        <div class="bg-white">
          <p class="text-center uppercase p-3 md:mb-3 font-bold">
            Transactions History
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
            <label class="mobile:hidden col-start-2 px-2">Period</label>
            <input
              @change="fetchTransactionsHistory()"
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
              @change="fetchTransactionsHistory()"
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
            <select
              @change="fetchTransactionsHistory()"
              v-model="storeSelected"
              class="
                col-span-2
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
          </div>
        </div>
        <div class="py-3">
          <p class="px-4 pt-4">Sales Details :</p>
          <table class="w-full">
            <thead class="sticky top-0 bg-white text-sm">
              <tr class="uppercase">
                <th class="py-3 px-4 text-left mobile:hidden">Kasir</th>
                <th class="py-3 px-4 text-left">Nomor</th>
                <th class="py-3 px-4 text-left">Customer</th>
                <th class="py-3 px-4 text-right">Total</th>
              </tr>
            </thead>
            <tbody class="text-gray-800 text-sm font-light">
              <tr
                @click="showModalReceipt(data)"
                v-for="data in filterTransactionsHistory"
                :key="data.key"
                class="
                  border-b border-gray-200
                  hover:bg-gray-100
                  odd:bg-gray-50
                  align-top
                "
              >
                <td class="py-3 px-4 text-left mobile:hidden">
                  {{ data.store.cashier_name }}
                </td>
                <td class="py-3 px-4">
                  <p>{{ data.payment.number }}</p>
                  <p>{{ formatDateInIDN(data.order_date) }}</p>
                </td>
                <td class="py-3 px-4">
                  <p v-if="data.table_number != undefined">
                    Table : {{ data.table_number }}
                  </p>
                  <p>{{ data.customer_name }}</p>
                </td>
                <td class="py-3 px-4 text-right">
                  {{ separator(data.total) }}
                </td>
              </tr>
            </tbody>
          </table>
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

    <modal-receipt :receipt="receiptSelected" />
  </div>
</template>

<script>
import moment from "moment";
import "moment/locale/id";
import * as numberFormat from "@/custom_package/number.js";
import SideMenu from "@/views/components/SideMenu.vue";
import ModalReceipt from "@/views/components/ModalReceipt.vue";
import axios from "axios";
let apiHost = process.env.VUE_APP_BACKEND_HOST;

export default {
  name: "TransactionsHistory",
  components: {
    SideMenu,
    ModalReceipt,
  },

  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
      datePeriod: {
        from: moment().format("YYYY-MM-DD"),
        to: moment().format("YYYY-MM-DD"),
      },
      storeSelected: {
        id: null,
        name: "",
      },

      receiptSelected: {
        id: null,
        order_number: "",
        customer_name: "",
        table_number: "",
        order_date: "",
        items: [
          {
            id: null,
            name: "",
            category_id: null,
            category_name: "",
            sku: null,
            variant: null,
            sales_type: "",
            quantity: null,
            price: null,
            option: null,
            option_price: null,
            discount_name: null,
            discount_percentage: null,
            additional_costs: [{ name: "", percentage: null, total: null }],
            note: null,
            total: null,
            total_discount: null,
          },
        ],
        payment: {
          id: null,
          number: "",
          date: "",
          type: "",
          received: null,
        },
        total_price: null,
        total_option: null,
        total_discount: null,
        additional_cost: [{ name: "", total: null }],
        total_additional_cost: null,
        total: null,
        change: null,
        store: { address: "", cashier_name: "" },
      },

      transactionsHistory: [
        {
          cashier_id: null,
          cashier_name: "",
          orders: [
            {
              id: null,
              order_number: "",
              customer_name: "",
              table_number: null,
              order_date: "",
              items: [
                {
                  id: null,
                  name: "",
                  category_id: null,
                  category_name: null,
                  sku: "",
                  variant: "",
                  sales_type: "",
                  quantity: null,
                  price: null,
                  option: null,
                  option_price: null,
                  discount_name: null,
                  discount_percentage: null,
                  additional_costs: [],
                  note: null,
                },
              ],
              payment: {
                id: null,
                number: "",
                date: "",
                type: "",
                received: null,
              },
            },
          ],
        },
      ],

      showSideMenu: true,
    };
  },

  computed: {
    filterTransactionsHistory() {
      let arr = [];
      // let user = JSON.parse(localStorage.getItem("user"));
      this.transactionsHistory.forEach((transaction) => {
        let user = transaction.cashier_name;

        transaction.orders.forEach((sale) => {
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
            name: this.storeSelected.name,
            address: this.storeSelected.address,
            cashier_name: user,
          };
          arr.push(data);
        });
      });
      arr.sort(function (a, b) {
        return a.id - b.id;
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
      // return moment(date).format("LL");
      return moment(date).format("DD MMM YYYY, h:mm:ss a");
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
    async fetchTransactionsHistory() {
      try {
        let headers = { Authorization: `Bearer ${this.user.token}` };
        const response = await axios.get(
          apiHost + "/api/store/order/group-by-cashiers",
          {
            headers,
            params: {
              date_from: this.datePeriod.from,
              date_to: this.datePeriod.to,
              store_id: this.storeSelected.id,
            },
          }
        );
        this.transactionsHistory = response.data.data;
      } catch (error) {
        console.log(error.response);
      }
    },
    showModalReceipt(data) {
      this.receiptSelected = data;
      let modal = document.getElementById("modal-receipt");
      modal.style.display = "block";
    },
  },

  mounted() {
    this.fetchTransactionsHistory();
  },
};
</script>
