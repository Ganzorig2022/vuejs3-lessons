import { defineStore } from 'pinia'

// You can think of state as the data of the store, getters as the computed properties of the store, and actions as the methods.

export const useCoachesStore = defineStore('coachesStore', {
    //DATA PROPERTIES
    state: () => ({
        coaches: [],
    }),

    //COMPUTED PROPERTIES
    getters: {
        totalCoaches: (state) => state.coaches,
        hasCoaches: (state) => state.coaches && state.length > 0
    },

    //METHODS PROPERTIES
    actions: {
        async registerCoach(coachData) {
            const userId = coachData.id

            const res = await fetch(`https://vue-http-demo-f00ab-default-rtdb.firebaseio.com/coaches/${userId}.json`, {
                method: 'PUT',
                body: JSON.stringify(coachData)
            })

            if (!res.ok) {
                const error = new Error(resData.message || 'Failed to fetch!')
                throw error
            }

        },

        async loadCoaches() {
            const res = await fetch('https://vue-http-demo-f00ab-default-rtdb.firebaseio.com/coaches.json')

            const resData = await res.json()


            if (!res.ok) {
                const error = new Error(resData.message || 'Failed to fetch!')
                throw error
            }

            const coaches = []

            for (const key in resData) {
                const coach = {
                    id: key,
                    firstName: resData[key].firstName,
                    lastName: resData[key].lastName,
                    description: resData[key].description,
                    hourlyRate: resData[key].hourlyRate,
                    areas: resData[key].areas
                }

                coaches.push(coach)
            }

            this.coaches = coaches


        }
    },
})