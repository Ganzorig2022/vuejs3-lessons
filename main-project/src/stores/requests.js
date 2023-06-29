import { defineStore } from 'pinia'
import { useAuthStore } from './auth'
// You can think of state as the data of the store, getters as the computed properties of the store, and actions as the methods.

export const useRequestsStore = defineStore('requestsStore', {
    //DATA PROPERTIES
    state: () => ({
        requests: [],
    }),

    //COMPUTED PROPERTIES
    getters: {
        totalRequests: (state) => state.requests,
        hasRequests: (state) => state.requests && state.requests.length > 0
    },

    //METHODS PROPERTIES
    actions: {
        addRequest(request) {
            this.requests.push(request)
        },

        async contactCoach(data) {
            const newRequest = {
                userEmail: data.email,
                message: data.message
            }

            const res = await fetch(`https://vue-http-demo-f00ab-default-rtdb.firebaseio.com/requests/${data.coachId}.json`, {
                method: 'POST',
                body: JSON.stringify(newRequest)
            })

            const resData = await res.json()


            if (!res.ok) {
                const error = new Error(resData.message || 'Failed to send request!')
                throw error
            }

            newRequest.id = resData.name
            newRequest.coachId = data.coachId

            this.addRequest(newRequest)
        },

        async fetchRequests() {
            const auth = useAuthStore()
            const coachId = auth.userId

            const res = await fetch(`https://vue-http-demo-f00ab-default-rtdb.firebaseio.com/requests/${coachId}.json`)

            const resData = await res.json()


            if (!res.ok) {
                const error = new Error(resData.message || 'Failed to fetch!')
                throw error
            }

            const requestsArr = []

            for (const key in resData) {
                const request = {
                    id: key,
                    coachId,
                    userEmail: resData[key].userEmail,
                    message: resData[key].message,
                }

                requestsArr.push(request)
            }


            this.requests = requestsArr
        }
    },
})