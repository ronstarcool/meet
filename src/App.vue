<template>
  <div class="app">
    <div class="app__nav">
        <router-link to="/">Home</router-link>
        <router-link to="/chat">Chat</router-link>
        <router-link to="/about">About</router-link>
    </div>
    <div style="width: 100%">
      <transition
          name="slide"
          mode="out-in">
          <router-view/>
        </transition>
      </div>
  </div>
</template>

<style lang="scss">
$transitionTime: 1s;

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
  left: 500px;
  opacity: 0;
}

.slide-enter-to {
  left: 0;
}

.slide-leave {
  left: 0;
}

.slide-leave-to {
  left: 500px;
  opacity: 0;
}

.slide-enter-active {
  transition: all $transitionTime ease;
  position: relative;
}

.slide-leave-active {
  transition: all $transitionTime ease;
  position: relative;
}
</style>
