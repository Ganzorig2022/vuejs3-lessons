<template>
  <div>
    <form class="form-control" @submit.prevent="submitForm">
      <div>
        <label for="email">Your email</label>
        <input type="email" id="emal" v-model.trim="email" />
      </div>
      <div>
        <label for="message">Message</label>
        <textarea rows="5" id="message" v-model.trim="message" />
      </div>
      <p v-if="!formIsValid" class="errors">Form is invalid</p>
      <div class="actions">
        <base-button>Send Message</base-button>
      </div>
    </form>
  </div>
</template>

<script>
import { useRequestsStore } from '@/stores/requests';

export default {
  // get data from Pinia Store
  setup() {
    const requestsStore = useRequestsStore();

    return { requestsStore };
  },

  data() {
    return {
      email: '',
      message: '',
      formIsValid: true,
    };
  },
  methods: {
    submitForm() {
      this.formIsValid = true;
      if (
        this.email === '' ||
        !this.email.includes('@') ||
        this.message === ''
      ) {
        this.formIsValid = false;
      }

      this.requestsStore.contactCoach({
        email: this.email,
        message: this.message,
        coachId: this.$route.params.id,
      });
      this.$router.push('/coaches');
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>