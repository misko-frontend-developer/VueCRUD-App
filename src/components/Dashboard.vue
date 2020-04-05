<template>
  <div class="container">
    <Alerts :message="message" />
    <div class="mt-5">
      <div></div>
      <div class="d-flex justify-content-between">
        <h1 class="mb-3">Users Display</h1>

        <div>
          <input
            type="text"
            @keyup="searchOption"
            v-model="search"
            placeholder="Search by name"
            style="1px solid red"
            class="inp mr-3"
          />

          <button
            type="button"
            class="btn btn-primary float-right mb-3"
            data-toggle="modal"
            data-target="#exampleModal"
          >Add New User</button>
        </div>
      </div>

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Add New User</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div class="form-row">
                  <div class="col">
                    <label>ID</label>
                    <input type="text" v-model="fetchId" class="form-control" disabled />
                  </div>
                  <div class="col ml-4">
                    <label>Gender</label>
                    <br />
                    <label for="one">Male</label>
                    <input type="radio" name="one" value="Male" v-model="gender" />

                    <br />
                    <label for="two">Female</label>
                    <input type="radio" name="two" value="Female" v-model="gender" />
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <label>Name</label>
                    <input v-model="name" type="text" class="form-control" placeholder="Name" />
                  </div>

                  <div class="col">
                    <label>Country</label>
                    <select class="form-control" v-model="country">
                      <option
                        v-for="country in allCountries"
                        :key="country"
                        :value="country"
                      >{{country}}</option>
                    </select>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <label>Age</label>
                    <input
                      type="number"
                      min="0"
                      v-model="age"
                      class="form-control"
                      placeholder="Age"
                    />
                  </div>
                  <div class="col">
                    <label>Books</label>
                    <input
                      type="number"
                      min="0"
                      v-model="books"
                      class="form-control"
                      placeholder="Books"
                    />
                  </div>
                </div>
              </form>
            </div>
            <button type="submit" class="btn btn-primary" @click="onSubmit()">Save</button>
            <div class="modal-footer"></div>
          </div>
        </div>
      </div>

      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Country</th>
            <th scope="col">Age</th>
            <th scope="col">Gender</th>
            <th scope="col">Books</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in allUsers" :key="user.id">
            <td>{{user.user_id}}</td>
            <td>{{user.name}}</td>
            <td>{{user.country}}</td>
            <td>{{user.age}}</td>
            <td>{{user.gender}}</td>
            <td>{{user.books}}</td>
            <td>
              <router-link v-bind:to="{name:'edit', params:{user_id: user.user_id}}">
                <i class="fa fa-pencil"></i>
              </router-link>

              <div>
                <button class="mr-6" type = "button" @click="deleteUserA(user.user_id)">
                  <i class="fa fa-trash-o fa-lg"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="d-flex justify-content-start ml-3">
        <div>
          <nav aria-label="Page navigation example">
            <ul class="pagination">
              <li class="page-item">
                <a class="page-link" @click="changeIndex" href="#">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li class="page-item" :key="item" v-for="item in getPag">
                <a class="page-link" @click="changeIndex" href="#">{{ item }}</a>
              </li>
              <li class="page-item">
                <a class="page-link" @click="changeIndex" href="#">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div class="form-group">
          <select
            class="form-control ml-4"
            @change="changePag($event)"
            v-model="pagination"
            style="width:auto;"
          >
            <option v-for="pagination in indexes" :key="pagination">{{ pagination }}</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { countries } from "../data/countries";
import Alerts from "./alerting/Alert";

export default {
  name: "dashboard",
  components: {
    Alerts
  },
  data() {
    return {
      message: "",
      search: "",
      user_id: this.fetchId,
      name: null,
      country: null,
      age: null,
      books: null,
      gender: null,
      index: 1,
      indexes: [5, 10, 20],
      pagination: 5,
      allCountries: countries
    };
  },

  methods: {
    ...mapActions([
      "getUsers",
      "addUsers",
      "deleteUser",
      "searchUser",
      "getPaginationData",
      "collectId"
    ]),
/* Option ADD NEW USER */
    onSubmit() {
 
      let userId = this.fetchId.toString();

      if (
        this.name !== null &&
        this.country !== null &&
        this.age !== null &&
        this.books !== null &&
        this.gender !== null
      ) {
        let obj = {
          user_id: userId,
          name: this.name,
          country: this.country,
          gender: this.gender,
          age: this.age,
          books: parseInt(this.books)
        };

        this.addUsers(obj);
        this.getUsers(1, this.pagination);
        this.collectId();
        this.message = "User is added";

        setTimeout(() => {
          this.message = "";
        }, 3000);

        this.name = null;
        this.age = null;
        this.country = null;
        this.books = null;
      } else {
        this.message = "Please fill all the data";
        setTimeout(() => {
          this.message = "";
        }, 3000);
      }
    },
    /*Option SEARCH USER */ 
    searchOption() {
      this.getUsers({
        index: this.index,
        pagination: this.pagination,
        search: this.search
      });
    },

/* Option DELETE USER*/ 
    deleteUserA(user_id) {
      this.deleteUser(user_id);

      this.collectId();
      this.message = "User deleted";
      setTimeout(() => {
        this.message = "";
      }, 3000);
      this.getUsers(1, this.pagination);
    },
    /*Option CHANGE PAGINATION*/ 
    changePag(eve) {
      let pag = parseInt(eve.target.value);

      this.pagination = pag;

      this.getUsers({
        index: 1,
        pagination: this.pagination,
        search: this.search
      });
      this.getPaginationData(this.pagination);
    },
    /* Option CHANGE PAGE INDEX*/ 
    changeIndex(eve) {
      let tt = eve.target.innerText;

      if (tt == "«") {
        this.index--;

        this.getUsers({
          index: this.index,
          pagination: this.pagination,
          search: this.search
        });
      } else if (tt == "»") {
        this.index++;
        this.getUsers({
          index: this.index,
          pagination: this.pagination,
          search: this.search
        });
      } else {
        this.index = parseInt(tt);
        this.getUsers({
          index: this.index,
          pagination: this.pagination,
          search: this.search
        });
      }
    }
  },
  computed: mapGetters(["allUsers", "getPag", "fetchId"]),

  created() {
    this.getUsers({
      index: this.index,
      pagination: this.pagination,
      search: this.search
    });
    this.getPaginationData(this.pagination);
    this.collectId();
  }
};
</script>

<style>
.inp {
  border: none;
  border-bottom: 1px solid #1890ff;
  padding: 5px 10px;
  outline: none;
}
button{
     border:0;
     background:none;
     padding: 0;
    
}
</style>
