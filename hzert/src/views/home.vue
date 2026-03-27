<template>
  <h1>Job Demand Viewer</h1>
  <div class="container">
    <RouterLink to="/commonjobs"><div class="card">
      <h2>Jobs Demand Tracker</h2>
      <p>View the current demand of common jobs!</p>
    </div></RouterLink>
    <RouterLink to="/jobdemand"><div class="card">
      <h2>name</h2>
      <p>View the most demanded jobs!</p>
    </div></RouterLink>
  </div>
</template>

<script setup>

</script>

<style scoped>
* {
  font-family: 'inter';
}

h1 {
  position: absolute;
  width: 100%;
  text-align: center;
  background-color: white;
  padding: 10px;
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

a {
  text-decoration: none;
  color: inherit;
}

a:visited {
  text-decoration: none;
  color: inherit;
}
</style>
