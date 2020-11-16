import { App as Application, Plugin } from 'vue';
import * as components from './components/index';
import defaultsPlugin from './utils/defaults';
import screensPlugin from './utils/screens';
import { setVueInstance } from './utils/config/index';

const install: Exclude<Plugin['install'], undefined> = (
  instance: Application,
  defaults: Record<string, any>,
) => {
  setVueInstance(instance);
  instance.use(defaultsPlugin, defaults);
  instance.use(screensPlugin);
  for (const componentKey in components) {
    instance.use((components as any)[componentKey]);
  }
};

export default install;

export * from './components';
