<script>
import { h } from 'vue';
import Popover from '../Popover/Popover.vue';
import CalendarNav from '../CalendarNav/CalendarNav.vue';
import CalendarDay from '../CalendarDay/CalendarDay.vue';
import Grid from '../Grid/Grid.vue';
import { childMixin, safeScopedSlotMixin } from '../../utils/mixins';
import { getPopoverTriggerEvents } from '../../utils/popovers';
import { createGuid } from '../../utils/helpers';

export default {
  name: 'CalendarPane',
  mixins: [childMixin, safeScopedSlotMixin],
  render() {
    // Header
    const header =
      this.safeScopedSlot('header', this.page) ||
      h('div', { class: 'vc-header' }, [
        // Header title
        h(
          'div',
          {
            class: `vc-title-layout align-${this.titlePosition}`,
          },
          [
            h('div', { class: 'vc-title-wrapper' }, [
              // Title content
              h(
                'div',
                {
                  class: 'vc-title',
                  on: this.navPopoverEvents,
                },
                [
                  this.safeScopedSlot(
                    'header-title',
                    this.page,
                    this.page.title,
                  ),
                ],
              ),
              // Navigation popover
              h(
                Popover,
                {
                  props: {
                    id: this.navPopoverId,
                    contentClass: 'vc-nav-popover-container',
                  },
                },
                [
                  // Navigation pane
                  h(
                    CalendarNav,
                    {
                      props: {
                        value: this.page,
                        validator: this.canMove,
                      },
                      on: {
                        input: $event => this.move($event),
                      },
                    },
                    {
                      ...this.$slots,
                    },
                  ),
                ],
              ),
            ]),
          ],
        ),
      ]);

    // Weeks
    const weeks = h(
      Grid,
      {
        class: 'vc-weeks',
        props: {
          rows: this.page.weeks + 1,
          columns: 7,
          columnWidth: '1fr',
          disableFocus: true,
        },
      },
      [
        ...this.weekdayLabels.map((wl, i) =>
          h(
            'div',
            {
              key: i + 1,
              class: 'vc-weekday',
            },
            [wl],
          ),
        ),
        ...this.page.days.map(day =>
          h(CalendarDay, {
            ...this.$attrs,
            day,
            scopedSlots: this.$slots,
            key: day.id,
            ref: 'days',
            refInFor: true,
          }),
        ),
      ],
    );

    return h(
      'div',
      {
        class: 'vc-pane',
        ref: 'pane',
      },
      [header, weeks],
    );
  },
  props: {
    page: Object,
    titlePosition: String,
    navVisibility: String,
    canMove: {
      type: Function,
      default: () => true,
    },
  },
  data() {
    return {
      navPopoverId: createGuid(),
    };
  },
  computed: {
    navVisibility_() {
      return this.propOrDefault('navVisibility', 'navVisibility');
    },
    navPlacement() {
      switch (this.titlePosition) {
        case 'left':
          return 'bottom-start';
        case 'right':
          return 'bottom-end';
        default:
          return 'bottom';
      }
    },
    navPopoverEvents() {
      return getPopoverTriggerEvents({
        id: this.navPopoverId,
        visibility: this.navVisibility_,
        placement: this.navPlacement,
        modifiers: [
          { name: 'flip', options: { fallbackPlacements: ['bottom'] } },
        ],
        isInteractive: true,
      });
    },
    weekdayLabels() {
      return this.locale
        .getWeekdayDates()
        .map(d => this.format(d, this.masks.weekdays));
    },
  },
  methods: {
    move(page) {
      this.$emit('update:page', page);
    },
    refresh() {
      this.$refs.days.forEach(d => d.refresh());
    },
  },
};
</script>

<style lang="css" scoped>
@import './calendar-pane.css';
</style>
