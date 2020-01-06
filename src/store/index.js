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
      ioConnection.emit('join_room', `room-${num}`);
      ioConnection.on('message', (data) => {
        console.log(data);
      });
    },
    sendMessage(context, { num, message }) {
      ioConnection.emit('message', {
        room: `room-${num}`,
        message,
      });
    },
    disConnect() {
      ioConnection.on('leave', 'stuff');
    },
  },
});
