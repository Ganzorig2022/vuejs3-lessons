<!-- https://localhost:3000/coaches -->
<template>
  <div>
    <!-- if error is null then it false, if error is not null then true. Double exclamation mark (!!)-->
    <base-dialog :show="!!error" title="An error occurred" @close="handleError">
      <p>
        {{ error }}
      </p>
    </base-dialog>
    <!-- Filter coaches by checkboxes -->
    <section>
      <coach-filter @change-filter="setFilter"></coach-filter>
    </section>
    <!-- MAIN SECTION -->
    <section>
      <base-card>
        <div>
          <div class="controls">
            <base-button mode="outline" @click="loadCoaches"
              >Refresh</base-button
            >
            <base-button v-if="!isLoading" link to="/register"
              >Register as a Coach</base-button
            >
          </div>
          <div v-if="isLoading">
            <base-spinner> </base-spinner>
          </div>
          <ul v-else-if="hasCoaches">
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
      isLoading: false,
      error: null,
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
      return !this.isLoading && this.coachesStore.hasCoaches; // true, false
    },

    // emitted
    setFilter(updatedFilters) {
      this.activeFilters = updatedFilters;
    },

    // store ===> ACTIONS
    async loadCoaches() {
      try {
        this.isLoading = true;
        await this.coachesStore.loadCoaches();
        this.isLoading = false;
      } catch (error) {
        this.error = error.message || 'Something went wrong';
        this.isLoading = false;
      }
    },

    handleError() {
      this.error = null;
    },
  },

  // mounted() hook tuhain component anh render hiigdehed ajillana.
  mounted() {
    this.loadCoaches();
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