<template>
  <div class="name-field">
    <div v-if="anonimous">
      <form v-on:submit.prevent="setName">
        <el-input type="text" v-model="name" @enter="setName" />
      </form>
    </div>
    <div v-else>
      {{ name }}
    </div>
    <el-button>edit name</el-button>
  </div>
</template>

<script>
export default {
  name: 'name',

  data() {
    return {
      name: null,
      anonimous: true,
    };
  },

  methods: {
    setName() {
      console.log('setName');
      this.anonimous = false;
      this.$emit('setName', this.name);
    },
  },
};
</script>

<style lang="scss">
.name-field {
  background: grey;
  height: 100px;
  padding: 10px;

  @include flex();

  button {
    width: 140px;
  }
}
</style>
