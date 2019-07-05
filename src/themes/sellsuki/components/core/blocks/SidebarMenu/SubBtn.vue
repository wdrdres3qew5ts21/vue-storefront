<template>
  <button
    class="inline-flex between-xs w-100 px25 py20 serif cl-accent"
    v-if="type === 'next' && showRightArrow"
    type="button"
    @click.stop="next()"
    :aria-label="$t('Show subcategories')"
    data-testid="categoryButton"
  >
    {{ name }}
    <font-awesome-icon class="right" icon="chevron-right" size="md"/>
  </button>
  <button
    class="inline-flex between-xs w-100 py20 serif cl-accent"
    v-else-if="type === 'next' && !showRightArrow"
    type="button"
    @click.stop="next()"
    :aria-label="$t('Show subcategories')"
    data-testid="categoryButton"
  >
    {{ name }}
  </button>
  <button
    class="inline-flex p15 between-xs"
    v-else
    type="button"
    @click.stop="back()"
    :aria-label="$t('Back')"
  >
    {{ name }}
    <font-awesome-icon class="left" icon="chevron-left" size="md"/>
  </button>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'SubBtn',
  props: {
    id: {
      type: null,
      default: ''
    },
    type: {
      type: String,
      default: 'next'
    },
    name: {
      type: String,
      default: ''
    },
    showRightArrow: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapState({
      submenu: state => state.ui.submenu
    })
  },
  methods: {
    next () {
      if (this.$store.state.config.entities.category.categoriesDynamicPrefetch) this.$store.dispatch('category/list', { parent: this.id })
      this.$store.commit('ui/setSubmenu', {
        id: this.id,
        depth: ++this.submenu.depth
      })
    },
    back () {
      this.$store.commit('ui/setSubmenu', {
        depth: --this.submenu.depth
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-black: color(matterhorn);

button {
  .right, .left {
    color: #C5C5C5;
    line-height: 24px;
  }
  &:hover,
  &:focus {
    i {
      color: $color-black;
    }
  }
}
</style>
