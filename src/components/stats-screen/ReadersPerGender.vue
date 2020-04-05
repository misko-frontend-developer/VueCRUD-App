<template>
  <div >
    <h5>Count Of Books By Gender</h5>
    <apexchart height="380" type="line" v-model="count" :options="options" :series="series"></apexchart>
    <label class="ml-5">Country:</label>
    <select
      class="form-control ml-5"
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
      series: [
        {
          name: "Male",
          type: "column",
          data: []
        },
        {
          name: "Female",
          type: "column",
          data: []
        }
      ],
      colors: ["#99C2A2", "#C5EDAC", "#66C7F4"],
      options: {
        dataLabels: {
          enabled: false
        },

        stroke: {
          width: [4, 4, 4]
        },
        plotOptions: {
          bar: {
            columnWidth: "20%"
          }
        },
        xaxis: {
          categories: ["21-31", "31-41", "41-51", "51-61", "60 >"]
        },
        yaxis: [
          {
            seriesName: "Column A",
            axisTicks: {
              show: true
            },
            axisBorder: {
              show: true
            }
          },
          {
            seriesName: "Column A",
            show: false
          }
        ],
        tooltip: {
          shared: false,
          intersect: true,
          x: {
            show: false
          }
        },
        legend: {
          horizontalAlign: "left",
          offsetX: 40
        }
      }
    };
  },

  methods: {
    ...mapActions(["genderBooks"]),
    collectData() {
      this.genderBooks(this.country);
    }
  },
  computed: {
    ...mapGetters(["booksPerGender"]),

    count() {
      return this.booksPerGender;
    }
  },
  watch: {
    count(newCount) {
      this.series = [
        {
          data: newCount[0]
        },
        {
          data: newCount[1]
        }
      ];
    }
  }
};
</script>

<style>
</style>