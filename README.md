# VCalendar Plugin for Vue 3

**Technology Used:**\
[Vuejs 3.0](https://github.com/vuejs/vue-next)\
[Typescript](https://github.com/microsoft/TypeScript)\
[Rollup](https://github.com/rollup/rollup)

## Project setup

Please follow below mentioned step to run this project:

- Clone the repo

```shell
https://github.com/nathanreyes/vue3-component-library
```

### Install Plugin

```
yarn add v-calendar@next
```

### Use Plugin

```
import { createApp } from 'vue';
import VCalendar from 'v-calendar';

const app = createApp();
app.use(VCalendar)
```

### Use Components

```html
<Calendar />
```

```js
import { Calendar } from 'v-calendar';

export default {
  components: {
    Calendar,
  },
};
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Build Library

```
yarn build:js
```

### Build Library With Separate Css file

```
yarn build:js_css
```

### Lints and fixes files

```
yarn lint
```
