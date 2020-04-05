

import db from '../../firebaseInit'

const state = {
    country: null,
    gender: null,

    /*Global count for readears per AGE - Processing details from Firebase */
    globalCount(dataQuery,startAt, endAt){
    
    return Math.round(((dataQuery
                .filter(user => user.age > startAt && user.age < endAt))
                .map(user => user.books))
                .reduce((a,b)=> a + b, 0) / dataQuery.length);
    },


    /*COUNT per gender - Male  - Processing details from Firebase */
    maleCount (dataQuery, startAt,endAt){

    return  Math.round((dataQuery
                .filter(user => user.age > startAt && user.age < endAt && user.gender =="Male")
                .map(user => user.books))
                .reduce((a,b)=> a + b, 0) / dataQuery.length);
    },


    /*COUNT per gender - Female  - Processing details from Firebase */
    femaleCount (dataQuery, startAt,endAt){

    return Math.round((dataQuery
                .filter(user => user.age > startAt && user.age < endAt && user.gender =="Female")
                .map(user => user.books))
                .reduce((a,b)=> a + b, 0) /dataQuery.length);
    }

};
const getters = {

    booksPerAge: state => state.country,
    booksPerGender: state => state.gender
};

const actions = {

/*Query Firebase (Overall count) and process data per Age */

  async booksCountry({commit}, count){

    if(count !== ""){ 
            
    let dataForProcessing =[]   
    let statDetails;

    await db.collection('Testers').where('country', '==', count).get()

        .then(querySnapshot => {
            querySnapshot.forEach(doc =>{
            
            dataForProcessing.push(doc.data())
            })
            
        })
        .then(() =>{ 
        
            let zeroToTwenty =  state.globalCount(dataForProcessing, 21, 31);
            let twentToThirty = state.globalCount(dataForProcessing, 31, 41);
            let thirtyToForty = state.globalCount(dataForProcessing, 41, 51);
            let fortyToFifty = state.globalCount(dataForProcessing, 51, 61);
            let olderPeople  = state.globalCount(dataForProcessing, 61, 100);
            statDetails = [zeroToTwenty,twentToThirty, thirtyToForty ,fortyToFifty, olderPeople];
            
        })

    commit('booksCountry', statDetails)       
    
    }

    },
/*Query Firebase (Gender count) and process data per Age */

    async genderBooks({commit}, count){

        let dataForProcessing =[] ;
        let statDetails = {};
        
        await db.collection('Testers').where('country', '==', count).get()

                .then(querySnapshot => {
                    querySnapshot.forEach(doc =>{
                    
                    dataForProcessing.push(doc.data())
                    })
                 
                })
                .then(() =>{ 

                    let zeroToTwentyM =  state.maleCount(dataForProcessing, 21, 31);
                    let zeroToTwentyF =  state.femaleCount(dataForProcessing, 21, 31);

                    let twentToThirtyM = state.maleCount(dataForProcessing, 31, 41);
                    let twentToThirtyF = state.femaleCount(dataForProcessing, 31, 41);

                    let thirtyToFortyM = state.maleCount(dataForProcessing, 41, 51);
                    let thirtyToFortyF = state.femaleCount(dataForProcessing, 41, 51);

                    let fortyToFiftyM = state.maleCount(dataForProcessing, 51, 61);
                    let fortyToFiftyF = state.femaleCount(dataForProcessing, 51, 61);

                    let olderPeopleM  = state.maleCount(dataForProcessing, 61, 100);
                    let olderPeopleF  = state.femaleCount(dataForProcessing, 61, 100);

                    statDetails = [[zeroToTwentyM,twentToThirtyM , thirtyToFortyM ,fortyToFiftyM, olderPeopleM],
                                   [zeroToTwentyF,twentToThirtyF , thirtyToFortyF ,fortyToFiftyF, olderPeopleF]]
                       
                })
                commit('booksGender', statDetails)       
    }
};

const mutations = {

    booksCountry: (state, statDetails) => (state.country = statDetails),
    booksGender: (state, statDetails ) =>(state.gender = statDetails)

};


export default {
    state,
    getters,
    actions,
    mutations
  };