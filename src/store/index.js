import Vue from 'vue';
import Vuex from 'vuex';
import io from 'socket.io-client';

const ioConnection = io.connect('http://localhost:4000');

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    roomId: null,
    messages: [],
  },

  mutations: {
    addMessage(state, data) {
      state.messages.push(data);
    },
    setRoomId(state, roomId) {
      state.roomId = roomId;
    },
    addOwnMessage(state, message) {
      state.messages.push({
        ...message,
        roomId: state.roomId,
      });
    },
  },

  actions: {
    makeConnection(context) {
      ioConnection.emit('join_room', context.state.roomId);
      ioConnection.on('message', (data) => {
        console.log('hey there, the ioConnection.on is running');

        console.log(data);
        context.commit('addMessage', data);
      });
    },
    sendMessage(context, data) {
      console.log(data);

      ioConnection.emit('message', {
        ...data,
        roomId: context.state.roomId,
      });
    },
    disConnect() {
      ioConnection.on('leave', 'stuff');
    },
  },
});
