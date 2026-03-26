<template>
    <div>
        <canvas ref="chartRef"></canvas>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Chart from 'chart.js/auto'

const chartRef = ref(null)

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']
const data = {
  labels,
  datasets: [{
    label: 'My First Dataset',
    data: [65, 59, 80, 81, 56, 55, 40],
    backgroundColor: [
      'rgba(100, 99, 132, 0.8)',
      'rgba(1, 159, 64, 0.8)',
      'rgba(55, 205, 86, 0.8)',
      'rgba(54, 192, 192, 0.8)',
      'rgba(123, 162, 235, 0.8)',
      'rgba(123, 102, 255, 0.8)',
      'rgba(201, 203, 207, 0.8)'
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
    ],
    borderWidth: 1
  }]
}

onMounted(() => {
  new Chart(chartRef.value, {
    type: 'bar',
    data,
    options: {
      scales: {
        y: { beginAtZero: true }
      }
    }
  })
})
</script>

<style lang="scss" scoped>

</style>