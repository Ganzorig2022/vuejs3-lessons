<template>
  <div>
    <!-- if error is null then it false, if error is not null then true. Double exclamation mark (!!)-->
    <base-dialog :show="!!error" title="An error occurred" @close="handleError">
      <p>
        {{ error }}
      </p>
    </base-dialog>
    <section>
      <base-card>
        <header>
          <h2>Requests received</h2>
        </header>
        <div v-if="isLoading">
          <base-spinner> </base-spinner>
        </div>
        <ul v-else-if="hasRequests && !isLoading">
          <request-item
            v-for="req in receivedRequests"
            :key="req.id"
            :coach-id="req.coachId"
            :email="req.userEmail"
            :message="req.message"
          ></request-item>
        </ul>
        <h3 v-else>You haven't received any requests yet.</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import { useRequestsStore } from '@/stores/requests';
import RequestItem from '../../components/requests/RequestItem.vue';

export default {
  components: { RequestItem },
  // get data from Pinia Store
  setup() {
    const requests = useRequestsStore();

    return { requests };
  },

  data() {
    return {
      isLoading: false,
      error: null,
    };
  },

  computed: {
    // store ===> GETTERS
    hasRequests() {
      return this.requests.hasRequests; // true, false
    },

    // store ===> GETTERS
    receivedRequests() {
      return this.requests.totalRequests; // returns [{..}]
    },
  },

  methods: {
    // store ===> ACTIONS
    async loadRequests() {
      try {
        this.isLoading = true;
        await this.requests.fetchRequests();
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

  // created() hook tuhain component create hiigdehed ajillana.
  created() {
    this.loadRequests();
  },
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>