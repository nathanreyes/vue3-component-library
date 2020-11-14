<template>
  <HelloWorld />
  <Calendar />
</template>

<script>
import HelloWorld from './components/helloworld/HelloWorld.vue';
import Calendar from './components/Calendar/Calendar.vue';

export default {
  name: 'App',
  components: {
    HelloWorld,
    Calendar,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
