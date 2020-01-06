<template>
  <div class="home">
    pick ur interest:
    <select v-model="interest">
      <option value="A">A</option>
      <option value="B">B</option>
    </select>
    <hr>
    roomNum: <input type="text" v-model="roomNum">
    <hr>
    Are we a new user: <button @click="newUser = !newUser">{{ newUser }}</button>
    <hr>
    <button @click="connected">post this user</button>
    <hr>
    <button @click="getPosition">get position</button>
    <hr>
    <button @click="makeConnection">connect</button>
    <button @click="sendMessage">sendMessage</button>
    <button @click="disConnect">disconnect</button>
  </div>
</template>

<script>
import axios from 'axios';
import uuid from 'uuid';

// import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'home',

  data() {
    return {
      id: uuid(),
      interest: 'A',
      lat: null,
      long: null,
      isConnected: false,
      socketMessage: '',
      newUser: true,
      roomNum: 1,
    };
  },

  methods: {
    makeConnection() {
      this.$store.dispatch('makeConnection', this.roomNum);
    },
    sendMessage() {
      this.$store.dispatch('sendMessage', {
        num: this.roomNum,
        message: 'test-message',
      });
    },
    disConnect() {
      this.$store.dispatch('disConnect');
    },
    pingServer() {
      // Send the "pingServer" event to the server.
      this.$socket.emit('pingServer', 'PING!');
    },
    connected() {
      axios.post('http://localhost:4000/user', {
        id: this.id,
        interest: this.interest,
        lat: Number(parseFloat(this.lat).toFixed(4)),
        long: Number(parseFloat(this.long).toFixed(4)),
        newUser: this.newUser,
        roomNum: this.roomNum,
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
