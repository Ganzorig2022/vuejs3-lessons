<template>
  <section>
    <base-card>
      <h2>Submitted Experiences</h2>
      <div>
        <base-button @click="loadExperiences"
          >Load Submitted Experiences</base-button
        >
      </div>
      <p v-if="isLoading">Loading...</p>
      <p v-else-if="!isLoading && error">{{ error }}</p>
      <p v-else-if="!isLoading && (!results || results.length === 0)">
        No data found. Please add some experiences.
      </p>
      <ul v-else>
        <survey-result
          v-for="result in results"
          :key="result.id"
          :name="result.name"
          :rating="result.rating"
        ></survey-result>
      </ul>
    </base-card>
  </section>
</template>

<script>
import SurveyResult from './SurveyResult.vue';
import axios from 'axios';

export default {
  components: {
    SurveyResult,
  },

  data() {
    return {
      results: [],
      isLoading: false,
      error: null,
    };
  },

  methods: {
    loadExperiences() {
      // firebase --> Realtime database-aas "Survey" collection-oos data GET.

      this.isLoading = true;
      this.error = null;
      axios
        .get(
          'https://vue-http-demo-f00ab-default-rtdb.firebaseio.com/surveys.json'
        )
        .then((res) => {
          const results = [];
          const data = res.data;
          this.isLoading = false;

          for (const id in data) {
            results.push({
              id: id,
              name: data[id].name,
              rating: data[id].rating,
            });
          }

          this.results = results;
        })
        .catch((err) => {
          this.isLoading = false;
          this.error = 'Failed to fetch data.';
          console.log(err.message);
        });
    },
  },

  // mounted() hook tuhain component anh render hiigdehed ajillana.
  mounted() {
    this.loadExperiences();
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>