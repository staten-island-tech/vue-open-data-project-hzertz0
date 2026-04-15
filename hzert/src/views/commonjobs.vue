<template>
  <h1>Job Demand Tracker</h1>
  <div>
    <canvas ref="chartRef"></canvas>
    <RouterLink to="/"><button>Return to Home</button></RouterLink>
    <button @click="mostPopular">mostPopular</button>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import Chart from 'chart.js/auto'

const chartRef = ref(null)
let chartInstance = null

const labels = [
  'Civil Engineer',
  'Computer Specialist (Software)',
  'Accountant',
  'Machinist',
  'Architect',
  'Economist',
  'Painter',
]

const data = {
  labels,
  datasets: [
    {
      label: 'Job Listings',
      data: [],
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
    const fetchedData = await response.json()
    applications.value = fetchedData
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  getData()
  chartInstance = new Chart(chartRef.value, {
    type: 'bar',
    data,
    options: {
      scales: {
        y: { beginAtZero: true },
      },
    },
  })
})

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
}

function getCountsForLabels() {
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

    const labelCounts = labels.map((label) => {
    const found = jobCounts.find((job) => job.title === label.toUpperCase())
    return { title: label, count: found ? found.count : 0 }
  })

  data.datasets[0].data = labelCounts.map((job) => job.count)

  console.log(labelCounts)

  chartInstance.data.datasets[0].data = data.datasets[0].data
  chartInstance.update()

  return labelCounts
}

watch(applications, (newVal) => {
  if (newVal.length > 0) {
    getCountsForLabels()
  }
})
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

h1 {
  width: 100%;
  text-align: center;
  background-color: white;
  padding: 10px;
}
</style>