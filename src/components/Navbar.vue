<template>
  
  <nav class="navbar navbar-expand-lg navbar-light bg-light ">
 
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="nav navbar-nav ">
      <li class="nav-item ">
        <router-link to="/" class="nav-link" >Dashboard</router-link>
      </li>
      <li class="nav-item">
        <router-link   href="#" class="nav-link" to="/stats" >Stats</router-link >
      </li>

    </ul>
    
  </div>
</nav>
</template>
 

<script>
export default {
  data() {
    return {
      tabs: [
        { id: 1, name: "Dashboard", route: `/` },
        { id: 2, name: "Profile", route: `/profile` }
      ]
    };
  }
};
</script>

<style scoped>
#right {
  float: right;
}
</style>