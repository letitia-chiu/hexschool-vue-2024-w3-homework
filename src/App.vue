<script setup lang="ts">
import { computed, ref } from 'vue'
import MenuItem from './components/MenuItem.vue'
import CartTable from './components/CartTable.vue'
import OrderCard from './components/OrderCard.vue'

const data = ref<DrinkData[]>([
  {
    id: 1,
    name: '珍珠奶茶',
    description: '香濃奶茶搭配QQ珍珠',
    price: 50
  },
  {
    id: 2,
    name: '冬瓜檸檬',
    description: '清新冬瓜配上新鮮檸檬',
    price: 45
  },
  {
    id: 3,
    name: '翡翠檸檬',
    description: '綠茶與檸檬的完美結合',
    price: 55
  },
  {
    id: 4,
    name: '四季春茶',
    description: '香醇四季春茶，回甘無比',
    price: 45
  },
  {
    id: 5,
    name: '阿薩姆奶茶',
    description: '阿薩姆紅茶搭配香醇鮮奶',
    price: 50
  },
  {
    id: 6,
    name: '檸檬冰茶',
    description: '檸檬與冰茶的清新組合',
    price: 45
  },
  {
    id: 7,
    name: '芒果綠茶',
    description: '芒果與綠茶的獨特風味',
    price: 55
  },
  {
    id: 8,
    name: '抹茶拿鐵',
    description: '抹茶與鮮奶的絕配',
    price: 60
  }
])
const cart = ref<CartItem[]>([])
const memoInput = ref<string>('')
const order = ref<OrderData>()

const addToCart = (item: DrinkData) => {
  const isExisted = cart.value.some((i) => i.id === item.id)
  if (isExisted) return window.alert(`${item.name} 已在購物車中`)
  cart.value.push({
    ...item,
    amount: 1
  })
}
const removeFromCart = (id: number) => {
  const index = cart.value.findIndex((i) => i.id === id)
  cart.value.splice(index, 1)
}

const subTotal = (item: CartItem) => item.price * item.amount
const totalPrice = computed(() => cart.value.reduce((acc, cur) => acc + cur.amount * cur.price, 0))

const createOrder = () => {
  if (cart.value.length === 0) return window.alert('尚未選擇商品！')
  const newOrder: OrderData = {
    items: [...cart.value],
    total: totalPrice.value,
    memo: memoInput.value
  }
  order.value = newOrder
  cart.value = []
  memoInput.value = ''
}
</script>

<template>
  <div id="root">
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-4">
          <div class="list-group">
            <MenuItem v-for="item in data" :key="item.id" :item="item" @click="addToCart(item)" />
          </div>
        </div>
        <div v-if="cart.length > 0" class="col-md-8">
          <CartTable :cart="cart" :subTotal="subTotal" @remove="removeFromCart" />
          <div class="text-end mb-3">
            <h5>
              總計: <span>${{ totalPrice }}</span>
            </h5>
          </div>
          <textarea
            class="form-control mb-3"
            rows="3"
            placeholder="備註"
            v-model="memoInput"
          ></textarea>
          <div class="text-end">
            <button type="button" class="btn btn-primary" @click="createOrder">送出</button>
          </div>
        </div>
        <div v-else class="col-md-8">
          <div class="alert alert-info text-center" role="alert">
            購物車內還沒有任何商品，快從左側點擊商品加入吧！
          </div>
        </div>
      </div>
      <hr />
      <div class="row justify-content-center">
        <div class="col-8">
          <OrderCard v-if="order" :order="order" :subTotal="subTotal" />
          <div v-else class="alert alert-secondary text-center" role="alert">尚未建立訂單</div>
        </div>
      </div>
    </div>
  </div>
</template>
