<template>
    <div class="container">
      <h1 class="my-5">Display user stats  </h1>
       
      <div class="row justify-content-between">

        <div class="col ">

        <ReadearsAge />
    
        </div>
        <div class="col w-25">
              <RendersGender />
        </div>
      </div>
    </div>

    
 
</template>

<script>
import RendersGender from "./stats-screen/ReadersPerGender";
import ReadearsAge from "./stats-screen/ReadersPerAge";
export default {
  components: {
    RendersGender,
    ReadearsAge
  },
  data() {
    return {};
  }
};
</script>

<style>
</style>