import { App, reactive } from 'vue';
import buildMediaQuery from './buildMediaQuery';
import defaultScreens from './defaults/screens.json';
import { isUndefined, mapValues, toPairs, has, get, set } from './_';

export default {
  install: (app: App, screens: Screens | undefined) => {
    if (!screens) {
      screens =
        get(app.config.globalProperties, '$vCalendar.config.screens') ||
        defaultScreens;
    }
    set(app.config.globalProperties, '$vCalendar.config.screens', screens);

    let shouldRefreshQueries = true;

    const state = reactive({
      matches: [],
      queries: [],
    });

    const refreshMatches = () => {
      state.matches = toPairs(state.queries)
        .filter(p => p[1].matches)
        .map(p => p[0]);
    };

    const refreshQueries = () => {
      if (!shouldRefreshQueries || !window || !window.matchMedia) return;
      state.queries = mapValues(screens, v => {
        const query = window.matchMedia(buildMediaQuery(v));
        query.addEventListener('change', refreshMatches);
        return query;
      });
      shouldRefreshQueries = false;
      refreshMatches();
    };

    // Global mixin that
    // 1) Refreshes queries on first component mount
    // 2) Provides '$screens' utility method that refreshes any time the screen matches update
    app.mixin({
      mounted() {
        refreshQueries();
      },
      computed: {
        $screens() {
          return (config, def) =>
            state.matches.reduce(
              (prev, curr) => (has(config, curr) ? config[curr] : prev),
              isUndefined(def) ? config.default : def,
            );
        },
      },
    });
  },
};
