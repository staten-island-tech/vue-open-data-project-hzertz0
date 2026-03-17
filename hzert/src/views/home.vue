<template>
    <div>
      <button @click="showJobs">View Job Types</button>
        <p v-for="business in applications">The {{ business.agency}} is looking for {{ business.civil_service_title }}</p>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const applications = ref([])
const jobTypes = []

async function getData() {
  try {
    const response = await fetch('https://data.cityofnewyork.us/resource/kpav-sd4t.json')
    const data = await response.json()
    applications.value = data

    jobTypes.length = 0
    applications.value.forEach(application => {
      if (!jobTypes.includes(application.civil_service_title)) {
        jobTypes.push(application.civil_service_title)
      }
    })

  } catch (error) {
    console.log(error)
  }
}


onMounted(() => {
  getData()
})

function showJobs(){
  console.log(jobTypes)
}
</script>

<style scoped>
* {
  font-family: 'inter';
}
</style>