<template>
  <div class="chat">
    <form action="" @submit="submit">
      <el-input ref="chatInput" type="text" v-model="text" />
      <el-button type="submit">submit</el-button>
    </form>
    <ul>
      <transition-group name="messages" tag="div">
        <li
          v-for="(message, i) in decoratedMessages"
          :key="i"
          :class="message.color"
        >
          <el-badge :value="message.count">
            <el-button>{{ message.text }}</el-button>
          </el-badge>
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
      count: 1,
      text: null,
    };
  },

  mounted() {
    console.log(this.$refs);
    this.$refs.chatInput.focus();
  },

  computed: {
    ...mapState(['userId', 'roomId', 'messages']),
    allUserIds() { // outputs: [ownId, otherId, otherId]
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
      this.count++;
      console.log(this.message);
      this.$store.dispatch('sendMessage', {
        text: this.text,
        count: this.count,
      });
    },
  },
};
</script>

<style lang="scss">
$colors: red, blue, green;

.chat {
  margin: auto;
  width: 400px;

  ul {
    list-style-type: none;
    padding: 0;

    sup, button {
      margin-top: 12px;
    }

    li {
      display: flex;

      &.color-1 {
        justify-content: flex-end;
      }
    }
  }

  @each $color in $colors {
    ul li.color-#{index($colors, $color)} .el-badge__content {
      background: $color;
    }
  }

  form {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .el-input {
      margin: 20px 20px 20px 0;
      width: 250px !important;
    }

    .el-button {
      width: 150px;
    }
  }

  .messages-enter-active {
    transition: all 1s;
  }
  .messages-enter {
    opacity: 0;
    transform: translateX(130px);
  }
  .messages-enter.color-1 {
    transform: translateX(-130px);
  }
}

</style>
