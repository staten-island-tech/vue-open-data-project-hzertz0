<template>
  <div>
    <canvas ref="chartRef"></canvas>
    <button @click="showJobs">showJobs</button>
    <button @click="mostPopular">mostPopular</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Chart from 'chart.js/auto'

const chartRef = ref(null)
const labels = [
  'Architect',
  'Electrical Engineer',
  'Cook',
  'Painter',
  'Physician',
  'Computer Specialist',
  'Civil Engineer',
]
const data = {
  labels,
  datasets: [
    {
      label: 'My First Dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: [
        'rgba(100, 99, 132, 0.8)',
        'rgba(1, 159, 64, 0.8)',
        'rgba(55, 205, 86, 0.8)',
        'rgba(54, 192, 192, 0.8)',
        'rgba(123, 162, 235, 0.8)',
        'rgba(123, 102, 255, 0.8)',
        'rgba(201, 203, 207, 0.8)',
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)',
      ],
      borderWidth: 1,
    },
  ],
}

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
  new Chart(chartRef.value, {
    type: 'bar',
    data,
    options: {
      scales: {
        y: { beginAtZero: true },
      },
    },
  })
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
</style>
