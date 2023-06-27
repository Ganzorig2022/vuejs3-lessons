<template>
  <li>
    <h2>{{ name }} {{ isFavorite ? '(Favorite)' : '' }}</h2>
    <button @click="toggleFavorite">Toggle favorite</button>
    <button @click="toggleDetails">
      {{ detailsAreVisible ? 'hide' : 'Show Details' }}
    </button>
    <ul v-if="detailsAreVisible">
      <li>
        <strong>Phone:</strong>
        {{ phone }}
      </li>
      <li>
        <strong>Email:</strong>
        {{ email }}
      </li>
    </ul>
  </li>
</template>

<script>
export default {
  // Option#1 props-oo deer {{name}} gd shuud damjuulaw.
  // props: ['name', 'phone', 'email', 'isFavorite'],
  // Option#2 props-oo arai ilvv nariin bolgow.
  props: {
    id: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    isFavorite: {
      type: Boolean,
      required: false,
      default: false,
      // validator: function (value) {
      //   return value === '1' || value === '0';
      // },
    },
  },
  emits: ['toggle-favorite'],
  // emits: {
  //   'toggle-favorite': (id) => {
  //     if (id) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   },
  // },
  data() {
    return {
      detailsAreVisible: false,
    };
  },
  methods: {
    toggleDetails() {
      this.detailsAreVisible = !this.detailsAreVisible;
    },
    // "App.vue" parent component rvv "$emit"-eer id-gaa damjuulaw.
    toggleFavorite() {
      this.$emit('toggle-favorite', this.id);
    },
  },
};
</script>
