import { reactive, computed } from 'vue';
import { isObject, defaultsDeep, mapValues, get, set, has } from '../_';
import touch from './touch.json';
import masks from './masks.json';
import screens from './screens.json';
import locales from './locales';

let defaultConfig = {
  componentPrefix: 'v',
  navVisibility: 'click',
  titlePosition: 'center',
  transition: 'slide-h',
  touch,
  masks,
  screens,
  locales,
  datePicker: {
    updateOnInput: true,
    inputDebounce: 1000,
    popover: {
      visibility: 'hover-focus',
      placement: 'bottom-start',
      keepVisibleOnInput: false,
      isInteractive: true,
    },
  },
};

if (window && window.__vcalendar__) {
  defaultConfig = defaultsDeep(window.__vcalendar__, defaultConfig);
}

const state = reactive({
  defaults: defaultConfig,
});

const computedLocales = computed(() => {
  return mapValues(state.defaults.locales, v => {
    v.masks = defaultsDeep(v.masks, state.defaults.masks);
    return v;
  });
});

const install = (app, defaults) => {
  state.defaults = defaultsDeep(defaults, state.defaults);
};

export default install;

export const defaultsMixin = {
  computed: {
    $defaults() {
      return state.defaults;
    },
    $locales() {
      return computedLocales.value;
    },
  },
  methods: {
    propOrDefault(prop, defaultPath, strategy) {
      return this.passedProp(prop, get(this.$defaults, defaultPath), strategy);
    },
    passedProp(prop, fallback, strategy) {
      if (has(this.$options.propsData, prop)) {
        const propValue = this[prop];
        if (isObject(propValue) && strategy === 'merge') {
          return defaultsDeep(propValue, fallback);
        }
        return propValue;
      }
      return fallback;
    },
  },
};
