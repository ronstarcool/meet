<template>
  <div>
    <form action="" @submit="submit">
      <input ref="chatInput" type="text" v-model="message" >
      <button type="submit">submit</button>
    </form>
    <ul>
      <transition-group name="messages-list" tag="div">
        <li
          v-for="(message, i) in decoratedMessages"
          :key="i"
          :class="message.color"
        >
          <div>{{ message.message }}</div>
          <div>{{ message.userId }}</div>
        </li>
      </transition-group>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { uniq } from 'lodash';

export default {
  name: 'chat',

  data() {
    return {
      message: null,
    };
  },

  mounted() {
    console.log(this.$refs);
    this.$refs.chatInput.focus();
  },

  computed: {
    ...mapState(['userId', 'roomId', 'messages']),
    allUserIds() { // [ownId, otherId, otherId]
      return [
        this.userId,
        ...uniq(this.messages
          .map(message => message.userId))
          .filter(id => id !== this.userId),
      ];
    },
    decoratedMessages() {
      return this.messages.map(currentMessage => ({
        ...currentMessage,
        color: `color-${this.allUserIds.findIndex(message => message === currentMessage.userId) + 1}`,
      }));
    },
  },

  methods: {
    submit(e) {
      e.preventDefault();
      console.log(this.message);
      this.$store.dispatch('sendMessage', this.message);
    },
  },
};
</script>

<style lang="scss">
$colors: red, blue, green;

@each $color in $colors {
  ul li.color-#{index($colors, $color)} {
    color: $color;
  }
}

.color-0 {
  color: blue;
}

.color-1 {
  color: red;
}

.messages-list-enter-active {
  transition: all 1s;
}

.messages-list-enter {
  opacity: 0;
  transform: translateX(130px);
}
.messages-list-enter.color-0 {
  transform: translateX(-130px);
}

</style>
