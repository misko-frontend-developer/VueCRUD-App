import db from '../../firebaseInit'
import {
  Math
} from 'core-js';



const state = {
  users: [],
  user: [],
  pagination: null,
  latestId: null

};

const getters = {
  allUsers: state => state.users,
  getsUser: state => state.user,
  getPag: state => state.pagination,
  fetchId: state => state.latestId

};

const actions = {

  /*Add USER ACTION */

  async addUsers({commit}, obj) {

    await db.collection('Testers').add({

      user_id: obj.user_id,
      name: obj.name,
      country: obj.country,
      age: obj.age,
      gender: obj.gender,
      books: obj.books
    })
    commit('newUser', obj)
  },

  /*Get details for PAGINATION */
  async getPaginationData({commit}, pag) {
    let pagination;
    await db.collection('Testers').get()
       .then((snapshot) => {
        pagination = Math.floor(snapshot.docs.length / pag) + 1;
      })
    commit('getPag', pagination)
  },

  /*GET ALL USERS - main */
  async getUsers({commit}, obj) {

    let endData = [];
    let snapshot = await db.collection('Testers')
      .orderBy('user_id')
      .get();
    const users = [];
    snapshot.forEach(doc => {
      let appData = doc.data();
      users.push(appData)

    })

    if (obj.search !== "") {

    endData = users.filter(user => user.name.toUpperCase().indexOf(obj.search.toUpperCase()) > -1);

    } else {

      let use, startAt;
      if (obj.index == 1 || obj.index == 0) {

        endData = users.slice(0, obj.pagination);

      } else {

        use = obj.index
        startAt = ((use - 1) * obj.pagination);
        let endAt = startAt + obj.pagination;
        endData = users.slice(startAt, endAt);

      }
    }
    commit('setUsers', this.users = endData);

  },
  /*Delete USER using ID */

  async deleteUser({commit}, user_id) {
    let gen;
    await db.collection('Testers').where('user_id', '==', user_id).get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          doc.ref.delete()
        })
      }).then(() => {
        gen = this.users.filter(user => user.user_id == user_id)
        this.users.splice(this.users.indexOf(gen[0].user_id), 1)

      })
    commit('setUsers', this.users)
  },

  /*FETCH USER PER ID  */
  fetchUser({commit}, user_id) {
    const user = []
    db.collection('Testers').where('user_id', '==', user_id).get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          let appData = doc;
          user.push(appData)
          commit('getUser', this.user = user)
        })
      })


  },
  /*Collect latest ID for Auto Increament option in ADD USER */
  async collectId({commit}) {

    let arrayID = [];
    await db.collection("Testers").orderBy('user_id').limit(10000).get()
      .then(querySnapshot => {

        querySnapshot.forEach(doc => {
          arrayID.push(doc.data())

        })
      })


    let orderIt = arrayID.sort((a, b) => (a.user_id - b.user_id));
    let lastId = parseInt(orderIt[orderIt.length - 1].user_id) + 1;
    commit("getLastId", lastId)



  },
  /*UPDATE USER */
  updateUser(obj) {

    db.collection("Testers")
      .where("user_id", "==", obj.user_id)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          doc.ref
            .update({
              user_id: obj.user_id,
              name: obj.obj.name,
              country: obj.obj.country,
              age: obj.obj.age,
              gender: obj.obj.gender,
              books: obj.obj.books
            })
        });
      });

  }
};

const mutations = {

  setUsers: (state, users) => (state.users = users),
  newUser: (state, user) => state.users.push(user),
  getUser: (state, user) => (state.user = user),
  getPag: (state, pagination) => (state.pagination = pagination),
  getLastId: (state, latestId) => (state.latestId = latestId)



}

export default {
  state,
  getters,
  actions,
  mutations
};