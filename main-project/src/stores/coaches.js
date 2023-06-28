import { defineStore } from 'pinia'

// You can think of state as the data of the store, getters as the computed properties of the store, and actions as the methods.

export const useCoachesStore = defineStore('coachesStore', {
    //DATA PROPERTIES
    state: () => ({
        coaches: [
            {
                id: 'c1',
                firstName: 'Maximilian',
                lastName: 'Schwarzmüller',
                areas: ['frontend', 'backend', 'career'],
                description:
                    "I'm Maximilian and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
                hourlyRate: 30
            },
            {
                id: 'c2',
                firstName: 'Julie',
                lastName: 'Jones',
                areas: ['frontend', 'career'],
                description:
                    'I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.',
                hourlyRate: 30
            }
        ],
    }),

    //COMPUTED PROPERTIES
    getters: {
        totalCoaches: (state) => state.coaches,
        hasCoaches: (state) => state.coaches && state.length > 0
    },

    //METHODS PROPERTIES
    actions: {
        increment() {
            this.count++
        },
    },
})