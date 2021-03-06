import Vue from 'vue';
import Vuex from 'vuex';
import io from 'socket.io-client';
import uuid from 'uuid';

const ioConnection = io.connect('http://localhost:4000');

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userId: uuid(),
    roomId: null,
    messages: [],
  },

  mutations: {
    addMessage(state, data) {
      console.log('adding a message');

      state.messages.push(data);
    },
    setRoomId(state, roomId) {
      state.roomId = roomId;
    },
    addOwnMessage(state, message) {
      state.messages.push({
        ...message,
        roomId: state.roomId,
        userId: state.userId,
      });
    },
  },

  actions: {
    makeConnection(context, roomId) {
      context.commit('setRoomId', roomId);
      ioConnection.emit('join_room', roomId);
      ioConnection.on('message', (data) => {
        console.log('hey there, the ioConnection.on is running');

        console.log(data);
        context.commit('addMessage', data);
      });
    },
    sendMessage(context, message) {
      console.log(message);

      context.commit('addOwnMessage', message);

      ioConnection.emit('message', {
        ...message,
        roomId: context.state.roomId,
        userId: context.state.userId,
      });
    },
    disConnect() {
      ioConnection.on('leave', 'stuff');
    },
  },
});
