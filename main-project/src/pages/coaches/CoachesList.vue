<!-- https://localhost:3000/coaches -->
<template>
  <div>
    <section>
      <coach-filter @change-filter="setFilter"></coach-filter>
    </section>
    <section>
      <base-card>
        <div>
          <div class="controls">
            <base-button mode="outline">Refresh</base-button>
            <base-button link to="/register">Register as a Coach</base-button>
          </div>
          <ul v-if="hasCoaches">
            <coach-item
              v-for="coach in filteredCoaches"
              :key="coach.id"
              :id="coach.id"
              :firstName="coach.firstName"
              :lastName="coach.lastName"
              :rate="coach.hourlyRate"
              :areas="coach.areas"
            ></coach-item>
          </ul>
          <h3 v-else>No coaches found.</h3>
        </div>
      </base-card>
    </section>
  </div>
</template>


<script>
// from Pinia Store
import { useCoachesStore } from '@/stores/coaches';
// Local component
import CoachItem from '../../components/coaches/CoachItem.vue';
import CoachFilter from '../../components/coaches/CoachFilter.vue';

export default {
  components: { CoachItem, CoachFilter },

  // get data from Pinia Store
  setup() {
    const coachesStore = useCoachesStore();

    return { coachesStore };
  },

  data() {
    return {
      activeFilters: { frontend: true, backend: true, career: true },
    };
  },

  computed: {
    // store ===> DATA
    filteredCoaches() {
      const coaches = this.coachesStore.coaches;
      return coaches.filter((coach) => {
        if (this.activeFilters.frontend && coach.areas.includes('frontend')) {
          return true;
        }
        if (this.activeFilters.backend && coach.areas.includes('backend')) {
          return true;
        }
        if (this.activeFilters.career && coach.areas.includes('career')) {
          return true;
        }
        return false;
      });
    },
  },

  methods: {
    // store ===> GETTERS
    hasCoaches() {
      return this.coachesStore.hasCoaches; // true, false
    },

    // emitted
    setFilter(updatedFilters) {
      this.activeFilters = updatedFilters;
      console.log('activeFilters', this.activeFilters);
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