<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <button @click="connected">
      are we connected yet?
    </button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'home',

  components: {
    HelloWorld,
  },

  methods: {
    connected() {
      fetch('http://localhost:4000/')
        .then((r) => {
          console.log(r);
        });
    },
  },
};
</script>
