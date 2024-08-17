<script setup lang="ts">
defineProps<{
  order: OrderData
  subTotal: (item: CartItem) => number
}>()
</script>

<template>
  <div class="card mb-5">
    <div class="card-body">
      <div class="card-title">
        <h5>訂單</h5>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">品項</th>
              <th scope="col">數量</th>
              <th scope="col">小計</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in order.items" :key="item.id">
              <td>{{ item.name }}</td>
              <td>{{ item.amount }}</td>
              <td>{{ subTotal(item) }}</td>
            </tr>
          </tbody>
        </table>
        <div class="text-end">
          備註: <span>{{ order.memo }}</span>
        </div>
        <div class="text-end">
          <h5>
            總計: <span>${{ order.total }}</span>
          </h5>
        </div>
      </div>
    </div>
  </div>
</template>
