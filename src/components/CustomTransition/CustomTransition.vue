<script>
export default {
  name: 'CustomTransition',
  render(h) {
    return h(
      'transition',
      {
        props: {
          name: this.name_,
          appear: this.appear,
        },
        onBeforeEnter: this.beforeEnter,
        onAfterEnter: this.afterEnter,
      },
      [this.$slots.default()],
    );
  },
  props: {
    name: String,
    appear: Boolean,
  },
  computed: {
    name_() {
      return this.name || 'none';
    },
  },
  methods: {
    beforeEnter(el) {
      this.$emit('before-enter', el);
      this.$emit('before-transition', el);
    },
    afterEnter(el) {
      this.$emit('after-enter', el);
      this.$emit('after-transition', el);
    },
  },
};
</script>

<style lang="css" scoped>
@import './custom-transition.css';
</style>
