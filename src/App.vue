<template>
  <Calendar :attributes="attributes" />
</template>

<script>
import Calendar from './components/Calendar/Calendar.vue';

export default {
  name: 'App',
  components: {
    Calendar,
  },
  data() {
    return {
      attributes: [
        { highlight: true, dates: [new Date(), new Date(2020, 10, 12)] },
      ],
    };
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
