<template>
  <div>
    <form action="" @submit="submit">
      <input type="text" v-model="message" >
      <button type="submit">submit</button>
    </form>
    <ul>
      <li v-for="(message, i) in messages" :key="i">
        {{ message }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'chat',

  data() {
    return {
      message: null,
    };
  },

  computed: {
    messages() {
      return this.$store.state.messages;
    },
  },

  methods: {
    submit(e) {
      e.preventDefault();
      console.log(this.message);
      this.$store.commit('addOwnMessage', this.message);
    },
  },
};
</script>

<style>
</style>
