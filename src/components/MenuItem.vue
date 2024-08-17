<script setup lang="ts">
defineProps<{
  item: DrinkData
}>()
</script>

<template>
  <a href="#" class="list-group-item list-group-item-action">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">{{ item.name }}</h5>
      <small>${{ item.price }}</small>
    </div>
    <p class="mb-1">{{ item.description }}</p>
  </a>
</template>
