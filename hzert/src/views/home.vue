<template>
  <h1>Job Demand Viewer</h1>
  <!--<p v-for="business in applications">The {{ business.agency}} is looking for {{ business.civil_service_title }}</p>-->
  <div class="container">
    <div class="card">
      <h2>name</h2>
      <p>View the current demand of common jobs!</p>
    </div>
    <div class="card">
      <h2>name</h2>
      <p>View the most demanded jobs!</p>
    </div>
  </div>
  <button @click="showJobs">View Job Types</button>
  <button @click="mostPopular">View Job Demands</button>
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
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  getData()
})

function showJobs() {
  applications.value.forEach((application) => {
    if (!jobTypes.includes(application.civil_service_title)) {
      jobTypes.push(application.civil_service_title)
    }
  })
  console.log(jobTypes)
}

function mostPopular() {
  const jobCounts = []
  applications.value.forEach((application) => {
    const title = application.civil_service_title
    const existing = jobCounts.find((job) => job.title === title)

    if (existing) {
      existing.count++
    } else {
      jobCounts.push({ title: title, count: 1 })
    }
  })
  let averageDemand = 0
  jobCounts.forEach((job) => {
    averageDemand = averageDemand + job.count / jobCounts.length
  })
  console.log(jobCounts)
  console.log(Math.round(averageDemand))
}
</script>

<style scoped>
* {
  font-family: 'inter';
}

h1 {
  text-align: center;
  background-color: white;
  padding: 10px;
}

button {
  background-color: rgb(255, 255, 255);
  border: none;
  color: rgb(0, 0, 0);
  padding: 10px 20px;
  text-align: center;
  font-size: 20px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 8px;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.card {
  background: white;
  width: 300px;
  height: 500px;
  border-radius: 10px;
  padding: 10px;
  cursor: pointer;
  font-size: 15px;
  margin: 25px;
}

.card:hover {
  transform: scale(1.05);
  transition: transform 0.3s ease;
}
</style>
