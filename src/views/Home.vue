<template>
  <div class="home">
    pick ur interest:
    <select v-model="interest">
      <option value="A">A</option>
      <option value="B">B</option>
    </select>
    <hr>
    <button @click="connected">
      are we connected yet?
    </button>
    <hr>
    <button @click="getPosition">get position</button>
  </div>
</template>

<script>
import axios from 'axios';
import uuid from 'uuid';
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'home',

  components: {
    // HelloWorld,
  },

  data() {
    return {
      id: uuid(),
      interest: null,
      lat: null,
      long: null,
    };
  },

  methods: {
    connected() {
      axios.post('http://localhost:4000/user', {
        id: this.id,
        interest: this.interest,
        lat: Number(parseFloat(this.lat).toFixed(4)),
        long: Number(parseFloat(this.long).toFixed(4)),
      })
        .then((r) => {
          console.log(r);
        });
    },
    getPosition() {
      navigator.geolocation.getCurrentPosition((pos) => {
        console.log(pos);

        // this.lat = Math.round(parseFloat(pos.coords.latitude).toFixed(4) * 10000);
        this.lat = pos.coords.latitude;
        this.long = pos.coords.longitude;
        // One degree of either is approximately 69 miles (111 kilometers) apart
        // it comes in 7 decimals: 5.8957957
        // so, 5.8957956 would be 10cm away.
        // 7the decimal: 1cm
        // 6the decimal: 10cm
        // 5the decimal: 1m
        // 4the decimal: 10m <---- seems like one we can use
        // 3the decimal: 100m
        // 2the decimal: 1km
        // 1the decimal: 10km
        // 1 degree: 111km
        // 360 degrees: 40.000km / earth's circumference
      });
    },
  },
};
</script>
