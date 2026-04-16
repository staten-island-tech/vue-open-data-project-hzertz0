<template>
  <h1>Job Agency Tracker</h1>
  <div>
    <canvas ref="chartRef"></canvas>
    <RouterLink to="/"><button>Return to Home</button></RouterLink>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import Chart from 'chart.js/auto'

const chartRef = ref(null)
let chartInstance = null

const labels = [
  'DEPT OF ENVIRONMENT PROTECTION',
  'POLICE DEPARTMENT',
  'DEPT OF CITYWIDE ADMIN SVCS',
  'FIRE DEPARTMENT',
  'DEPT OF TRANSPORTATION',
]

const data = {
  labels,
  datasets: [
    {
      label: 'Job Listings by Agency',
      data: [], 
      backgroundColor: [
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 205, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(153, 102, 255, 0.8)',
      ],
    },
  ],
}

const applications = ref([])

async function getData() {
  try {
    const response = await fetch('https://data.cityofnewyork.us/resource/kpav-sd4t.json')
    const fetchedData = await response.json()
    applications.value = fetchedData
  } catch (error) {
    console.log(error)
  }
}
function getAgencyCounts() {
  const agencyCounts = []

  applications.value.forEach((application) => {
    const agency = application.agency
    const existing = agencyCounts.find((item) => item.title === agency)

    if (existing) {
      existing.count++
    } else {
      agencyCounts.push({ title: agency, count: 1 })
    }
  })

  const labelCounts = labels.map((label) => {
    const found = agencyCounts.find((item) => item.title === label)
    return { title: label, count: found ? found.count : 0 }
  })

  chartInstance.data.datasets[0].data = labelCounts.map((item) => item.count)
  chartInstance.update()
}

onMounted(() => {
  getData()
  chartInstance = new Chart(chartRef.value, {
    type: 'pie', 
    data,
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        title: { display: true, text: 'NYC Job Listings by Agency' },
      },
    },
  })
})

watch(applications, (newVal) => {
  if (newVal.length > 0) {
    getAgencyCounts()
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