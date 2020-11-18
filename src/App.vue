<template>
  <div>
    <Calendar :attributes="attributes" />
  </div>
  <div>
    <DatePicker v-model="date" />
  </div>
</template>

<script>
import Calendar from './components/Calendar/Calendar.vue';
import DatePicker from './components/DatePicker/DatePicker.vue';

export default {
  name: 'App',
  components: {
    Calendar,
    DatePicker,
  },
  data() {
    return {
      date: new Date(),
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
