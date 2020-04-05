<template>
  <div class="container">
    <Alerts :message="message" />
    <div class="row">
      <div class="col">
        <h3 class="d-flex justify-content-center my-3">Edit User : {{user_id}}</h3>
      </div>
    </div>
    <div class="col">
      <div class="d-flex justify-content-center">
        <form @submit.prevent="updtUser(user_id)">
          <div class="form-group bg-light p-3">
            <div class="form-group">
              <label>Name</label>
              <input type="text" v-model="name" class="form-control" placeholder="name" />
            </div>
            <div class="form-group">
              <label>Country</label>
              <select class="form-control" v-model="country">
                <option v-for="country in allCountries" :key="country" :value="country">{{country}}</option>
              </select>
            </div>
            <div class="d-inline-flex align-items-center">
              <div class="col">
                <label>Age</label>
                <input type="number" min="5" v-model="age" class="form-control" placeholder="age" />
              </div>
              <div class="col">
                <label>Books</label>
                <input
                  type="number"
                  min="1"
                  v-model="books"
                  class="form-control"
                  placeholder="books"
                />
              </div>
              <div class="col">
                <br />
                <label for="one">Male</label>
                <input type="radio" id="male" name="one" value="Male" v-model="gender" />
                <br />
                <label for="two">Female</label>
                <input type="radio" id="female" name="two" value="Female" v-model="gender" />
              </div>
            </div>
            <hr />

            <div class="d-flex justify-content-around">
              <button type="submit" class="btn btn-primary btn-lg mb-2">Submit</button>
              <router-link to="/" class="btn btn-danger btn-lg mb-2">Cancel</router-link>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import db from "../firebaseInit";
import { countries } from "../data/countries";
import Alerts from "./alerting/Alert";
export default {
  components: {
    Alerts
  },
  data() {
    return {
      user_id: null,
      message: "",
      name: null,
      country: null,
      age: null,
      gender: null,
      books: null,
      allCountries: countries
    };
  },
  computed: mapGetters(["getsUser"]),
  methods: {
    fetchData() {
      this.fetchUser(this.$route.params.user_id);
      this.getsUser.forEach(element => {
        element;
      });
    },
    updtUser(user_id) {
      if (this.name !== "" && this.age !== "" && this.books !== "") {
        let obj = {
          user_id: this.user_id,
          name: this.name,
          country: this.country,
          age: this.age,
          gender: this.gender,
          books: this.books
        };

        this.updateUser({ user_id, obj });

        this.$router.push("/");
      } else {
        this.message = "You cant leave data fields empty";

        setTimeout(() => {
          this.message = "";
        }, 3000);
      }
    },

    ...mapActions(["fetchUser", "updateUser"])
  },

  beforeRouteEnter(to, from, next) {
    db.collection("Testers")
      .where("user_id", "==", to.params.user_id)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          next(vm => {
            vm.user_id = doc.data().user_id;
            vm.name = doc.data().name;
            vm.age = doc.data().age;
            vm.gender = doc.data().gender;
            vm.country = doc.data().country;
            vm.books = doc.data().books;
          });
        });
      });
  },

  watch: {
    $route: "fetchData"
  },

  created() {
    this.fetchUser(this.$route.params.user_id);

    this.getsUser.forEach(element => {
      this.user_id = element.data().user_id;
      this.name = element.data().name;
      this.country = element.data().country;
      this.age = element.data().age;
      this.gender = element.data().gender;
      this.books = element.data().books;
    });
  }
};
</script>

<style>
</style>