<template>
  <button
    type="button"
    class="bg-cl-transparent brdr-none inline-flex"
    @click="openSidebarMenu"
    :aria-label="$t('Open menu')"
    data-testid="menuButton"
  >
    <font-awesome-icon icon="bars" size="2x" style="color: #404040;"/>
  </button>
</template>

<script>
import HamburgerIcon from '@vue-storefront/core/compatibility/components/blocks/Header/HamburgerIcon'

export default {
  mixins: [HamburgerIcon]
}
</script>

<style lang="scss" scoped>
  button {
    background: none;
  }
</style>
