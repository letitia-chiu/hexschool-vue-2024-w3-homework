/// <reference types="vite/client" />

type DrinkData = {
  id: number,
  name: string,
  description: string,
  price: number
}

type CartItem = {
  id: number,
  name: string,
  description: string,
  price: number,
  amount: number,
}

type OrderData = {
  items: CartItem[],
  total: number,
  memo: string
}