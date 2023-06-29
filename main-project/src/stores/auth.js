import { defineStore } from 'pinia'

// You can think of state as the data of the store, getters as the computed properties of the store, and actions as the methods.

export const useAuthStore = defineStore('authStore', {
    //DATA PROPERTIES
    state: () => ({
        userId: 'c3',
    }),

    //COMPUTED PROPERTIES
    getters: {
        // totalCoaches: (state) => state.coaches,
        // hasCoaches: (state) => state.coaches && state.length > 0
    },

    //METHODS PROPERTIES
    actions: {
    },
})