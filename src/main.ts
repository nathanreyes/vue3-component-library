import { createApp } from 'vue';
import App from './App.vue';

declare const window: any;

const app = createApp(App);

const defaults = {
  titlePosition: 'right',
};

// import VCalendar from './index';
// app.use(VCalendar, defaults);

window.__vcalendar__ = defaults;

import { screensPlugin, Calendar, DatePicker } from './index';
console.log(screensPlugin);
app.use(screensPlugin);
app.use(Calendar);
app.use(DatePicker);

app.mount('#app');
