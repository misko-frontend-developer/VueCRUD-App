<template>
  <div>
    <h5>Count Of Books By Age</h5>
    <apexchart width="600" type="bar" v-model="count" :options="options" :series="series"></apexchart>
    <label class="ml-4">Country:</label>
    <select
      class="form-control ml-4"
      v-model="country"
      @change="collectData($event)"
      style="width:auto;"
    >
      <option v-for="country in allCountries" :key="country" :value="country">{{country}}</option>
    </select>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { countries } from "../../data/countries";
import VueApexCharts from "vue-apexcharts";

export default {
  components: {
    apexchart: VueApexCharts
  },

  data() {
    return {
      country: "",
      allCountries: countries,
      options: {
        chart: {
          id: "vuechart-example"
        },
        xaxis: {
          categories: ["21-31", "31-41", "41-51", "51-61", "60 >"]
        }
      },

      series: [
        {
          name: "series-1",
          data: []
        }
      ]
    };
  },

  methods: {
    ...mapActions(["booksCountry"]),
    collectData() {
      this.booksCountry(this.country);
    }
  },
  computed: {
    ...mapGetters(["booksPerAge"]),

    count() {
      return this.booksPerAge;
    }
  },
  watch: {
    count(newCount) {
      this.series = [
        {
          data: newCount
        }
      ];
    }
  }
};
</script>

<style>
</style>