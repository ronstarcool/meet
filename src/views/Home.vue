<template>
  <div class="home">
    <div class="home__box">
      <div>
        I want to talk about:
      <el-select v-model="interest" placeholder="Select">
        <el-option
          v-for="item in ['A', 'B']"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
      </div>
      <el-button @click="connectWithPosition">connect to a nearby user</el-button>
      <el-button @click="disConnect">disconnect</el-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

function generateLatLong(v) {
  return v ? Number(parseFloat(v).toFixed(4)) : false;
}

export default {
  name: 'home',

  data() {
    return {
      interest: 'A',
      lat: null,
      long: null,
      isConnected: false,
      socketMessage: '',
    };
  },

  computed: {
    messages() {
      return this.$store.state.messages;
    },
  },

  methods: {
    disConnect() {
      this.$store.dispatch('disConnect');
    },
    // pingServer() {
    //   // Send the "pingServer" event to the server.
    //   this.$socket.emit('pingServer', 'PING!');
    // },
    connectWithPosition() {
      this.getPosition()
        .then(() => {
          axios.post('http://localhost:4000/user', {
            id: this.id,
            interest: this.interest,
            lat: generateLatLong(this.lat),
            long: generateLatLong(this.long),
          })
            .then((r) => {
              console.log(r);
              this.$store.dispatch('makeConnection', r.data.roomId);
              this.$router.push('/chat');
            });
        });
    },
    getPosition() {
      return new Promise((res) => {
        navigator.geolocation.getCurrentPosition((pos) => {
          console.log(pos);

          // this.lat = Math.round(parseFloat(pos.coords.latitude).toFixed(4) * 10000);
          this.lat = pos.coords.latitude;
          this.long = pos.coords.longitude;
          res();
        });
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

<style lang="scss">
.home {
  height: calc(100% - 54px);
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  &__box {
    background: black;
    border-radius: 6px;
    height: 400px;
    width: 400px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;

    & > * {
      margin: 20px 0;
    }
  }

  button {
    width: 210px;
  }
}
</style>
