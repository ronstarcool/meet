import Vue from 'vue';
import Vuex from 'vuex';
import io from 'socket.io-client';

let ioConnection;

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    messages: [],
    // isConnected: false,
    // socketMessage: '',
  },

  mutations: {
    addMessage(state, v) {
      state.messages.push(v);
    },
  },

  actions: {
    makeConnection(context, num) {
      ioConnection = io.connect('http://localhost:4000');
      ioConnection.on(`stuff${num}`, (data) => {
        console.log(data);
        context.commit('addMessage', data);
      });
    },
    testConnection() {
      ioConnection.emit('message');
    },
    disConnect() {
      ioConnection.on('leave', 'stuff');
    },
  },
});
