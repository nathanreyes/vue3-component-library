import { reactive, computed, App, Component } from 'vue';
import { isObject, defaultsDeep, mapValues, get, has } from '../_';
import touch from './touch.json';
import masks from './masks.json';
import screens from './screens.json';
import locales from './locales';

declare const window: any;

interface DatePickerPopoverDefaults {
  visibility: string;
  placement: string;
  keepVisibleOnInput: boolean;
  isInteractive: boolean;
}

interface DatePickerDefaults {
  updateOnInput: boolean;
  inputDebounce: number;
  popover: DatePickerPopoverDefaults;
}

interface Defaults {
  componentPrefix: string;
  navVisibility: string;
  titlePosition: string;
  transition: string;
  touch: object;
  masks: object;
  screens: object;
  locales: any;
  datePicker: DatePickerDefaults;
}

let defaultConfig: Defaults = {
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
  return mapValues(state.defaults.locales, (v: any) => {
    v.masks = defaultsDeep(v.masks, state.defaults.masks);
    return v;
  });
});

const install = (app: App, defaults: Defaults) => {
  state.defaults = defaultsDeep(defaults, state.defaults);
};

export default install;

export const defaultsMixin: Component = {
  computed: {
    $defaults(): Defaults {
      return state.defaults;
    },
    $locales() {
      return computedLocales.value;
    },
  },
  methods: {
    propOrDefault(prop: string, defaultPath: string, strategy: string): any {
      return this.passedProp(prop, get(this.$defaults, defaultPath), strategy);
    },
    passedProp(prop: string, fallback: any, strategy: string): any {
      if (has(this.$props, prop)) {
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
