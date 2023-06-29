<!-- https://localhost:3000/register -->
<template>
  <div>
    <section>
      <base-card>
        <h2>Register as a Coach now</h2>
        <coach-form @save-data="saveData"></coach-form>
      </base-card>
    </section>
  </div>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue';
// from Pinia Store
import { useCoachesStore } from '@/stores/coaches';

export default {
  // get data from Pinia Store
  setup() {
    const coachesStore = useCoachesStore();

    return { coachesStore };
  },

  components: { CoachForm },

  methods: {
    saveData(formData) {
      const { first, last, desc, rate, areas } = formData;
      // store ===> ACTIONS
      this.coachesStore.registerCoach({
        id: 'c3',
        firstName: first,
        lastName: last,
        areas,
        description: desc,
        hourlyRate: rate,
      });
    },
  },
};
</script>