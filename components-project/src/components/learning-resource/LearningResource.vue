<template>
  <li>
    <!-- imported on Main.js -->
    <base-card>
      <header>
        <h3>{{ title }}</h3>
        <!-- imported on Main.js -->
        <base-button mode="flat" @click="onDelete(id)">Delete</base-button>
      </header>
    </base-card>
    <p>{{ description }}</p>
    <nav>
      <a :href="link">View Resource</a>
    </nav>
  </li>
</template>

<script>
export default {
  props: ['title', 'description', 'link', 'id'],
  inject: ['deleteResource'],
  methods: {
    onDelete(id) {
      this.deleteResource(id);
    },
  },
};
</script>

<style scoped>
li {
  margin: auto;
  max-width: 40rem;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h3 {
  font-size: 1.25rem;
  margin: 0.5rem 0;
}

p {
  margin: 0.5rem 0;
}

a {
  text-decoration: none;
  color: #ce5c00;
}

a:hover,
a:active {
  color: #c89300;
}
</style>
