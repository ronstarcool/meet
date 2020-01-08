<template>
  <div class="app">
    <div class="app__nav">
        <router-link to="/">Home</router-link>
        <router-link to="/chat">Chat</router-link>
        <router-link to="/about">About</router-link>
    </div>
    <transition
        name="slide"
        mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<style lang="scss">
body {
  margin: 0;
}

.app {
  height: 100vh;
  width: 100vw;
  overflow: hidden;

  &__nav {
    background: black;
    font-size: 22px;
    margin: 0 0 20px;
    padding: 14px;

    a {
      color: white;
      margin: 0 20px;
      padding: 14px;
      text-decoration: none;

      &.router-link-exact-active {
        background: grey;
      }
    }
  }
}

.slide-enter {
  left: 100vw;
}

.slide-enter-to {
  left: 0;
}

.slide-leave {
  left: 0;
}

.slide-leave-to {
  left: -100vw;
}

.slide-enter-active {
  transition: all 0.5s linear 0.5s;
  position: relative;
}

.slide-leave-active {
  transition: all 0.5s linear 0.5s;
  position: relative;
}
</style>
