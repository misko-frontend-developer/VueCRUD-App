<template>
  <div class="alert alert-info alert-dismissible fade w-25" v-bind:class="{'show': isActive, 'd-none': !isActive}"  role="alert">
    <strong>{{alerting()}}</strong>
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: false
    };
  },
  props: ["message"],

  methods: {

    alerting() {

    if(this.message !== ''){

       this.isActive = true  
       return this.message

      }else{

        this.isActive = false  
        return this.message
      }
 
    }
  }
};
</script>


<style>

.alert{
  z-index: 99999;
  position: relative;
  margin-top: -2%;
  margin-left: 37%;



}
</style>