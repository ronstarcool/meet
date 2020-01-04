<template>
  <div class="home">
    <button @click="connected">
      are we connected yet?
    </button>
    <select v-model="myInterest">
      <option value="A">A</option>
      <option value="B">B</option>
    </select>
  </div>
</template>

<script>
import axios from 'axios';
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'home',

  components: {
    // HelloWorld,
  },

  data() {
    return {
      myInterest: null,
    };
  },

  methods: {
    connected() {
      axios.post('http://localhost:4000/stuff', {
        myInterest: this.myInterest,
      })
        .then((r) => {
          console.log(r);
        });
    },
  },
};
</script>
