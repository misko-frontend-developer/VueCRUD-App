import Vuex from 'vuex'
import Vue from 'vue'
import readers from './modules/readers'
import statistics from './modules/statistic'


Vue.use(Vuex);

export default new Vuex.Store({
    
    modules : {

        readers,
        statistics
    }


})

