<template>
  <div>
    <!-- Global component #1 -->
    <base-dialog
      v-if="inputIsInvalid"
      title="Invalid Input"
      @close="closeDialog"
    >
      <!-- <slot name="hooson bol" === default gej ogno. -->
      <template #default>
        <p>Unfortunately, at one input value is invalid.</p>
        <p>Please check all inputs.</p>
      </template>
      <!-- <slot name="actions" -->
      <!-- (v-slot:actions === #actions shorthand) -->
      <template #actions>
        <base-button @click="closeDialog">Okay</base-button>
      </template>
    </base-dialog>
    <!-- Global component #2 -->
    <base-card>
      <form @submit.prevent="submitData">
        <div class="form-control">
          <label for="title">Title</label>
          <input type="text" name="title" id="title" ref="titleInput" />
        </div>
        <div class="form-control">
          <label for="description">Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            ref="descInput"
          />
        </div>
        <div class="form-control">
          <label for="link">Link</label>
          <input type="url" name="link" id="link" ref="linkInput" />
        </div>
        <div>
          <!-- Global component #3 -->
          <base-button type="submit">Add Resource</base-button>
        </div>
      </form>
    </base-card>
  </div>
</template>

<script>
export default {
  // "./TheResources.vue" provide() dotor "addResource" bga uchir end ter data-g ashiglaj bolno.
  inject: ['addResource'],

  data() {
    return {
      inputIsInvalid: false,
    };
  },

  methods: {
    submitData() {
      const enteredTitle = this.$refs.titleInput.value;
      const enteredDescription = this.$refs.descInput.value;
      const enteredLink = this.$refs.linkInput.value;

      if (
        enteredTitle.trim() === '' ||
        enteredDescription.trim() === '' ||
        enteredLink === ''
      ) {
        this.inputIsInvalid = true;
        return;
      }
      this.addResource(enteredTitle, enteredDescription, enteredLink);
    },
    closeDialog() {
      this.inputIsInvalid = false;
    },
  },
};
</script>

<style scoped>
label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  padding: 0.15rem;
  border: 1px solid #ccc;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #3a0061;
  background-color: #f7ebff;
}

.form-control {
  margin: 1rem 0;
}
</style>