<template>
  <div>
    <section>FILTER</section>
    <section>
      <div class="controls">
        <button>Refresh</button>
        <router-link to="/register">Register as Coach</router-link>
      </div>
      <ul v-if="hasCoaches">
        <coach-item
          v-for="coach in coachesStore.coaches"
          :key="coach.id"
          :id="coach.id"
          :firstName="coach.firstName"
          :lastName="coach.lastName"
          :rate="coach.hourlyRate"
          :areas="coach.areas"
        ></coach-item>
      </ul>
      <h3 v-else>No coaches found.</h3>
    </section>
  </div>
</template>


<script>
// from Pinia Store
import { useCoachesStore } from '@/stores/coaches';
// Local component
import CoachItem from '../../components/coaches/CoachItem.vue';

export default {
  components: { CoachItem },

  // get data from Pinia Store
  setup() {
    const coachesStore = useCoachesStore();

    return { coachesStore };
  },

  methods: {
    hasCoaches() {
      // getters
      return this.coachesStore.hasCoaches;
    },
  },
};
</script>


<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>