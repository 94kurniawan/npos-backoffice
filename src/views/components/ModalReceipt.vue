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
    id="modal-receipt"
  >
    <!--modal content-->
    <div
      class="
        relative
        mx-auto
        mb-20
        top-14
        border
        mobile:w-5/6
        md:w-2/6
        shadow-lg
        rounded-lg
        bg-white
        overflow-y-auto
      "
    >
      <div class="bg-white px-3 py-3 h-auto shadow-xl">
        <p class="text-center font-bold">{{ receipt.store.name }}</p>
        <p class="text-center">{{ receipt.store.address }}</p>
        <p
          class="text-center pb-0.5 border-b-2 border-dashed border-gray-500"
        ></p>
        <p
          class="text-center pb-0.5 border-b-2 border-dashed border-gray-500"
        ></p>

        <!-- <div class="grid grid-cols-2">
          <p>Tanggal</p>
          <p class="text-right">
            {{ formatDateInIDN(receipt.order_date) }}
          </p>
        </div> -->
        <div class="flex justify-center">
          <p class="text-right">
            {{ formatDateInIDN(receipt.order_date) }} -
            {{ receipt.payment.time }}
          </p>
        </div>

        <p
          class="text-center pb-0.5 border-b-2 border-dashed border-gray-500"
        ></p>

        <div class="flex gap-2">
          <p>Nomor</p>
          <p class="text-right flex-grow">{{ receipt.payment.number }}</p>
        </div>
        <div class="flex gap-2">
          <p>Kasir</p>
          <p class="text-right flex-grow">{{ receipt.store.cashier_name }}</p>
        </div>
        <div v-if="receipt.customer_name != null" class="flex gap-2">
          <p>Customer</p>
          <p class="text-right flex-grow">{{ receipt.customer_name }}</p>
        </div>
        <div v-if="receipt.table_number != null" class="flex gap-2">
          <p>Table</p>
          <p class="text-right flex-grow">{{ receipt.table_number }}</p>
        </div>
        <p
          class="text-center pb-0.5 border-b-2 border-dashed border-gray-500"
        ></p>
        <p
          class="text-center pb-0.5 border-b-2 border-dashed border-gray-500"
        ></p>
        <div v-for="item in receipt.items" :key="item.key">
          <div class="grid grid-flow-col grid-cols-6">
            <div class="col-span-3 font-bold">
              <p class="truncate ...">{{ item.name }}</p>
            </div>
            <p class="text-right">x{{ item.quantity }}</p>
            <p class="col-span-2 text-right">{{ currency(item.total) }}</p>
          </div>
          <p>{{ item.variant }}</p>
          <div class="grid grid-flow-col grid-cols-6">
            <p class="col-span-4">{{ item.option }}</p>
            <p v-if="item.option_price != 0" class="col-span-2 text-right">
              {{ item.option_price }}
            </p>
          </div>
          <div
            v-if="item.total_discount != 0"
            class="grid grid-flow-col grid-cols-6"
          >
            <p class="col-span-4">{{ item.discount_name }}</p>
            <p class="col-span-2 text-right">
              ({{ currency(item.total_discount) }})
            </p>
          </div>
          <div class="grid grid-flow-col grid-cols-6">
            <p class="col-span-4">{{ item.sales_type }}</p>
          </div>
          <div
            v-for="cost in item.additional_costs"
            :key="cost.key"
            class="grid grid-flow-col grid-cols-6"
          >
            <p class="col-span-4">+ {{ cost.name }}</p>
            <p class="col-span-2 text-right">{{ currency(cost.total) }}</p>
          </div>
          <p class="col-span-4">{{ item.note }}</p>
        </div>
        <p
          class="text-center pb-0.5 border-b-2 border-dashed border-gray-500"
        ></p>
        <p
          class="text-center pb-0.5 border-b-2 border-dashed border-gray-500"
        ></p>
        <div class="grid grid-flow-col grid-cols-6 font-bold">
          <p class="col-span-4">SUB TOTAL</p>
          <p class="col-span-2 text-right">
            {{ currency(receipt.total_price) }}
          </p>
        </div>
        <div
          v-if="receipt.total_option != 0"
          class="grid grid-flow-col grid-cols-6 font-bold"
        >
          <p class="col-span-4">SUB TOTAL TAMBAHAN</p>
          <p class="col-span-2 text-right">
            {{ currency(receipt.total_option) }}
          </p>
        </div>
        <div class="grid grid-flow-col grid-cols-6 font-bold">
          <p class="col-span-4">SUB TOTAL Disc</p>
          <p class="col-span-2 text-right">
            ({{ currency(receipt.total_discount) }})
          </p>
        </div>
        <div
          v-for="cost in receipt.additional_cost"
          :key="cost.key"
          class="grid grid-flow-col grid-cols-6 font-bold"
        >
          <p class="col-span-4">+ {{ cost.name }}</p>
          <p class="col-span-2 text-right">{{ currency(cost.total) }}</p>
        </div>
        <p
          class="text-center pb-0.5 border-b-2 border-dashed border-gray-500"
        ></p>
        <p
          class="text-center pb-0.5 border-b-2 border-dashed border-gray-500"
        ></p>
        <div class="grid grid-flow-col grid-cols-6 font-bold">
          <p class="col-span-4">TOTAL</p>
          <p class="col-span-2 text-right">{{ currency(receipt.total) }}</p>
        </div>
        <div class="grid grid-flow-col grid-cols-6 font-bold">
          <p class="col-span-4 uppercase">{{ receipt.payment.type }}</p>
          <p class="col-span-2 text-right">
            {{ currency(receipt.payment.received) }}
          </p>
        </div>
        <div class="grid grid-flow-col grid-cols-6 font-bold">
          <p class="col-span-4">CHANGE</p>
          <p class="col-span-2 text-right">
            {{ currency(receipt.change) }}
          </p>
        </div>
        <p
          class="text-center pb-0.5 border-b-2 border-dashed border-gray-500"
        ></p>
        <p
          class="text-center pb-0.5 border-b-2 border-dashed border-gray-500"
        ></p>
        <p class="text-center pt-2 text-sm text-gray-400">
          N-POS Powered By NULL REBORN
        </p>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 absolute top-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
        />
      </svg>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import "moment/locale/id";
import * as numberFormat from "@/custom_package/number.js";

export default {
  name: "ModalReceipt",
  props: {
    receipt: Object,
  },

  methods: {
    currency(number) {
      return numberFormat.currency(number);
    },
    formatDateInIDN(date) {
      // return moment(date).format("LL");
      return moment(date).format("DD MMM YYYY, LTS");
    },
    closeModal() {
      let modal = document.getElementById("modal-receipt");
      modal.style.display = "none";
    },
    closeModalWindow() {
      let modal = document.getElementById("modal-receipt");
      if (window.event.target == modal) {
        modal.style.display = "none";
      }
    },
  },

  mounted() {},
};
</script>