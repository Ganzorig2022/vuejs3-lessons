<template>
  <div>
    <base-card>
      <base-button
        @click="setSelectedTab('stored-resources')"
        :mode="storedResButtonMode"
        >Stored Resources</base-button
      >
      <base-button
        @click="setSelectedTab('add-resource')"
        :mode="addResButtonMode"
        >Add Resources</base-button
      >
    </base-card>
    <!-- Component changes when currentTab changes -->
    <component :is="selectedTab"></component>
  </div>
</template>


<script>
import StoredResources from './StoredResources.vue';
import AddResource from './AddResource.vue';

export default {
  components: {
    StoredResources,
    AddResource,
  },
  // https://vuejs.org/guide/essentials/computed.html#writable-computed
  computed: {
    storedResButtonMode() {
      return this.selectedTab === 'stored-resources' ? null : 'flat';
    },
    addResButtonMode() {
      return this.selectedTab === 'add-resource' ? null : 'flat';
    },
  },

  data() {
    return {
      selectedTab: 'stored-resources',
      storedResourcesArr: [
        {
          id: 'official-guide',
          title: 'Official Guide',
          description: 'The Official Vue.js Documentation',
          link: 'https://vuejs.org',
        },
        {
          id: 'google',
          title: 'Google',
          description: 'Learn to Google',
          link: 'https://google.com',
        },
      ],
    };
  },

  // Provide - Inject property
  provide() {
    return {
      resources: this.storedResourcesArr,
      addResource: this.addResource,
      deleteResource: this.deleteResource,
    };
  },

  methods: {
    setSelectedTab(tab) {
      this.selectedTab = tab;
    },
    addResource(title, desc, link) {
      const newResource = {
        id: new Date().toISOString(),
        title,
        desc,
        link,
      };
      this.storedResourcesArr.push(newResource);
      this.selectedTab = 'stored-resources';
    },

    deleteResource(id) {
      const index = this.storedResourcesArr.findIndex((res) => res.id === id);
      this.storedResourcesArr.splice(index, 1);
    },
  },
};
</script>