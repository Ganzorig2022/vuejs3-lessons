### Global components

`1.` /src/Main.js dotor BaseCard.vue, BaseButton.vue import-losnoor ***Global*** buyu haana ch shuud ashiglahaar bolow. Import hiih shaardlagagvigeer.

```js
<template>
  <li>
    <!-- imported on Main.js -->
    <base-card>
      <header>
        <h3>{{ title }}</h3>
        <!-- imported on Main.js -->
        <base-button mode="flat">Delete</base-button>
      </header>
    </base-card>
    <p>{{ description }}</p>
    <nav>
      <a :href="link">View Resource</a>
    </nav>
  </li>
</template>
```

### Dynamic Components

`1.` "./src/components/learning-resource/TheResources.vue" dotor 2 tab-iig untraaj, asaaw. Gol ni component-vvdee import-loson bn.
> https://vuejs.org/guide/essentials/component-basics.html#dynamic-components

```js
<template>
    <base-card>
        <base-button @click="setSelectedTab('stored-resources')">Stored Resources</base-button>
        <base-button @click="setSelectedTab('add-resource')">Add Resources</base-button>
    </base-card>
    <!-- Component changes when currentTab changes -->
    <component :is="selectedTab"></component>
</template>

<scripts>
import StoredResources from './StoredResources.vue';
import AddResource from './AddResource.vue';

export default {
  components: {
    StoredResources,
    AddResource,
  }
}
</scripts>
```

### Computed Properties

`1.` Template tag dotor logic bichxer het nvserdeed bwal computed()-iig ashiglana.
> https://vuejs.org/guide/essentials/computed.html#writable-computed

```js
<template>
    <base-card>
        <base-button @click="setSelectedTab('stored-resources')" :mode="storedResButtonMode">Stored Resources</base-button>
    </base-card>
    <component :is="selectedTab"></component>
</template>

<script>
import StoredResources from './StoredResources.vue';

export default {
    components: {
        StoredResources,
    },
    computed: {
        storedResButtonMode() {
           return this.selectedTab==='stored-resources' ? null :'flat'
        },

    }    
  }
</script>    
```


### Custom Event ($emit)

`1.` Child-aas Parent rvvgee event damjuulahad ***$emit*** ashigladag.

> https://vuejs.org/api/component-instance.html#emit

```js
 <base-dialog
      v-if="inputIsInvalid"
      title="Invalid Input"
      @close="closeDialog"
    >
</base-dialog>
```

`2.` method dotor function-aar ashiglawal "this.$emit". Utga damjuulna gewel 2doh param-aar ***MANY ARGUMENTS*** damjuulhj bolno.

```js

 <button @click="toggleFavorite">Toggle favorite</button>

 methods: {
 toggleFavorite() {
      this.$emit('toggle-favorite', this.id);
    },
 }
```

### Provide / Inject property

`1.` Parent-aas zaawal Child bolgon ruu yag daraallaar ni props damjuulahgvgeer Parent rvvgee event damjuulahad ***$emit*** ashigladag.

> https://vuejs.org/guide/components/provide-inject.html#prop-drilling

![Example:](https://vuejs.org/assets/provide-inject.3e0505e4.png)
