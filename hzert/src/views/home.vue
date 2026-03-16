<template>
    <div>
        <p v-for="business in applications">The {{ business.agency}} is looking for {{ business.civil_service_title }}</p>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const applications = ref([])
async function getData() {
  try {
    const response = await fetch('https://data.cityofnewyork.us/resource/kpav-sd4t.json')
    const data = await response.json()
    applications.value = data
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  getData()
})
</script>

<style scoped>
* {
  font-family: 'inter';
}
</style>